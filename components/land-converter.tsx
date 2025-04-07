"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "./language-provider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  AlertCircle,
  ArrowRight,
  ArrowRightLeft,
  RotateCcw,
  History,
  Info,
  Trash2,
  ChevronRight,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type LandUnit =
  | "squareFeet"
  | "squareMeter"
  | "ropani"
  | "aana"
  | "paisa"
  | "daam"
  | "bigha"
  | "katha"
  | "dhur";

interface ConversionHistoryItem {
  id: number;
  value: string;
  fromUnit: LandUnit;
  toUnit: LandUnit;
  result: string;
  timestamp: number;
}

// Conversion rates to square feet
const conversionRates: Record<LandUnit, number> = {
  squareFeet: 1,
  squareMeter: 10.764,
  ropani: 5476,
  aana: 342.25,
  paisa: 85.56,
  daam: 21.39,
  bigha: 72900,
  katha: 3645,
  dhur: 182.25,
};

export default function LandConverter() {
  const { t } = useLanguage();
  const [value, setValue] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<LandUnit>("squareFeet");
  const [toUnit, setToUnit] = useState<LandUnit>("squareMeter");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [conversionHistory, setConversionHistory] = useState<
    ConversionHistoryItem[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>("converter");
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("landConverterHistory");
    if (savedHistory) {
      try {
        setConversionHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse saved history:", e);
        // If parsing fails, initialize with empty array
        setConversionHistory([]);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "landConverterHistory",
      JSON.stringify(conversionHistory)
    );
  }, [conversionHistory]);

  // Clear error when inputs change
  useEffect(() => {
    if (error) setError("");
  }, [value, fromUnit, toUnit]);

  const validateInput = (): boolean => {
    if (!value) {
      setError(t("errorRequired"));
      return false;
    }

    const valueNum = Number.parseFloat(value);

    if (isNaN(valueNum) || valueNum <= 0) {
      setError(t("errorInvalidInput"));
      return false;
    }

    setError("");
    return true;
  };

  const convert = () => {
    if (!validateInput()) return;

    const valueNum = Number.parseFloat(value);

    // Convert from source unit to square feet
    const squareFeet = valueNum * conversionRates[fromUnit];

    // Convert from square feet to target unit
    const resultValue = squareFeet / conversionRates[toUnit];
    const resultText = `${resultValue.toFixed(4)} ${t(toUnit)}`;

    setResult(resultText);

    // Add to history
    const newHistoryItem: ConversionHistoryItem = {
      id: Date.now(),
      value,
      fromUnit,
      toUnit,
      result: resultText,
      timestamp: Date.now(),
    };

    setConversionHistory((prev) => [
      newHistoryItem,
      ...prev.slice(0, 9), // Keep only the last 10 conversions
    ]);

    // Trigger animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  };

  const reset = () => {
    setValue("");
    setResult("");
    setError("");
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  const loadFromHistory = (item: ConversionHistoryItem) => {
    setValue(item.value);
    setFromUnit(item.fromUnit);
    setToUnit(item.toUnit);
    setResult(item.result);
    setActiveTab("converter");
  };

  const clearHistory = () => {
    setConversionHistory([]);
  };

  const deleteHistoryItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setConversionHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const resultAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  return (
    <div className="py-8">
      <Card className="max-w-2xl mx-auto bg-gradient-to-b from-slate-800 to-slate-900 dark:from-slate-800 dark:to-slate-900 border-slate-700 shadow-xl overflow-hidden">
        <CardHeader className="pb-4 border-b border-slate-700/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <ArrowRightLeft className="h-5 w-5 text-teal-400" />
            </div>
            <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-500">
              {t("converterTitle")}
            </CardTitle>
          </div>
          <CardDescription className="text-slate-300 dark:text-slate-300">
            {t("converterDescription")}
          </CardDescription>
        </CardHeader>

        <Tabs
          defaultValue="converter"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="px-6 pt-2 bg-slate-900/50 dark:bg-slate-900/50 border-b border-slate-700/50">
            <TabsList className="bg-slate-800 dark:bg-slate-800">
              <TabsTrigger
                value="converter"
                className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400"
              >
                <ArrowRightLeft className="h-4 w-4 mr-2" />
                {t("converter")}
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400"
              >
                <History className="h-4 w-4 mr-2" />
                {t("history")}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="converter" className="mt-0 block">
            <CardContent className="pt-6">
              <motion.div
                className="space-y-6"
                initial="visible"
                animate="visible"
                variants={containerVariants}
              >
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <Alert
                        variant="destructive"
                        className="bg-red-900/20 border-red-800 text-red-200"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label
                    htmlFor="value"
                    className="text-slate-300 dark:text-slate-300 flex items-center"
                  >
                    {t("value")}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="h-3.5 w-3.5 ml-1.5 text-slate-400" />
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-800 border-slate-700 text-slate-200">
                          {t("valueTooltip") || "Enter the value to convert"}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Input
                    id="value"
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={t("enterValue")}
                    className="bg-slate-800 dark:bg-slate-800 border-slate-700 focus:border-teal-500 focus:ring-teal-500/20"
                  />
                </motion.div>

                <motion.div
                  className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end"
                  variants={itemVariants}
                >
                  <div className="space-y-2">
                    <Label
                      htmlFor="fromUnit"
                      className="text-slate-300 dark:text-slate-300"
                    >
                      {t("from")}
                    </Label>
                    <Select
                      value={fromUnit}
                      onValueChange={(value) => setFromUnit(value as LandUnit)}
                    >
                      <SelectTrigger
                        id="fromUnit"
                        className="bg-slate-800 dark:bg-slate-800 border-slate-700"
                      >
                        <SelectValue placeholder={t("from")} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 dark:bg-slate-800 border-slate-700">
                        <SelectItem value="squareFeet">
                          {t("squareFeet")}
                        </SelectItem>
                        <SelectItem value="squareMeter">
                          {t("squareMeter")}
                        </SelectItem>
                        <SelectItem value="ropani">{t("ropani")}</SelectItem>
                        <SelectItem value="aana">{t("aana")}</SelectItem>
                        <SelectItem value="paisa">{t("paisa")}</SelectItem>
                        <SelectItem value="daam">{t("daam")}</SelectItem>
                        <SelectItem value="bigha">{t("bigha")}</SelectItem>
                        <SelectItem value="katha">{t("katha")}</SelectItem>
                        <SelectItem value="dhur">{t("dhur")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={swapUnits}
                    className="mb-0.5 text-teal-500 hover:text-teal-400 hover:bg-slate-700"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                  </Button>

                  <div className="space-y-2">
                    <Label
                      htmlFor="toUnit"
                      className="text-slate-300 dark:text-slate-300"
                    >
                      {t("to")}
                    </Label>
                    <Select
                      value={toUnit}
                      onValueChange={(value) => setToUnit(value as LandUnit)}
                    >
                      <SelectTrigger
                        id="toUnit"
                        className="bg-slate-800 dark:bg-slate-800 border-slate-700"
                      >
                        <SelectValue placeholder={t("to")} />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 dark:bg-slate-800 border-slate-700">
                        <SelectItem value="squareFeet">
                          {t("squareFeet")}
                        </SelectItem>
                        <SelectItem value="squareMeter">
                          {t("squareMeter")}
                        </SelectItem>
                        <SelectItem value="ropani">{t("ropani")}</SelectItem>
                        <SelectItem value="aana">{t("aana")}</SelectItem>
                        <SelectItem value="paisa">{t("paisa")}</SelectItem>
                        <SelectItem value="daam">{t("daam")}</SelectItem>
                        <SelectItem value="bigha">{t("bigha")}</SelectItem>
                        <SelectItem value="katha">{t("katha")}</SelectItem>
                        <SelectItem value="dhur">{t("dhur")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </motion.div>

                {result && (
                  <motion.div
                    className="p-5 bg-gradient-to-r from-teal-900/30 to-slate-800/50 rounded-md border border-teal-800 relative overflow-hidden"
                    variants={resultAnimation}
                    initial="visible"
                    animate="visible"
                  >
                    {showAnimation && (
                      <motion.div
                        className="absolute inset-0 bg-teal-500/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                    <p className="font-medium text-xl text-teal-300 flex items-center">
                      <span className="mr-2">{t("result")}:</span>
                      <span className="font-bold">{result}</span>
                    </p>

                    <div className="mt-3 pt-3 border-t border-teal-800/50">
                      <p className="text-sm text-teal-300/70">
                        {t("conversionDetails") || "Conversion Details"}:
                      </p>
                      <div className="text-sm text-slate-300 flex items-center mt-1">
                        <ChevronRight className="h-3 w-3 mr-1 text-teal-500 flex-shrink-0" />
                        <span>
                          {value} {t(fromUnit)} = {result}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <motion.div className="flex gap-4" variants={itemVariants}>
                  <Button
                    onClick={convert}
                    className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium"
                  >
                    <ArrowRightLeft className="h-4 w-4 mr-2" />
                    {t("convert")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="flex-1 border-teal-700 text-teal-400 hover:text-teal-300 hover:bg-teal-900/20"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t("reset")}
                  </Button>
                </motion.div>
              </motion.div>
            </CardContent>
          </TabsContent>

          <TabsContent value="history" className="mt-0 block">
            <CardContent className="pt-6">
              {conversionHistory.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-slate-400">
                      {t("savedConversions") || "Saved Conversions"}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearHistory}
                      className="h-8 px-3 text-red-400 border-red-800/50 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                      {t("clearHistory") || "Clear History"}
                    </Button>
                  </div>

                  {conversionHistory.map((item) => (
                    <motion.div
                      key={item.id}
                      className="p-4 bg-slate-800 dark:bg-slate-800 rounded-lg border border-slate-700 hover:border-teal-700 transition-colors cursor-pointer"
                      onClick={() => loadFromHistory(item)}
                      whileHover={{
                        scale: 1.01,
                        backgroundColor: "rgba(20, 184, 166, 0.1)",
                      }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-slate-400">
                          {formatDate(item.timestamp)}
                        </p>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-teal-400 hover:text-teal-300 hover:bg-teal-900/20"
                            onClick={(e) => {
                              e.stopPropagation();
                              loadFromHistory(item);
                            }}
                          >
                            <ArrowRight className="h-3.5 w-3.5 mr-1" />
                            {t("load") || "Load"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                            onClick={(e) => deleteHistoryItem(item.id, e)}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm mb-2">
                        <span className="text-slate-300">
                          <span className="text-slate-400">
                            {t("value") || "Value"}:
                          </span>{" "}
                          {item.value} {t(item.fromUnit)}
                        </span>
                        <span className="text-slate-300">
                          <span className="text-slate-400">
                            {t("convertedTo") || "Converted to"}:
                          </span>{" "}
                          {t(item.toUnit)}
                        </span>
                      </div>
                      <p className="font-medium text-teal-300">{item.result}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="p-3 bg-slate-800/60 rounded-full mb-4">
                    <History className="h-6 w-6 text-slate-400" />
                  </div>
                  <p className="text-slate-400">
                    {t("noConversions") || "No conversions yet"}
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setActiveTab("converter")}
                    className="mt-2 text-teal-400 hover:text-teal-300"
                  >
                    {t("startConverting") || "Start converting"}
                  </Button>
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="px-6 py-4 border-t border-slate-700/50 bg-slate-900/50 dark:bg-slate-900/50 flex justify-between items-center text-xs text-slate-400">
          <div>{t("developedBy") || "Developed for Nepal"}</div>
          <div className="flex items-center">
            <Info className="h-3 w-3 mr-1" />
            {t("accuracyNote") || "Results are approximate"}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
