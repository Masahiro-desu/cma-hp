import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  // Webhookの秘密鍵を環境変数から取得
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET || 'whsec_clerkwebhooksecret';

  if (!WEBHOOK_SECRET) {
    console.error('Webhook secret not found');
    return new Response('Webhook secret not found', { status: 500 });
  }

  // リクエストヘッダーを取得
  const headersList = headers();
  const svix_id = headersList.get('svix-id');
  const svix_timestamp = headersList.get('svix-timestamp');
  const svix_signature = headersList.get('svix-signature');

  // 必要なヘッダーが不足している場合はエラー
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error('Error: Missing svix headers');
    return new Response('Error: Missing svix headers', { status: 400 });
  }

  // リクエストボディを取得
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // svixのWebhookインスタンスを作成
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Webhookシグネチャを検証
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }

  // イベントタイプを取得
  const { type } = evt;
  const eventData = evt.data;

  console.log(`Webhook received: ${type}`, JSON.stringify(eventData, null, 2));

  // ユーザーが作成またはサインインしたとき
  if (type === 'user.created' || type === 'session.created') {
    const { id, email_addresses, username, first_name, last_name, image_url } = eventData;

    // メールアドレスを取得
    const email = email_addresses?.[0]?.email_address || '';
    
    if (!email) {
      console.error('Email not found in user data');
      return new Response('Email not found in user data', { status: 400 });
    }

    // 表示名を設定
    const displayName = first_name && last_name 
      ? `${first_name} ${last_name}` 
      : username || email.split('@')[0];

    // ユーザーが既に存在するか確認
    const { data: existingUser, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching user:', fetchError);
    }

    if (existingUser) {
      // ユーザーが存在する場合は更新
      console.log('Updating existing user in Supabase');
      const { error } = await supabase
        .from('users')
        .update({
          email: email,
          user_name: username || existingUser.user_name,
          display_name: displayName,
          profile_image_url: image_url || existingUser.profile_image_url,
          updated_at: new Date().toISOString()
        })
        .eq('clerk_id', id);

      if (error) {
        console.error('Error updating user in Supabase:', error);
        return new Response(JSON.stringify({ error: error.message }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    } else {
      // ユーザーが存在しない場合は作成
      console.log('Creating new user in Supabase');
      const { error } = await supabase.from('users').insert({
        email: email,
        user_name: username || email.split('@')[0],
        display_name: displayName,
        clerk_id: id,
        profile_image_url: image_url,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

      if (error) {
        console.error('Error inserting user into Supabase:', error);
        return new Response(JSON.stringify({ error: error.message }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // ユーザー情報が更新されたとき
  if (type === 'user.updated') {
    const { id, email_addresses, username, first_name, last_name, image_url } = eventData;

    // メールアドレスを取得
    const email = email_addresses?.[0]?.email_address;
    
    if (!email) {
      console.error('Email not found in user data');
      return new Response('Email not found in user data', { status: 400 });
    }

    // 表示名を設定
    const displayName = first_name && last_name 
      ? `${first_name} ${last_name}` 
      : username || email.split('@')[0];

    // ユーザーの更新
    console.log('Updating user in Supabase after Clerk update');
    const { error } = await supabase
      .from('users')
      .update({
        email: email,
        user_name: username || email.split('@')[0],
        display_name: displayName,
        profile_image_url: image_url,
        updated_at: new Date().toISOString()
      })
      .eq('clerk_id', id);

    if (error) {
      console.error('Error updating user in Supabase:', error);
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // ユーザーが削除されたとき
  if (type === 'user.deleted') {
    const { id } = eventData;

    // Supabaseからユーザーを削除
    console.log('Deleting user from Supabase');
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('clerk_id', id);

    if (error) {
      console.error('Error deleting user from Supabase:', error);
      return new Response(JSON.stringify({ error: error.message }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // その他のイベントは何もしない
  return new Response(JSON.stringify({ success: true, message: `Webhook ${type} received` }), { 
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
} 