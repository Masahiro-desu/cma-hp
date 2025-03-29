'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthStatusToastProps {
  isAuthenticated: boolean;
  onClose: () => void;
}

export function AuthStatusToast({ isAuthenticated, onClose }: AuthStatusToastProps) {
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
        <div className={`${
          isAuthenticated 
            ? "bg-green-50 border border-green-200" 
            : "bg-yellow-50 border border-yellow-200"
        } rounded-lg shadow-lg p-4 max-w-sm`}>
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <AlertCircle className="h-6 w-6 text-yellow-500" />
            )}
            <div>
              <h3 className={`text-sm font-medium ${
                isAuthenticated ? "text-green-800" : "text-yellow-800"
              }`}>
                {isAuthenticated ? "認証済み" : "未認証"}
              </h3>
              <p className={`text-sm ${
                isAuthenticated ? "text-green-700" : "text-yellow-700"
              }`}>
                {isAuthenticated 
                  ? "Xの認証が完了しています" 
                  : "Xの認証が必要です"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
} 