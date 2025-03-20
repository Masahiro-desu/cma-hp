'use client';

import { motion } from "framer-motion";

// ベンチマークデータ
const benchmarks = [
  {
    id: 1,
    name: "GPT-4 Benchmark",
    score: 84,
    color: "bg-gray-500"
  },
  {
    id: 2,
    name: "Claude",
    score: 78,
    color: "bg-gray-500"
  },
  {
    id: 3,
    name: "Manus",
    score: 95,
    color: "bg-[#1a293f]"
  }
];

export function Benchmark() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-semibold mb-4">ベンチマーク</h2>
          <p className="text-[#798BA6] max-w-2xl mx-auto">
            Manusの一般的なAIチャットボットと比較した際のパフォーマンスをご紹介します。
            カスタマイズされたナレッジベースを活用することで、より的確な回答を提供します。
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {benchmarks.map((benchmark, index) => (
            <motion.div 
              key={benchmark.id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.2,
                type: "spring",
                stiffness: 100
              }}
              className="mb-8 last:mb-0"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">{benchmark.name}</p>
                <p className="text-sm">{benchmark.score}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${benchmark.score}%` }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 1, 
                    delay: 0.5 + (index * 0.2),
                    ease: "easeOut"
                  }}
                  className={`${benchmark.color} h-2 rounded-full`}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 