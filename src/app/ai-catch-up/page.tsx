"use client";

import { useState } from "react";
import Header from "@/components/detail-sections/Header";
import Footer from "@/components/detail-sections/Footer";
import UserTimeline from "@/components/ai-catch-up/UserTimeline";
import MarkdownEditor from "@/components/ai-catch-up/MarkdownEditor";

// ユーザーリスト（UserTimeline.tsxと同じリスト）
const TWITTER_USERS = [
  "masahirochaen",
  "minchoi",
  "sama",
  "OpenAI",
  "shota7180",
  "Google",
  "GeminiApp",
  "elonmusk",
];

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
          <div className="max-w-5xl mx-auto">
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
            
            {/* タイムラインセクション */}
            <UserTimeline 
              username={selectedUser} 
              theme={theme}
              height={650}
              limit={10}
            />
            
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

            {/* メモセクション */}
            <div className="mt-12 mb-12">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                メモを取る
              </h3>
              <p className="text-gray-600 mb-6">
                このセクションでは、タイムラインを閲覧しながらメモを取ることができます。メモはMarkdown形式で入力可能です。
              </p>
              <MarkdownEditor maxLength={500} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
