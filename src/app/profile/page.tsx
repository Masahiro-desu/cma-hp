import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/profile/profile-form';
import { supabase } from '@/lib/prismaClient';
import { currentUser } from '@clerk/nextjs/server';

// 動的レンダリング（ユーザーデータに依存するため）
export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Supabaseからユーザー情報を取得
  const { data: userData, error } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching user data:', error);
  }

  // ユーザーがSupabaseに存在しない場合は作成
  if (!userData) {
    const email = user.emailAddresses[0]?.emailAddress;
    const username = user.username || (email ? email.split('@')[0] : '');
    const displayName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}` 
      : username;

    const { error } = await supabase.from('users').insert({
      email: email,
      user_name: username,
      display_name: displayName,
      clerk_id: user.id,
      profile_image_url: user.imageUrl,
    });

    if (error) {
      console.error('Error creating user in Supabase:', error);
    }
  }

  // 最新のデータを取得
  const { data: latestUserData } = await supabase
    .from('users')
    .select('*')
    .eq('clerk_id', user.id)
    .single();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">プロフィール</h1>
      <div className="max-w-2xl">
        <ProfileForm user={latestUserData} clerkUser={user} />
      </div>
    </div>
  );
}