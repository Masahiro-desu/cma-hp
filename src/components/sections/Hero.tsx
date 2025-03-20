'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-12 text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-semibold mb-4"
      >
        Create My Agent
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-[#798BA6] max-w-2xl mx-auto mb-12"
      >
        もっと多くの人がアイデアを形にする世の中へ。
        CMAは、MVPの開発補助・業務効率化ツールの提供・AIの最新情報発信を通してあなたのアイデアを30分で形にするサービスです。
      </motion.p>
      
      {/* 動画/イメージセクション */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="relative max-w-3xl mx-auto mb-12 rounded-lg overflow-hidden"
      >
        <motion.div 
          className="relative aspect-video bg-[#1a293f]/5 rounded-lg overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <Image 
            src="/images/manus-intro.jpg" 
            alt="Introducing Manus" 
            fill
            className="object-cover"
          />
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <div className="bg-white rounded-full p-3 shadow-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="#1a293f"/>
              </svg>
            </div>
          </motion.div>
          <div className="absolute bottom-0 left-0 p-6 text-white">
            <h2 className="text-2xl font-semibold">Introducing<br />Create My Agent</h2>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Button className="bg-[#1a293f] hover:bg-[#1a293f]/90 text-white rounded-full">
          CMAを見る
        </Button>
      </motion.div>
    </section>
  );
} 