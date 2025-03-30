"use client";

import { useEffect, useRef } from "react";

// ユーザーリスト
const TWITTER_USERS = [
  "masahirochaen",
  "minchoi",
  "sama",
  "OpenAI",
  "shota7180",
  "Google",
  "GeminiApp",
];

// Xのスクリプトを動的に読み込む関数
const loadXScript = () => {
  if (typeof window !== "undefined" && !window.twttr) {
    const script = document.createElement("script");
    script.src = "https://platform.x.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.body.appendChild(script);
    
    return new Promise<void>((resolve) => {
      script.onload = () => resolve();
    });
  }
  return Promise.resolve();
};

interface UserTimelineProps {
  username?: string;
  height?: number;
  theme?: "light" | "dark";
  limit?: number;
}

export default function UserTimeline({
  username = TWITTER_USERS[0],
  height = 600,
  theme = "light",
  limit = 5,
}: UserTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const initializeTimeline = async () => {
      await loadXScript();

      if (!containerRef.current || !window.twttr || !isMounted) return;

      // 既存のコンテンツをクリア
      containerRef.current.innerHTML = "";

      // タイムラインの作成
      window.twttr.widgets.createTimeline(
        {
          sourceType: "profile",
          screenName: username,
        },
        containerRef.current,
        {
          height,
          theme,
          tweetLimit: limit,
          chrome: "noheader, nofooter",
          dnt: true,
        }
      );
    };

    initializeTimeline();

    return () => {
      isMounted = false;
    };
  }, [username, height, theme, limit]);

  return (
    <div className="w-full max-w-xl mx-auto rounded-lg overflow-hidden shadow-md">
      <div className="p-2 bg-blue-50 border-b border-blue-100">
        <h3 className="font-medium text-blue-700">@{username}さんのタイムライン</h3>
      </div>
      <div ref={containerRef} className="bg-white">
        <div className="p-8 text-center text-gray-500">
          タイムラインを読み込み中...
        </div>
      </div>
    </div>
  );
}

// TwitterのJSライブラリの型定義
declare global {
  interface Window {
    twttr: {
      widgets: {
        createTimeline: (
          options: {
            sourceType: string;
            screenName?: string;
          },
          element: HTMLElement,
          parameters?: {
            height?: number;
            theme?: "light" | "dark";
            tweetLimit?: number;
            chrome?: string;
            dnt?: boolean;
          }
        ) => void;
      };
    };
  }
}
