'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// ユースケースのダミーデータ
const useCases = [
  {
    id: 1,
    title: "社内ナレッジの活用",
    description: "蓄積された社内知識をAIに学習させ、新入社員のオンボーディングやトレーニングに活用できます。",
    image: "/images/usecase-1.png"
  },
  {
    id: 2,
    title: "問い合わせ対応の効率化",
    description: "よくある質問や問い合わせに対して、AIが自動的に回答することで、対応時間を短縮できます。",
    image: "/images/usecase-2.png"
  },
  {
    id: 3,
    title: "業務マニュアルの検索",
    description: "複雑な業務マニュアルの中から必要な情報を素早く検索し、手順を簡潔に説明します。",
    image: "/images/usecase-3.png"
  },
  {
    id: 4,
    title: "会議の議事録作成",
    description: "会議の内容を要約し、重要なポイントや決定事項を自動的にまとめることができます。",
    image: "/images/usecase-4.png"
  },
  {
    id: 5,
    title: "データ分析のサポート",
    description: "収集したデータの傾向や特徴を分析し、意思決定に役立つ情報を提供します。",
    image: "/images/usecase-5.png"
  },
  {
    id: 6,
    title: "プロジェクト管理の効率化",
    description: "タスクの進捗状況を把握し、プロジェクトの遅延リスクを事前に検知します。",
    image: "/images/usecase-6.png"
  },
  {
    id: 7,
    title: "営業活動のサポート",
    description: "顧客情報や過去の取引履歴を分析し、最適な提案や営業戦略を立案します。",
    image: "/images/usecase-7.png"
  },
  {
    id: 8,
    title: "人材育成と評価",
    description: "社員のスキルや経験を分析し、最適な育成プランや評価基準を提案します。",
    image: "/images/usecase-8.png"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export function UseCaseGallery() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4">ユースケースギャラリー</h2>
          <p className="text-[#798BA6] max-w-2xl mx-auto">
            メモリからメッセージまで、様々なManusの使用例を通して、あなたのチームがどのように活用できるかをご紹介します。
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {useCases.map((useCase) => (
            <motion.div 
              key={useCase.id}
              variants={item}
              className="bg-white rounded-lg p-4 shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 bg-[#1a293f] rounded-full mb-4 flex items-center justify-center text-white">
                {useCase.id}
              </div>
              <h3 className="font-medium mb-2">{useCase.title}</h3>
              <p className="text-sm text-[#798BA6] mb-4">
                {useCase.description}
              </p>
              <div className="relative h-32 w-full rounded overflow-hidden">
                <Image 
                  src={useCase.image} 
                  alt={useCase.title} 
                  fill
                  className="object-cover rounded"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Button variant="outline" className="rounded-full border-[#1a293f] text-[#1a293f]">
            すべてのユースケースを見る →
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 