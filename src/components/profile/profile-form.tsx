'use client';

import { useState } from 'react';
import { User } from '@clerk/nextjs/server';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

interface ProfileFormProps {
  user: {
    id: string;
    email: string;
    user_name: string;
    display_name: string | null;
    bio: string | null;
    profile_image_url: string | null;
  } | null;
  clerkUser: User;
}

export function ProfileForm({ user, clerkUser }: ProfileFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_name: user?.user_name || '',
    display_name: user?.display_name || '',
    bio: user?.bio || '',
  });

  // 入力フィールドの変更を処理
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  // フォーム送信を処理
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    if (!user) return;
    
    setIsLoading(true);
    
    try {
      // Supabaseにプロフィール情報を更新
      const { error } = await supabase
        .from('users')
        .update({
          user_name: formData.user_name,
          display_name: formData.display_name,
          bio: formData.bio,
        })
        .eq('id', user.id);
      
      if (error) {
        throw error;
      }
      
      // 成功時にページをリフレッシュ
      router.refresh();
      alert('プロフィールを更新しました');
    } catch (error) {
      console.error('プロフィール更新中にエラーが発生しました:', error);
      alert('プロフィールの更新に失敗しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        {clerkUser.imageUrl ? (
          <div className="relative w-24 h-24 rounded-full overflow-hidden">
            <Image
              src={clerkUser.imageUrl}
              alt={clerkUser.username || 'Profile'}
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center">
            <span className="text-2xl font-bold text-muted-foreground">
              {formData.display_name?.[0]?.toUpperCase() || formData.user_name[0]?.toUpperCase() || 'U'}
            </span>
          </div>
        )}
        <div>
          <h2 className="text-xl font-medium">{formData.display_name || formData.user_name}</h2>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="user_name" className="block text-sm font-medium">
            ユーザー名
          </label>
          <input
            id="user_name"
            name="user_name"
            type="text"
            value={formData.user_name}
            onChange={handleChange}
            required
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
          />
          <p className="text-xs text-muted-foreground">
            他のユーザーに表示される一意のユーザー名
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="display_name" className="block text-sm font-medium">
            表示名
          </label>
          <input
            id="display_name"
            name="display_name"
            type="text"
            value={formData.display_name}
            onChange={handleChange}
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
          />
          <p className="text-xs text-muted-foreground">
            あなたのフルネームまたは表示したい名前
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="bio" className="block text-sm font-medium">
            自己紹介
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={4}
            value={formData.bio}
            onChange={handleChange}
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
          />
          <p className="text-xs text-muted-foreground">
            あなた自身について簡単な説明
          </p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? '更新中...' : '保存する'}
          </button>
        </div>
      </form>

      <div className="border-t pt-6">
        <p className="text-sm text-muted-foreground">
          プロフィール画像はClerkで管理されています。
          画像を変更するには、ユーザーメニューから設定を開いてください。
        </p>
      </div>
    </div>
  );
} 