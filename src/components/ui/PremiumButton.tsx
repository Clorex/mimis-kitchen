"use client";

import { motion } from "framer-motion";

export default function PremiumButton({
  children,
  onClick,
  className = "",
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`rounded-full px-6 py-3 text-white font-semibold bg-gradient-to-r from-[#FF512F] to-[#F09819] shadow-lg shadow-orange-200 ${className}`}
    >
      {children}
    </motion.button>
  );
}

