"use client"

import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <motion.footer
      className="py-8 border-t border-slate-800 bg-slate-900"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 text-center">
        <p className="text-slate-400">
          {t("footerText")} | &copy; {new Date().getFullYear()}
        </p>
      </div>
    </motion.footer>
  )
}

