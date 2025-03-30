"use client";

import { useState, useRef } from "react";
import { ClipboardCopy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface MarkdownEditorProps {
  maxLength?: number;
}

export default function MarkdownEditor({ maxLength = 500 }: MarkdownEditorProps) {
  const [text, setText] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };

  const copyToClipboard = async () => {
    if (text) {
      try {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("クリップボードへのコピーに失敗しました", err);
      }
    }
  };

  const remainingChars = maxLength - text.length;
  const remainingPercentage = (remainingChars / maxLength) * 100;
  const isNearLimit = remainingPercentage < 20;

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-800">メモ</h3>
        <p className="text-sm text-gray-600">Markdown形式で入力できます</p>
      </div>

      <div className="p-4 relative">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="ここにメモを入力してください..."
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono text-sm"
          aria-label="マークダウンエディター"
        />
        
        <div className="flex justify-between items-center mt-2">
          <div className={`text-sm ${isNearLimit ? 'text-orange-500 font-medium' : 'text-gray-500'}`}>
            残り {remainingChars} 文字
          </div>
          
          <button
            onClick={copyToClipboard}
            disabled={!text}
            className={`
              flex items-center gap-1 px-3 py-2 rounded-md transition-all duration-300 shadow-sm
              ${isCopied 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : text 
                  ? 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }
            `}
            aria-label="テキストをコピー"
            title={text ? "テキストをコピー" : "コピーするテキストがありません"}
          >
            {isCopied ? (
              <>
                <Check size={16} className="animate-pulse" />
                <span className="text-xs font-medium">コピー完了</span>
              </>
            ) : (
              <>
                <ClipboardCopy size={16} />
                <span className="text-xs font-medium">コピー</span>
              </>
            )}
          </button>
        </div>
      </div>

      {text && (
        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-700 mb-2">プレビュー:</h4>
          <div className="p-3 bg-white border border-gray-200 rounded-md prose prose-sm max-w-none">
            <ReactMarkdown>{text}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
} 