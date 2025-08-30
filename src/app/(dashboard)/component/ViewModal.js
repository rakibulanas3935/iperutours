'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export default function ViewModal({ open, onClose, title = 'Details', data = {} }) {
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
            className="relative w-full max-w-lg rounded-2xl bg-white/10 backdrop-blur-lg border border-white/10 text-white p-6 shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white hover:text-red-500 transition"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">{title}</h2>

            {/* Image (if exists) */}
            {data.image && (
              <div className="mb-4">
                <img
                  src={data.image}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-xl border border-white/20 shadow-md"
                />
              </div>
            )}

            {/* Content */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {Object.keys(data).length > 0 ? (
                Object.entries(data).map(([key, value]) =>
                  key !== "image" ? ( // don’t duplicate the image
                    <div
                      key={key}
                      className="flex justify-between border-b border-white/10 pb-2"
                    >
                      <span className="capitalize text-gray-300">{key}:</span>
                      <span className="font-medium text-white">{String(value)}</span>
                    </div>
                  ) : null
                )
              ) : (
                <p className="text-gray-300">No details available.</p>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-md bg-white/20 hover:bg-white/30 transition text-white"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
