"use client";

import { useLanguage } from "./language-provider";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowDown,
  CheckCircle,
  Code,
  CloudLightning,
  Calculator,
  ArrowRightLeft,
  Ruler,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Hero() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const heroPoints = [
    {
      icon: <CheckCircle className="h-4 w-4 mr-2" />,
      text: "Precise Measurement Conversions",
    },
    {
      icon: <Code className="h-4 w-4 mr-2" />,
      text: "Traditional & Modern Units Support",
    },
    {
      icon: <CloudLightning className="h-4 w-4 mr-2" />,
      text: "Instant Calculation Results",
    },
  ];

  return (
    <motion.section
      className="relative min-h-[90vh] pt-6 pb-8 flex items-center justify-center bg-gradient-to-b from-primary/10 via-primary/5 to-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-teal-500/10"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 1.2, 1],
              opacity: [0, 0.2, 0.1],
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 text-center z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="inline-block px-4 py-1 rounded-full bg-teal-500/10 text-teal-500 font-medium mb-6 border border-teal-500/20"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Simplify Nepali Land Measurements
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-teal-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Nepali Land Measurement Calculator
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Easily calculate and convert between Ropani, Aana, Bigha, Katha,
            Dhur and international measurement units with precision
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-10"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {heroPoints.map((point, index) => (
              <motion.div
                key={index}
                className="flex items-center text-sm md:text-base bg-slate-800/60 px-4 py-2 rounded-full text-slate-200"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
              >
                {point.icon}
                <span>{point.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Calculator capabilities section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.div
              className="bg-slate-800/60 p-4 rounded-lg border border-slate-700"
              whileHover={{ y: -5, borderColor: "rgb(20, 184, 166)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Calculator className="h-6 w-6 text-teal-500 mb-2" />
              <h3 className="font-medium text-white mb-1">Area Calculator</h3>
              <p className="text-sm text-slate-300">
                Calculate land area from length and breadth with support for
                both hill and Terai measurement systems
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-800/60 p-4 rounded-lg border border-slate-700"
              whileHover={{ y: -5, borderColor: "rgb(20, 184, 166)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRightLeft className="h-6 w-6 text-teal-500 mb-2" />
              <h3 className="font-medium text-white mb-1">Unit Converter</h3>
              <p className="text-sm text-slate-300">
                Convert between Ropani, Aana, Paisa, Daam, Bigha, Katha, Dhur
                and international units instantly
              </p>
            </motion.div>

            <motion.div
              className="bg-slate-800/60 p-4 rounded-lg border border-slate-700"
              whileHover={{ y: -5, borderColor: "rgb(20, 184, 166)" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Ruler className="h-6 w-6 text-teal-500 mb-2" />
              <h3 className="font-medium text-white mb-1">Regional Units</h3>
              <p className="text-sm text-slate-300">
                Support for both hill region (Ropani system) and Terai region
                (Bigha system) measurement units
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Link href="/calculator">
              <Button
                size="lg"
                className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8"
              >
                Go to Calculator
              </Button>
            </Link>
            <Link href="/converter">
              <Button
                size="lg"
                variant="outline"
                className="border-teal-600 text-teal-500 hover:text-teal-400 hover:bg-teal-600/10 font-medium px-8"
              >
                Go to Converter
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          delay: 1.2,
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={scrollToFeatures}
          className="rounded-full bg-slate-800/30 text-teal-500 hover:text-teal-400 hover:bg-slate-800/50"
        >
          <ArrowDown />
        </Button>
      </motion.div>
    </motion.section>
  );
}
