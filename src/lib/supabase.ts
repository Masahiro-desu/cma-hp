import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの初期化
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';

// 環境変数が設定されていない場合はエラーを表示
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase環境変数が設定されていません。.envと.env.localファイルを確認してください。');
}

// Supabaseクライアントの型定義
interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string | null;
          user_name: string;
          display_name: string | null;
          bio: string | null;
          profile_image_url: string | null;
          clerk_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash?: string | null;
          user_name: string;
          display_name?: string | null;
          bio?: string | null;
          profile_image_url?: string | null;
          clerk_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string | null;
          user_name?: string;
          display_name?: string | null;
          bio?: string | null;
          profile_image_url?: string | null;
          clerk_id?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase; 