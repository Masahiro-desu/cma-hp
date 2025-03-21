import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Database型の定義
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: number;
          name: string;
          email: string;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: number;
          name: string;
          email: string;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: number;
          name?: string;
          email?: string;
          avatar_url?: string | null;
          updated_at?: string;
        };
      };
    };
  };
}

// ダミークライアントの型定義
interface DummySupabaseClient {
  from: (table: string) => {
    select: () => { data: null; error: Error };
  };
  auth: {
    signUp: () => { data: null; error: Error };
    signIn: () => { data: null; error: Error };
  };
}

let supabaseClient: SupabaseClient<Database> | DummySupabaseClient;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase環境変数が設定されていません。.envと.env.localファイルを確認してください。');
  
  // この処理を追加して、ビルド時にエラーが発生しても処理を続行できるようにします
  if (process.env.NODE_ENV === 'production') {
    // プロダクション環境でのビルド時にはダミークライアントを使用
    supabaseClient = {
      // 必要最低限のメソッドをモック
      from: () => ({
        select: () => ({ data: null, error: new Error('Supabase環境変数が設定されていません') })
      }),
      auth: {
        signUp: () => ({ data: null, error: new Error('Supabase環境変数が設定されていません') }),
        signIn: () => ({ data: null, error: new Error('Supabase環境変数が設定されていません') })
      }
    };
  } else {
    throw new Error('supabaseUrl and supabaseAnonKey are required.');
  }
} else {
  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey);
}

export const supabase = supabaseClient;
export default supabase; 