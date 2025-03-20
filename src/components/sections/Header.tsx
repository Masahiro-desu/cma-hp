'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 px-6 flex justify-between items-center border-b"
    >
      <div className="flex items-center">
        <Image 
          src="/images/manus-logo.png" 
          alt="Manus" 
          width={100} 
          height={30}
          className="mr-8"
        />
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-sm text-gray-600 hover:text-[#1a293f]">ブログ</a>
          <a href="#" className="text-sm text-gray-600 hover:text-[#1a293f]">活用例</a>
          <a href="#" className="text-sm text-gray-600 hover:text-[#1a293f]">マーケット</a>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <a href="#" className="text-sm text-gray-600 hover:text-[#1a293f]">ログイン</a>
        <Button className="bg-[#1a293f] hover:bg-[#1a293f]/90 text-white rounded-full">
          無料で試す
        </Button>
      </div>
    </motion.div>
  );
} 