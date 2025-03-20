'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function Header() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 px-6 flex justify-between items-center border-b"
    >
      <div className="flex items-center">
        <Link href="/">
          <Image 
            src="/logo_long.png" 
            alt="CMA" 
            width={100} 
            height={30}
            className="mr-8"
          />
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/use-cases" className="text-sm text-[#798BA6] hover:text-[#1a293f]">ユースケースギャラリー</Link>
          <Link href="/how-others-use" className="text-sm text-[#798BA6] hover:text-[#1a293f]">他の人がCMAをどのように使っているか</Link>
          <Link href="/cma-space" className="text-sm text-[#798BA6] hover:text-[#1a293f]">CMA Space ギャラリー</Link>
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="#" className="text-sm text-[#798BA6] hover:text-[#1a293f]">ログイン</Link>
        <Button className="bg-[#1a293f] hover:bg-[#1a293f]/90 text-white rounded-full">
          無料で試す
        </Button>
      </div>
    </motion.div>
  );
} 