'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

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
              src="/logo.gif" 
              alt="CMA" 
              width={100} 
              height={30}
              className="mb-4 rounded-md"
            />
            <p className="text-sm text-gray-300 max-w-xs">
              クリエイティブ・メディエーション・エージェンシー
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-medium mb-4">会社情報</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/about" className="hover:text-white transition-colors">会社概要</Link></li>
                <li><Link href="/team" className="hover:text-white transition-colors">チーム</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">採用情報</Link></li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-medium mb-4">サービス</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/services/planning" className="hover:text-white transition-colors">広告プランニング</Link></li>
                <li><Link href="/services/digital" className="hover:text-white transition-colors">デジタルマーケティング</Link></li>
                <li><Link href="/services/creative" className="hover:text-white transition-colors">クリエイティブ制作</Link></li>
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
                <li><Link href="/contact" className="hover:text-white transition-colors">お問い合わせ</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">利用規約</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link></li>
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
          <p>&copy; {new Date().getFullYear()} CMA, Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/terms" className="hover:text-white transition-colors">利用規約</Link>
            <Link href="/privacy" className="hover:text-white transition-colors">プライバシーポリシー</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
} 