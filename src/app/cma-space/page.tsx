import { Button } from "@/components/ui/button";
import Link from "next/link";

// ISRの設定
export const revalidate = 3600; // 1時間ごとに再生成

export default function CmaSpacePage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold text-[#1a293f] mb-8">CMA Space ギャラリー</h1>
      <p className="text-lg text-[#798BA6] mb-8">
        CMA Spaceでユーザーが作成した様々なコンテンツをご覧いただけます。
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="w-full h-48 bg-gray-200"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#1a293f] mb-2">プロジェクト {item}</h3>
              <p className="text-[#798BA6] mb-4">
                CMA Spaceを使った素晴らしいプロジェクトの説明です。
              </p>
              <div className="flex items-center text-sm text-[#798BA6]">
                <span>作成者: ユーザー{item}</span>
                <span className="mx-2">•</span>
                <span>公開日: 2023/0{item}/01</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/">
          <Button className="bg-[#1a293f] hover:bg-[#1a293f]/90 text-white">
            ホームに戻る
          </Button>
        </Link>
      </div>
    </div>
  );
} 