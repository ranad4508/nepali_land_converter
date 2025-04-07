"use client";

import { useLanguage } from "./language-provider";
import { motion } from "framer-motion";
import {
  Calculator,
  ArrowRightLeft,
  Languages,
  ChevronRight,
  Star,
  Shield,
  Clock,
  Code,
  Ruler,
  Building,
  Map,
  Landmark,
  Briefcase,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function FeatureSection() {
  const { t } = useLanguage();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [filteredFeatures, setFilteredFeatures] = useState<any[]>([]);

  const features = [
    {
      icon: <Calculator className="h-12 w-12 text-teal-500" />,
      title: "Land Calculator",
      description:
        "Calculate land area from length and breadth in various units",
      benefits: [
        "Calculate area from length and breadth measurements",
        "Support for feet and meter input measurements",
        "Convert results to Ropani, Aana, Paisa, Daam or Bigha, Katha, Dhur",
        "Precise calculations with decimal support for accurate results",
      ],
      link: "/calculator",
      bgColor: "bg-gradient-to-br from-teal-900/20 to-slate-900",
      category: "calculator",
    },
    {
      icon: <ArrowRightLeft className="h-12 w-12 text-teal-500" />,
      title: "Land Converter",
      description:
        "Convert between traditional Nepali and modern measurement units",
      benefits: [
        "Convert between all Nepali land units (Ropani, Aana, Bigha, etc.)",
        "Support for international units (sq. ft, sq. m)",
        "Instant conversion with accurate results to 4 decimal places",
        "Handles complex unit relationships between hill and Terai systems",
      ],
      link: "/converter",
      bgColor: "bg-gradient-to-br from-indigo-900/20 to-slate-900",
      category: "converter",
    },
    {
      icon: <Languages className="h-12 w-12 text-teal-500" />,
      title: "Bilingual Support",
      description: "Use the app in both English and Nepali languages",
      benefits: [
        "Full support for English and Nepali interfaces",
        "Native language terminology for all measurement units",
        "Easy language switching with a single click",
        "Culturally appropriate measurement terms in both languages",
      ],
      link: "/",
      bgColor: "bg-gradient-to-br from-cyan-900/20 to-slate-900",
      category: "other",
    },
  ];

  // Update filtered features when activeTab changes
  useEffect(() => {
    if (activeTab === "all") {
      setFilteredFeatures(features);
    } else {
      setFilteredFeatures(
        features.filter((feature) => feature.category === activeTab)
      );
    }
  }, [activeTab]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const additionalFeatures = [
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      title: "Accurate Calculations",
    },
    {
      icon: <Shield className="h-5 w-5 text-blue-500" />,
      title: "No Data Collection",
    },
    {
      icon: <Clock className="h-5 w-5 text-purple-500" />,
      title: "Instant Results",
    },
    {
      icon: <Code className="h-5 w-5 text-green-500" />,
      title: "Regular Updates",
    },
  ];

  // Land measurement units information
  const landUnits = [
    {
      name: "Ropani",
      description: "Traditional land unit used in hilly regions of Nepal",
      equivalent: "1 Ropani = 16 Aana = 5476 sq. ft",
      icon: <Ruler className="h-5 w-5 text-teal-500" />,
    },
    {
      name: "Aana",
      description: "Subdivision of Ropani used in the hill regions",
      equivalent: "1 Aana = 4 Paisa = 342.25 sq. ft",
      icon: <Ruler className="h-5 w-5 text-teal-500" />,
    },
    {
      name: "Paisa",
      description: "Smaller unit in the Ropani system",
      equivalent: "1 Paisa = 4 Daam = 85.56 sq. ft",
      icon: <Ruler className="h-5 w-5 text-teal-500" />,
    },
    {
      name: "Daam",
      description: "Smallest unit in the Ropani system",
      equivalent: "1 Daam = 21.39 sq. ft",
      icon: <Ruler className="h-5 w-5 text-teal-500" />,
    },
    {
      name: "Bigha",
      description: "Traditional land unit used in Terai region of Nepal",
      equivalent: "1 Bigha = 20 Katha = 72,900 sq. ft",
      icon: <Map className="h-5 w-5 text-teal-500" />,
    },
    {
      name: "Katha",
      description: "Subdivision of Bigha used in the Terai region",
      equivalent: "1 Katha = 20 Dhur = 3,645 sq. ft",
      icon: <Map className="h-5 w-5 text-teal-500" />,
    },
    {
      name: "Dhur",
      description: "Smallest unit in the Bigha system",
      equivalent: "1 Dhur = 182.25 sq. ft",
      icon: <Map className="h-5 w-5 text-teal-500" />,
    },
  ];

  // Use cases
  const useCases = [
    {
      icon: <Building className="h-10 w-10 text-teal-500" />,
      title: "Real Estate Professionals",
      description:
        "Quickly calculate and convert land measurements for property listings, transactions, and valuations",
    },
    {
      icon: <Landmark className="h-10 w-10 text-teal-500" />,
      title: "Government Officials",
      description:
        "Accurately convert between traditional and modern units for land records, taxation, and urban planning",
    },
    {
      icon: <Briefcase className="h-10 w-10 text-teal-500" />,
      title: "Construction & Development",
      description:
        "Plan projects with precise land measurements in preferred units for accurate material estimation",
    },
    {
      icon: <Users className="h-10 w-10 text-teal-500" />,
      title: "Individual Landowners",
      description:
        "Understand your property measurements in both traditional and modern terms for better decision making",
    },
  ];

  return (
    <section
      id="features"
      className="py-20 bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-900 dark:to-slate-950"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-block px-4 py-1 rounded-full bg-teal-500/10 text-teal-500 font-medium mb-4 border border-teal-500/20"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Powerful Tools
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-teal-400">
            Features
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Our comprehensive tools make Nepali land measurements simple and
            accurate
          </p>
        </motion.div>

        {/* Feature tabs */}
        <motion.div
          className="flex justify-center mb-12 gap-2 flex-wrap"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          {[
            { id: "all", label: "All Features" },
            { id: "calculator", label: "Calculator" },
            { id: "converter", label: "Converter" },
            { id: "other", label: "Other Features" },
          ].map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={`${
                activeTab === tab.id
                  ? "bg-teal-600 hover:bg-teal-700 text-white"
                  : "border-slate-700 text-slate-300 hover:border-teal-500 hover:text-teal-400"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className={`rounded-xl p-8 text-center flex flex-col items-center border border-slate-700 transition-all duration-300 ${
                feature.bgColor
              } ${
                hoveredFeature === index
                  ? "border-teal-500 shadow-lg shadow-teal-500/10"
                  : "hover:border-teal-500/50"
              }`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <motion.div
                className="mb-6 p-4 rounded-full bg-slate-800/60"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {feature.icon}
              </motion.div>

              <h3 className="text-2xl font-bold mb-3 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-300 mb-6">{feature.description}</p>

              <motion.div
                className="w-full mb-6 text-left"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {feature.benefits.map((benefit: any, i: any) => (
                  <motion.div
                    key={i}
                    className="flex items-center mb-3 text-sm text-slate-300"
                    initial={{ x: -10, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-teal-500" />
                    {benefit}
                  </motion.div>
                ))}
              </motion.div>

              {feature.link !== "/" && (
                <Link href={feature.link} className="mt-auto w-full">
                  <Button
                    variant="outline"
                    className="w-full border-teal-600 text-teal-500 hover:text-white hover:bg-teal-600 transition-colors"
                  >
                    {feature.link === "/calculator"
                      ? "Go to Calculator"
                      : "Go to Converter"}
                  </Button>
                </Link>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Land Measurement Units Section */}
        <motion.div
          className="mt-24 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-teal-400 mb-4">
              Nepali Land Measurement Units
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Understanding traditional Nepali land measurement systems used in
              different regions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landUnits.map((unit, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/40 dark:bg-slate-800/40 border border-slate-700 rounded-lg p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5, borderColor: "rgb(20, 184, 166)" }}
              >
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-slate-700/50 rounded-full mr-3">
                    {unit.icon}
                  </div>
                  <h4 className="text-lg font-medium text-white">
                    {unit.name}
                  </h4>
                </div>
                <p className="text-sm text-slate-300 mb-2">
                  {unit.description}
                </p>
                <p className="text-xs text-teal-400">{unit.equivalent}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Use Cases Section */}
        <motion.div
          className="mt-24 mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-teal-400 mb-4">
              Who Can Benefit
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto">
              Our calculator serves various sectors across Nepal with specific
              land measurement needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                className="bg-slate-800/40 dark:bg-slate-800/40 border border-slate-700 rounded-lg p-6 flex"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
                whileHover={{ y: -5, borderColor: "rgb(20, 184, 166)" }}
              >
                <div className="p-3 bg-slate-700/50 rounded-lg mr-4 h-fit">
                  {useCase.icon}
                </div>
                <div>
                  <h4 className="text-xl font-medium text-white mb-2">
                    {useCase.title}
                  </h4>
                  <p className="text-slate-300">{useCase.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Features Bar */}
        <motion.div
          className="mt-20 bg-slate-800/50 dark:bg-slate-800/50 border border-slate-700 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {additionalFeatures.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center p-3"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <div className="mr-3 p-2 bg-slate-700/50 rounded-full">
                  {item.icon}
                </div>
                <div className="text-sm text-slate-300">{item.title}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Ready to simplify your land measurements?
          </h3>
          <Link href="/calculator">
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8"
            >
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
