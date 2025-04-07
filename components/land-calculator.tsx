"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
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
  RotateCcw,
  Calculator,
  Ruler,
  SquareEqual,
  ChevronRight,
  Info,
  Trash2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Unit = "feet" | "meter";
type AreaUnit = "squareFeet" | "squareMeter" | "ropani" | "bigha";

interface CalculationHistoryItem {
  id: number;
  length: string;
  breadth: string;
  unit: Unit;
  areaUnit: AreaUnit;
  result: string;
  timestamp: number;
}

export default function LandCalculator() {
  const { t } = useLanguage();
  const [length, setLength] = useState<string>("");
  const [breadth, setBreadth] = useState<string>("");
  const [unit, setUnit] = useState<Unit>("feet");
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("squareFeet");
  const [result, setResult] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [calculationHistory, setCalculationHistory] = useState<
    CalculationHistoryItem[]
  >([]);
  const [activeTab, setActiveTab] = useState<string>("calculator");
  const [showAnimation, setShowAnimation] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const initialLoadComplete = useRef(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load history from localStorage on component mount
  useEffect(() => {
    if (mounted) {
      try {
        const savedHistory = localStorage.getItem("landCalculatorHistory");
        if (savedHistory) {
          const parsedHistory = JSON.parse(savedHistory);
          if (Array.isArray(parsedHistory)) {
            console.log("Loaded history from localStorage:", parsedHistory);
            setCalculationHistory(parsedHistory);
          } else {
            console.error("Saved history is not an array:", parsedHistory);
            setCalculationHistory([]);
          }
        }
      } catch (e) {
        console.error("Failed to parse saved history:", e);
        setCalculationHistory([]);
      }
      initialLoadComplete.current = true;
    }
  }, [mounted]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    if (mounted && initialLoadComplete.current) {
      localStorage.setItem(
        "landCalculatorHistory",
        JSON.stringify(calculationHistory)
      );
      console.log("Saved history to localStorage:", calculationHistory);
    }
  }, [calculationHistory, mounted]);

  // Clear error when inputs change
  useEffect(() => {
    if (error) setError("");
  }, [length, breadth, unit, areaUnit, error]);

  // Debug: Log calculation history changes
  useEffect(() => {
    if (mounted) {
      console.log("Calculation history updated:", calculationHistory);
    }
  }, [calculationHistory, mounted]);

  // Force re-render when tab changes to history
  useEffect(() => {
    if (activeTab === "history") {
      console.log("History tab active, current history:", calculationHistory);
    }
  }, [activeTab, calculationHistory]);

  const validateInputs = (): boolean => {
    if (!length || !breadth) {
      setError(t("errorRequired"));
      return false;
    }

    const lengthNum = Number.parseFloat(length);
    const breadthNum = Number.parseFloat(breadth);

    if (
      isNaN(lengthNum) ||
      isNaN(breadthNum) ||
      lengthNum <= 0 ||
      breadthNum <= 0
    ) {
      setError(t("errorInvalidInput"));
      return false;
    }

    setError("");
    return true;
  };

  const calculate = () => {
    if (!validateInputs()) return;

    const lengthNum = Number.parseFloat(length);
    const breadthNum = Number.parseFloat(breadth);

    // Calculate area in square feet or square meters
    let area = lengthNum * breadthNum;

    // Convert to selected area unit
    if (unit === "meter" && areaUnit === "squareFeet") {
      // Convert from square meters to square feet
      area = area * 10.764;
    } else if (unit === "feet" && areaUnit === "squareMeter") {
      // Convert from square feet to square meters
      area = area * 0.0929;
    }

    let resultText = "";
    let equivalentRopani = "";
    let equivalentBigha = "";

    // Convert to Nepali units if needed
    if (areaUnit === "ropani") {
      // Convert to Ropani system (1 Ropani = 5476 sq ft)
      const areaInSqFt = unit === "meter" ? area * 10.764 : area;
      const ropani = Math.floor(areaInSqFt / 5476);
      const remainingSqFt = areaInSqFt % 5476;
      const aana = Math.floor(remainingSqFt / 342.25);
      const remainingAana = remainingSqFt % 342.25;
      const paisa = Math.floor(remainingAana / 85.56);
      const daam = Math.round((remainingAana % 85.56) / 21.39);

      resultText = `${ropani} ${t("ropani")}, ${aana} ${t(
        "aana"
      )}, ${paisa} ${t("paisa")}, ${daam} ${t("daam")}`;

      // Calculate equivalent in Bigha system
      const bigha = Math.floor(areaInSqFt / 72900);
      const remainingForBigha = areaInSqFt % 72900;
      const katha = Math.floor(remainingForBigha / 3645);
      const dhur = Math.round((remainingForBigha % 3645) / 182.25);

      equivalentBigha = `${bigha} ${t("bigha")}, ${katha} ${t(
        "katha"
      )}, ${dhur} ${t("dhur")}`;
    } else if (areaUnit === "bigha") {
      // Convert to Bigha system (1 Bigha = 72900 sq ft)
      const areaInSqFt = unit === "meter" ? area * 10.764 : area;
      const bigha = Math.floor(areaInSqFt / 72900);
      const remainingSqFt = areaInSqFt % 72900;
      const katha = Math.floor(remainingSqFt / 3645);
      const dhur = Math.round((remainingSqFt % 3645) / 182.25);

      resultText = `${bigha} ${t("bigha")}, ${katha} ${t("katha")}, ${dhur} ${t(
        "dhur"
      )}`;

      // Calculate equivalent in Ropani system
      const ropani = Math.floor(areaInSqFt / 5476);
      const remainingForRopani = areaInSqFt % 5476;
      const aana = Math.floor(remainingForRopani / 342.25);
      const remainingAana = remainingForRopani % 342.25;
      const paisa = Math.floor(remainingAana / 85.56);
      const daam = Math.round((remainingAana % 85.56) / 21.39);

      equivalentRopani = `${ropani} ${t("ropani")}, ${aana} ${t(
        "aana"
      )}, ${paisa} ${t("paisa")}, ${daam} ${t("daam")}`;
    } else {
      // Just show the area in square feet or square meters
      resultText = `${area.toFixed(2)} ${t(areaUnit)}`;

      // Calculate equivalents for both systems
      const areaInSqFt = areaUnit === "squareMeter" ? area * 10.764 : area;

      // Ropani system
      const ropani = Math.floor(areaInSqFt / 5476);
      const remainingForRopani = areaInSqFt % 5476;
      const aana = Math.floor(remainingForRopani / 342.25);
      const remainingAana = remainingForRopani % 342.25;
      const paisa = Math.floor(remainingAana / 85.56);
      const daam = Math.round((remainingAana % 85.56) / 21.39);

      equivalentRopani = `${ropani} ${t("ropani")}, ${aana} ${t(
        "aana"
      )}, ${paisa} ${t("paisa")}, ${daam} ${t("daam")}`;

      // Bigha system
      const bigha = Math.floor(areaInSqFt / 72900);
      const remainingForBigha = areaInSqFt % 72900;
      const katha = Math.floor(remainingForBigha / 3645);
      const dhur = Math.round((remainingForBigha % 3645) / 182.25);

      equivalentBigha = `${bigha} ${t("bigha")}, ${katha} ${t(
        "katha"
      )}, ${dhur} ${t("dhur")}`;
    }

    setResult(resultText);

    // Add to history
    const newHistoryItem: CalculationHistoryItem = {
      id: Date.now(),
      length,
      breadth,
      unit,
      areaUnit,
      result: resultText,
      timestamp: Date.now(),
    };

    console.log("Adding new history item:", newHistoryItem);

    // Update history state
    const newHistory = [newHistoryItem, ...calculationHistory.slice(0, 9)]; // Keep only the last 10 calculations
    setCalculationHistory(newHistory);

    // Save to localStorage immediately
    if (mounted) {
      localStorage.setItem("landCalculatorHistory", JSON.stringify(newHistory));
      console.log("New history saved:", newHistory);
    }

    // Trigger animation
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 2000);
  };

  const reset = () => {
    setLength("");
    setBreadth("");
    setResult("");
    setError("");
  };

  const loadFromHistory = (item: CalculationHistoryItem) => {
    console.log("Loading from history:", item);
    // First change the tab
    setActiveTab("calculator");

    // Set the values after a slight delay to ensure tab switching is complete
    setTimeout(() => {
      setLength(item.length);
      setBreadth(item.breadth);
      setUnit(item.unit);
      setAreaUnit(item.areaUnit);
      setResult(item.result);
    }, 50);
  };

  const clearHistory = () => {
    console.log("Clearing history");
    setCalculationHistory([]);
    localStorage.removeItem("landCalculatorHistory");
  };

  const deleteHistoryItem = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Deleting history item:", id);
    const newHistory = calculationHistory.filter((item) => item.id !== id);
    setCalculationHistory(newHistory);

    // Save to localStorage immediately
    if (mounted) {
      localStorage.setItem("landCalculatorHistory", JSON.stringify(newHistory));
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const resultAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 15 },
    },
  };

  // Calculate equivalent values for display
  const calculateEquivalents = () => {
    if (!result) return { ropani: "", bigha: "" };

    const lengthNum = Number.parseFloat(length);
    const breadthNum = Number.parseFloat(breadth);
    const area = lengthNum * breadthNum;

    // Convert to square feet for calculations
    const areaInSqFt =
      unit === "meter"
        ? area * 10.764
        : areaUnit === "squareMeter"
        ? area * 10.764
        : area;

    // Ropani system
    const ropani = Math.floor(areaInSqFt / 5476);
    const remainingForRopani = areaInSqFt % 5476;
    const aana = Math.floor(remainingForRopani / 342.25);
    const remainingAana = remainingForRopani % 342.25;
    const paisa = Math.floor(remainingAana / 85.56);
    const daam = Math.round((remainingAana % 85.56) / 21.39);

    const ropaniResult = `${ropani} ${t("ropani")}, ${aana} ${t(
      "aana"
    )}, ${paisa} ${t("paisa")}, ${daam} ${t("daam")}`;

    // Bigha system
    const bigha = Math.floor(areaInSqFt / 72900);
    const remainingForBigha = areaInSqFt % 72900;
    const katha = Math.floor(remainingForBigha / 3645);
    const dhur = Math.round((remainingForBigha % 3645) / 182.25);

    const bighaResult = `${bigha} ${t("bigha")}, ${katha} ${t(
      "katha"
    )}, ${dhur} ${t("dhur")}`;

    return {
      ropani: areaUnit !== "ropani" ? ropaniResult : "",
      bigha: areaUnit !== "bigha" ? bighaResult : "",
    };
  };

  const equivalents = calculateEquivalents();

  if (!mounted) {
    return null; // Avoid rendering until client-side
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="py-8"
    >
      <Card className="max-w-2xl mx-auto border-border shadow-xl overflow-hidden">
        <CardHeader className="pb-4 border-b">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <Calculator className="h-5 w-5 text-teal-400" />
            </div>
            <CardTitle className="text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-teal-500">
              {t("calculatorTitle")}
            </CardTitle>
          </div>
          <CardDescription>{t("calculatorDescription")}</CardDescription>
        </CardHeader>

        <Tabs
          defaultValue={activeTab}
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="px-6 pt-2 border-b">
            <TabsList>
              <TabsTrigger
                value="calculator"
                className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400"
              >
                <Ruler className="h-4 w-4 mr-2" />
                {t("calculator")}
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-teal-500/20 data-[state=active]:text-teal-400"
              >
                <SquareEqual className="h-4 w-4 mr-2" />
                {t("history")}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="calculator" className="mt-0 block">
            <CardContent className="pt-6">
              <div className="space-y-6">
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="length" className="flex items-center">
                      {t("length")}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("lengthTooltip") ||
                              "Enter the length measurement"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="length"
                      type="number"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder={t("enterValue")}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="breadth" className="flex items-center">
                      {t("breadth")}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="h-3.5 w-3.5 ml-1.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            {t("breadthTooltip") ||
                              "Enter the breadth measurement"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      id="breadth"
                      type="number"
                      value={breadth}
                      onChange={(e) => setBreadth(e.target.value)}
                      placeholder={t("enterValue")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unit">{t("unit")}</Label>
                    <Select
                      value={unit}
                      onValueChange={(value) => setUnit(value as Unit)}
                    >
                      <SelectTrigger id="unit">
                        <SelectValue placeholder={t("unit")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feet">
                          {t("feet") || "Feet"}
                        </SelectItem>
                        <SelectItem value="meter">
                          {t("meter") || "Meter"}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="areaUnit">
                      {t("areaUnit") || "Output Unit"}
                    </Label>
                    <Select
                      value={areaUnit}
                      onValueChange={(value) => setAreaUnit(value as AreaUnit)}
                    >
                      <SelectTrigger id="areaUnit">
                        <SelectValue
                          placeholder={t("areaUnit") || "Output Unit"}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="squareFeet">
                          {t("squareFeet")}
                        </SelectItem>
                        <SelectItem value="squareMeter">
                          {t("squareMeter")}
                        </SelectItem>
                        <SelectItem value="ropani">{t("ropani")}</SelectItem>
                        <SelectItem value="bigha">{t("bigha")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <AnimatePresence>
                  {result && (
                    <motion.div
                      className="p-5 bg-gradient-to-r from-teal-900/30 to-slate-800/50 rounded-md border border-teal-800 relative overflow-hidden dark:from-teal-900/30 dark:to-slate-800/50"
                      initial="hidden"
                      animate="visible"
                      variants={resultAnimation}
                      layout
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

                      {/* Equivalent in other units if relevant */}
                      {(equivalents.ropani || equivalents.bigha) && (
                        <div className="mt-3 pt-3 border-t border-teal-800/50">
                          <p className="text-sm text-teal-300/70">
                            {t("equivalentTo") || "Equivalent to"}:
                          </p>
                          <div className="grid grid-cols-1 gap-2 mt-1">
                            {equivalents.ropani && (
                              <div className="text-sm text-slate-300 flex items-center">
                                <ChevronRight className="h-3 w-3 mr-1 text-teal-500 flex-shrink-0" />
                                <span>
                                  {t("ropaniSystem") || "Ropani System"}:{" "}
                                  {equivalents.ropani}
                                </span>
                              </div>
                            )}
                            {equivalents.bigha && (
                              <div className="text-sm text-slate-300 flex items-center">
                                <ChevronRight className="h-3 w-3 mr-1 text-teal-500 flex-shrink-0" />
                                <span>
                                  {t("bighaSystem") || "Bigha System"}:{" "}
                                  {equivalents.bigha}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex gap-4">
                  <Button
                    onClick={calculate}
                    className="flex-1 bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white font-medium"
                  >
                    <Calculator className="h-4 w-4 mr-2" />
                    {t("calculate")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={reset}
                    className="flex-1 border-teal-700 text-teal-400 hover:text-teal-300 hover:bg-teal-900/20"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    {t("reset")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <CardContent className="pt-6">
              {calculationHistory && calculationHistory.length > 0 ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">
                      {t("savedCalculations") || "Saved Calculations"}
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

                  <div className="space-y-4">
                    {calculationHistory.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 bg-card rounded-lg border border-border hover:border-teal-700 transition-colors cursor-pointer"
                        onClick={() => loadFromHistory(item)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <p className="text-sm text-muted-foreground">
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
                          <span className="text-foreground">
                            <span className="text-muted-foreground">
                              {t("dimensions") || "Dimensions"}:
                            </span>{" "}
                            {item.length} × {item.breadth} {t(item.unit)}
                          </span>
                          <span className="text-foreground">
                            <span className="text-muted-foreground">
                              {t("outputUnit") || "Output Unit"}:
                            </span>{" "}
                            {t(item.areaUnit)}
                          </span>
                        </div>
                        <p className="font-medium text-teal-300">
                          {item.result}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="p-3 bg-slate-800/60 rounded-full mb-4">
                    <Calculator className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-lg font-medium text-foreground mb-2">
                    {t("noCalculationsYet") || "No Calculations Yet"}
                  </p>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    {t("emptyHistoryMessage") ||
                      "Your calculation history will appear here after you make your first calculation."}
                  </p>
                  <Button
                    onClick={() => setActiveTab("calculator")}
                    className="bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white"
                  >
                    <Ruler className="h-4 w-4 mr-2" />
                    {t("getStarted") || "Get Started"}
                  </Button>
                </div>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>

        <CardFooter className="px-6 py-4 border-t flex justify-between items-center text-xs text-muted-foreground">
          <div>{t("developedBy") || "Developed for Nepal"}</div>
          <div className="flex items-center">
            <Info className="h-3 w-3 mr-1" />
            {t("accuracyNote") || "Results are approximate"}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
