import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  title?: string;
  description?: string;
}

export default function Header({
  title = "AI キャッチアップ",
  description = "AIに関連する最新情報をXのタイムラインから収集",
}: HeaderProps) {
  return (
    <header className="py-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center text-white hover:text-blue-100 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          <span className="text-sm">トップに戻る</span>
        </Link>
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="mt-2 text-blue-100">{description}</p>
        </div>
      </div>
    </header>
  );
}
