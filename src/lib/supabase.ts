import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの初期化
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nualpenqlmwjwwftbgft.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51YWxwZW5xbG13and3ZnRiZ2Z0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0NzY4MDYsImV4cCI6MjA1ODA1MjgwNn0.WYg65TmTz03Ww9Ha11ZcBqhdgUCpFNqFz5NeSSzfMoU';

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