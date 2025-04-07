"use client"

import { useState } from "react"
import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

type Unit = "feet" | "meter"
type AreaUnit = "squareFeet" | "squareMeter" | "ropani" | "bigha"

export default function LandCalculator() {
  const { t, language } = useLanguage()
  const [length, setLength] = useState<string>("")
  const [breadth, setBreadth] = useState<string>("")
  const [unit, setUnit] = useState<Unit>("feet")
  const [areaUnit, setAreaUnit] = useState<AreaUnit>("squareFeet")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const validateInputs = (): boolean => {
    if (!length || !breadth) {
      setError(t("errorRequired"))
      return false
    }

    const lengthNum = Number.parseFloat(length)
    const breadthNum = Number.parseFloat(breadth)

    if (isNaN(lengthNum) || isNaN(breadthNum) || lengthNum <= 0 || breadthNum <= 0) {
      setError(t("errorInvalidInput"))
      return false
    }

    setError("")
    return true
  }

  const calculate = () => {
    if (!validateInputs()) return

    const lengthNum = Number.parseFloat(length)
    const breadthNum = Number.parseFloat(breadth)

    // Calculate area in square feet or square meters
    let area = lengthNum * breadthNum

    // Convert to selected area unit
    if (unit === "meter" && areaUnit === "squareFeet") {
      // Convert from square meters to square feet
      area = area * 10.764
    } else if (unit === "feet" && areaUnit === "squareMeter") {
      // Convert from square feet to square meters
      area = area * 0.0929
    }

    // Convert to Nepali units if needed
    if (areaUnit === "ropani") {
      // Convert to Ropani system (1 Ropani = 5476 sq ft)
      const areaInSqFt = unit === "meter" ? area * 10.764 : area
      const ropani = Math.floor(areaInSqFt / 5476)
      const remainingSqFt = areaInSqFt % 5476
      const aana = Math.floor(remainingSqFt / 342.25)
      const remainingAana = remainingSqFt % 342.25
      const paisa = Math.floor(remainingAana / 85.56)
      const daam = Math.round((remainingAana % 85.56) / 21.39)

      setResult(`${ropani} ${t("ropani")}, ${aana} ${t("aana")}, ${paisa} ${t("paisa")}, ${daam} ${t("daam")}`)
    } else if (areaUnit === "bigha") {
      // Convert to Bigha system (1 Bigha = 72900 sq ft)
      const areaInSqFt = unit === "meter" ? area * 10.764 : area
      const bigha = Math.floor(areaInSqFt / 72900)
      const remainingSqFt = areaInSqFt % 72900
      const katha = Math.floor(remainingSqFt / 3645)
      const dhur = Math.round((remainingSqFt % 3645) / 182.25)

      setResult(`${bigha} ${t("bigha")}, ${katha} ${t("katha")}, ${dhur} ${t("dhur")}`)
    } else {
      // Just show the area in square feet or square meters
      setResult(`${area.toFixed(2)} ${t(areaUnit)}`)
    }
  }

  const reset = () => {
    setLength("")
    setBreadth("")
    setResult("")
    setError("")
  }

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
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Card className="max-w-2xl mx-auto bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-teal-400">{t("calculatorTitle")}</CardTitle>
          <CardDescription className="text-slate-300">{t("calculatorDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div className="space-y-6" variants={containerVariants}>
            {error && (
              <motion.div variants={itemVariants}>
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
              <div className="space-y-2">
                <Label htmlFor="unit">{t("length")}</Label>
                <Input
                  id="length"
                  type="number"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder={t("enterValue")}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="breadth">{t("breadth")}</Label>
                <Input
                  id="breadth"
                  type="number"
                  value={breadth}
                  onChange={(e) => setBreadth(e.target.value)}
                  placeholder={t("enterValue")}
                  className="bg-slate-900 border-slate-700"
                />
              </div>
            </motion.div>

            <motion.div className="grid grid-cols-2 gap-4" variants={itemVariants}>
              <div className="space-y-2">
                <Label htmlFor="unit">{t("unit")}</Label>
                <Select value={unit} onValueChange={(value) => setUnit(value as Unit)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700">
                    <SelectValue placeholder={t("unit")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="feet">{t("squareFeet")}</SelectItem>
                    <SelectItem value="meter">{t("squareMeter")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="areaUnit">{t("area")}</Label>
                <Select value={areaUnit} onValueChange={(value) => setAreaUnit(value as AreaUnit)}>
                  <SelectTrigger className="bg-slate-900 border-slate-700">
                    <SelectValue placeholder={t("area")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="squareFeet">{t("squareFeet")}</SelectItem>
                    <SelectItem value="squareMeter">{t("squareMeter")}</SelectItem>
                    <SelectItem value="ropani">{t("ropani")}</SelectItem>
                    <SelectItem value="bigha">{t("bigha")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </motion.div>

            {result && (
              <motion.div
                className="p-4 bg-teal-900/30 rounded-md border border-teal-800"
                variants={itemVariants}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <p className="font-medium text-teal-300">
                  {t("result")}: {result}
                </p>
              </motion.div>
            )}

            <motion.div className="flex gap-4" variants={itemVariants}>
              <Button onClick={calculate} className="flex-1 bg-teal-600 hover:bg-teal-700">
                {t("calculate")}
              </Button>
              <Button
                variant="outline"
                onClick={reset}
                className="flex-1 border-teal-700 text-teal-400 hover:text-teal-300"
              >
                {t("reset")}
              </Button>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

