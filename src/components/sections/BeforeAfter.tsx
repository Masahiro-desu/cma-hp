'use client';

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

// ビフォーアフターのデータ
const beforeAfterData = [
  {
    id: 1,
    title: "情報収集の効率化",
    beforeTitle: "従来の方法",
    beforeDesc: "複数の資料から必要な情報を探し出すのに時間がかかり、重要なポイントを見逃すことも。",
    beforeImage: "/images/before-research.jpg",
    beforeState: "情報収集に時間がかかる状態",
    afterTitle: "CMA導入後",
    afterDesc: "AIが迅速に情報を分析し、重要なポイントを抽出。意思決定までの時間が75%短縮されました。",
    afterImage: "/images/after-research.jpg",
    afterState: "素早く重要情報を把握できる状態"
  },
  {
    id: 2,
    title: "会議の生産性向上",
    beforeTitle: "従来の方法",
    beforeDesc: "議事録作成に多くの時間を費やし、重要な決定事項の追跡が困難でした。",
    beforeImage: "/images/before-meeting.jpg",
    beforeState: "会議の記録と追跡が困難な状態",
    afterTitle: "CMA導入後",
    afterDesc: "AIが自動的に議事録を作成し、アクションアイテムを抽出。フォローアップの効率が3倍に向上しました。",
    afterImage: "/images/after-meeting.jpg",
    afterState: "会議の成果を自動で整理できる状態"
  },
  {
    id: 3,
    title: "カスタマーサポートの品質",
    beforeTitle: "従来の方法",
    beforeDesc: "問い合わせへの回答が遅く、情報の正確性にばらつきがありました。",
    beforeImage: "/images/before-support.jpg",
    beforeState: "対応が遅く正確性にムラがある状態",
    afterTitle: "CMA導入後",
    afterDesc: "AIが24時間即時に正確な回答を提供。顧客満足度が35%向上し、サポートチームの負担も軽減されました。",
    afterImage: "/images/after-support.jpg",
    afterState: "迅速で正確な対応ができる状態"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const navigateCarousel = (direction: 'prev' | 'next') => {
    setCurrentIndex(prev => {
      if (direction === 'next') {
        return prev === beforeAfterData.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? beforeAfterData.length - 1 : prev - 1;
      }
    });
  };
  
  const data = beforeAfterData[currentIndex];

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-semibold mb-4 text-[#1a293f]">{data.title}</h2>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* カルーセルのナビゲーションボタン */}
          <button
            onClick={() => navigateCarousel('prev')}
            className="absolute left-[-30px] top-1/2 -translate-y-1/2 z-10 bg-[#1a5393] p-3 rounded-md shadow-md hover:bg-[#1a5393]/90 transition-all duration-300 focus:outline-none"
            aria-label="前のスライド"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button
            onClick={() => navigateCarousel('next')}
            className="absolute right-[-30px] top-1/2 -translate-y-1/2 z-10 bg-[#1a5393] p-3 rounded-md shadow-md hover:bg-[#1a5393]/90 transition-all duration-300 focus:outline-none"
            aria-label="次のスライド"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Before */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="bg-[#1a293f]/10 p-4">
                  <h4 className="text-xl font-medium text-[#1a293f] text-center">{data.beforeTitle}</h4>
                </div>
                <div className="relative h-64 w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a293f]/80 to-transparent z-10 flex items-end">
                    <p className="text-white p-6 text-sm">{data.beforeDesc}</p>
                  </div>
                  <div className="w-full h-full bg-[#1a293f]/5 flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#1a293f]/20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-red-500 text-center font-medium">{data.beforeState}</p>
                </div>
              </div>

              {/* After */}
              <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="bg-[#1a293f] p-4">
                  <h4 className="text-xl font-medium text-white text-center">{data.afterTitle}</h4>
                </div>
                <div className="relative h-64 w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a293f]/80 to-transparent z-10 flex items-end">
                    <p className="text-white p-6 text-sm">{data.afterDesc}</p>
                  </div>
                  <div className="w-full h-full bg-[#1a293f]/5 flex items-center justify-center">
                    <svg className="w-16 h-16 text-[#1a293f]/20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-green-500 text-center font-medium">{data.afterState}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* カルーセルインジケーター */}
          <div className="flex justify-center gap-2">
            {beforeAfterData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#1a293f] w-4" : "bg-gray-300"
                }`}
                aria-label={`スライド ${index + 1}に移動`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 