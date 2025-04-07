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
import { AlertCircle, ArrowRightLeft } from "lucide-react"

type LandUnit = "squareFeet" | "squareMeter" | "ropani" | "aana" | "paisa" | "daam" | "bigha" | "katha" | "dhur"

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
}

export default function LandConverter() {
  const { t } = useLanguage()
  const [value, setValue] = useState<string>("")
  const [fromUnit, setFromUnit] = useState<LandUnit>("squareFeet")
  const [toUnit, setToUnit] = useState<LandUnit>("squareMeter")
  const [result, setResult] = useState<string>("")
  const [error, setError] = useState<string>("")

  const validateInput = (): boolean => {
    if (!value) {
      setError(t("errorRequired"))
      return false
    }

    const valueNum = Number.parseFloat(value)

    if (isNaN(valueNum) || valueNum <= 0) {
      setError(t("errorInvalidInput"))
      return false
    }

    setError("")
    return true
  }

  const convert = () => {
    if (!validateInput()) return

    const valueNum = Number.parseFloat(value)

    // Convert from source unit to square feet
    const squareFeet = valueNum * conversionRates[fromUnit]

    // Convert from square feet to target unit
    const result = squareFeet / conversionRates[toUnit]

    setResult(`${result.toFixed(4)} ${t(toUnit)}`)
  }

  const reset = () => {
    setValue("")
    setResult("")
    setError("")
  }

  const swapUnits = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
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
          <CardTitle className="text-teal-400">{t("converterTitle")}</CardTitle>
          <CardDescription className="text-slate-300">{t("converterDescription")}</CardDescription>
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

            <motion.div className="space-y-2" variants={itemVariants}>
              <Label htmlFor="value">{t("value")}</Label>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={t("enterValue")}
                className="bg-slate-900 border-slate-700"
              />
            </motion.div>

            <motion.div className="grid grid-cols-[1fr,auto,1fr] gap-2 items-end" variants={itemVariants}>
              <div className="space-y-2">
                <Label htmlFor="fromUnit">{t("from")}</Label>
                <Select value={fromUnit} onValueChange={(value) => setFromUnit(value as LandUnit)}>
                  <SelectTrigger id="fromUnit" className="bg-slate-900 border-slate-700">
                    <SelectValue placeholder={t("from")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="squareFeet">{t("squareFeet")}</SelectItem>
                    <SelectItem value="squareMeter">{t("squareMeter")}</SelectItem>
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
                <Label htmlFor="toUnit">{t("to")}</Label>
                <Select value={toUnit} onValueChange={(value) => setToUnit(value as LandUnit)}>
                  <SelectTrigger id="toUnit" className="bg-slate-900 border-slate-700">
                    <SelectValue placeholder={t("to")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="squareFeet">{t("squareFeet")}</SelectItem>
                    <SelectItem value="squareMeter">{t("squareMeter")}</SelectItem>
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
              <Button onClick={convert} className="flex-1 bg-teal-600 hover:bg-teal-700">
                {t("convert")}
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

