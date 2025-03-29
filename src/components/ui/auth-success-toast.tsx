'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthSuccessToastProps {
  onClose: () => void;
}

export function AuthSuccessToast({ onClose }: AuthSuccessToastProps) {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
      router.refresh();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose, router]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50"
      >
        <div className="bg-green-50 border border-green-200 rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex items-center space-x-3">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            <div>
              <h3 className="text-sm font-medium text-green-800">認証成功</h3>
              <p className="text-sm text-green-700">Xの認証が完了しました</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 