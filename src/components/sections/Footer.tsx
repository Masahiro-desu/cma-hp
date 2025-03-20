'use client';

import Image from "next/image";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="bg-[#1a293f] text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <Image 
              src="/images/manus-logo-white.png" 
              alt="Manus" 
              width={100} 
              height={30}
              className="mb-4"
            />
            <p className="text-sm text-gray-300 max-w-xs">
              社内の知識をAIにインプットし、チームの業務効率を向上させるプラットフォーム
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-medium mb-4">プロダクト</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">機能</a></li>
                <li><a href="#" className="hover:text-white transition-colors">料金</a></li>
                <li><a href="#" className="hover:text-white transition-colors">活用例</a></li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-medium mb-4">企業情報</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">会社概要</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ブログ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">採用情報</a></li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="font-medium mb-4">リソース</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">ドキュメント</a></li>
                <li><a href="#" className="hover:text-white transition-colors">サポート</a></li>
                <li><a href="#" className="hover:text-white transition-colors">お問い合わせ</a></li>
              </ul>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="pt-8 border-t border-gray-700 text-sm text-gray-300 flex flex-col md:flex-row justify-between items-center"
        >
          <p>© 2024 CMA, Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">利用規約</a>
            <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 