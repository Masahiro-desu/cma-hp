'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Manus Spaceのダミーデータ
const spaces = [
  {
    id: 1,
    title: "営業資料ライブラリ",
    creator: "Sales Team",
    rating: 5,
    uses: 124,
    image: "/images/space-1.png"
  },
  {
    id: 2,
    title: "顧客サポートナレッジベース",
    creator: "Support Dept",
    rating: 4,
    uses: 87,
    image: "/images/space-2.png"
  },
  {
    id: 3,
    title: "プロジェクト管理ガイド",
    creator: "PM Office",
    rating: 5,
    uses: 63,
    image: "/images/space-3.png"
  },
  {
    id: 4,
    title: "新入社員オンボーディング",
    creator: "HR Team",
    rating: 4,
    uses: 52,
    image: "/images/space-4.png"
  },
  {
    id: 5,
    title: "製品技術仕様書",
    creator: "Engineering",
    rating: 5,
    uses: 98,
    image: "/images/space-5.png"
  },
  {
    id: 6,
    title: "マーケティングキャンペーンガイド",
    creator: "Marketing",
    rating: 4,
    uses: 45,
    image: "/images/space-6.png"
  },
  {
    id: 7,
    title: "財務レポートテンプレート",
    creator: "Finance Dept",
    rating: 4,
    uses: 32,
    image: "/images/space-7.png"
  },
  {
    id: 8,
    title: "研究開発ドキュメント",
    creator: "R&D Team",
    rating: 5,
    uses: 76,
    image: "/images/space-8.png"
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

export function SpaceGallery() {
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
          <h2 className="text-2xl font-semibold mb-4">CMA Space ギャラリー</h2>
          <p className="text-[#798BA6] max-w-2xl mx-auto">
            CMAで作成されたさまざまなスペースをご紹介します。あなたのプロジェクトの参考になるかもしれません。
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {spaces.map((space) => (
            <motion.div 
              key={space.id}
              variants={item}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-40 bg-[#1a293f]/10 relative">
                <Image 
                  src={space.image} 
                  alt={space.title} 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium mb-1">{space.title}</h3>
                <p className="text-xs text-[#798BA6] mb-2">by {space.creator}</p>
                <div className="flex items-center text-xs text-[#798BA6]">
                  <span className="mr-2">⭐ {space.rating}</span>
                  <span>{space.uses}+ 利用</span>
                </div>
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
            すべてのスペースを見る →
          </Button>
        </motion.div>
      </div>
    </section>
  );
} 