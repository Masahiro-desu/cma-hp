"use client";

import { useState } from "react";
import dynamic from 'next/dynamic';
import Header from "@/components/detail-sections/Header";
import Footer from "@/components/detail-sections/Footer";
import MarkdownEditor from "@/components/ai-catch-up/MarkdownEditor";

// ユーザーリスト
const TWITTER_USERS = [
  "masahirochaen",
  "minchoi",
  "sama",
  "OpenAI",
  "shota7180",
  "Google",
  "GeminiApp",
  "elonmusk",
  "SuguruKun_ai",
];

// UserTimelineを動的にインポート
const UserTimeline = dynamic(
  () => import("@/components/ai-catch-up/UserTimeline"),
  {
    loading: () => <TimelineSkeleton />, // ローディング中にスケルトンを表示
    ssr: false, // サーバーサイドレンダリングを無効化 (クライアントサイドでのみレンダリング)
  }
);

// タイムライン用スケルトンローダー
function TimelineSkeleton() {
  return (
    <div className="w-full max-w-xl mx-auto rounded-lg overflow-hidden shadow-md animate-pulse">
      <div className="p-2 bg-blue-50 border-b border-blue-100">
        <div className="h-4 bg-blue-200 rounded w-3/4"></div>
      </div>
      <div className="bg-white p-4 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AICatchUpPage() {
  const [selectedUser, setSelectedUser] = useState(TWITTER_USERS[0]);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // テーマの切り替え
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* ヘッダーセクション */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  AIリーダーのタイムライン
                </h2>
                <p className="text-gray-600 mt-1">
                  AIに関する最新の動向やニュースをチェック
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="表示するユーザーを選択"
                >
                  {TWITTER_USERS.map((user) => (
                    <option key={user} value={user}>
                      @{user}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={toggleTheme}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors"
                  aria-label={`${theme === "light" ? "ダーク" : "ライト"}モードに切り替え`}
                >
                  {theme === "light" ? "ダークモード" : "ライトモード"}
                </button>
              </div>
            </div>
            
            {/* メインコンテンツエリア：タイムラインとエディタを横並びにする */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* タイムラインセクション (左側) */}
              <div className="lg:w-1/2">
                <UserTimeline 
                  username={selectedUser} 
                  theme={theme}
                  height={650}
                  limit={10}
                />
              </div>
              
              {/* メモセクション (右側) */}
              <div className="lg:w-1/2">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  メモを取る
                </h3>
                <p className="text-gray-600 mb-6">
                  タイムラインを見ながらメモを取れます (Markdown対応)。
                </p>
                <MarkdownEditor maxLength={500} />
              </div>
            </div>
            
            {/* 情報セクション */}
            <div className="mt-12 p-6 bg-blue-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Xウィジェットについて
              </h3>
              <p className="text-gray-700">
                表示するアカウントを選択することができます。
              </p>
              <p className="text-gray-700 mt-3">
                詳しくは<a 
                  href="https://developer.x.com/en/docs/x-for-websites" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >X開発者ドキュメント</a>をご覧ください。
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
