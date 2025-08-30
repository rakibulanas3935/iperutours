'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ConfirmModal({ open, onClose, onConfirm, title = 'Are you sure?', description = 'This action cannot be undone.' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-full max-w-md rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 text-white p-6 shadow-xl"
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white hover:text-red-500 transition"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-sm text-gray-300 mb-6">{description}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-white/20 hover:bg-white/30 transition text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition text-white font-medium"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
