"use client"

import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"
import { Calculator, ArrowRightLeft } from "lucide-react"

interface PageHeaderProps {
  title: string
  description: string
  icon: string
}

export default function PageHeader({ title, description, icon }: PageHeaderProps) {
  const { t } = useLanguage()

  const getIcon = () => {
    switch (icon) {
      case "Calculator":
        return <Calculator className="h-10 w-10 text-teal-500" />
      case "ArrowRightLeft":
        return <ArrowRightLeft className="h-10 w-10 text-teal-500" />
      default:
        return null
    }
  }

  return (
    <motion.section
      className="py-16 bg-slate-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="flex items-center justify-center mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {getIcon()}
        </motion.div>
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-4 text-teal-400"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {t(title)}
        </motion.h1>
        <motion.p
          className="text-xl text-slate-300 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {t(description)}
        </motion.p>
      </div>
    </motion.section>
  )
}

