"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

type Language = "en" | "np";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    appName: "Nepali Land Calculator",
    home: "Home",
    calculator: "Calculator",
    converter: "Converter",
    heroTitle: "Nepali Land Measurement Calculator",
    heroSubtitle:
      "Calculate and convert between different Nepali land measurement units",
    heroTagline: "Simplify Land Measurements",
    getStarted: "Get Started",
    learnMore: "Learn More",
    calculatorTitle: "Land Calculator",
    calculatorDescription:
      "Calculate land area from length and breadth measurements",
    converterTitle: "Land Converter",
    converterDescription:
      "Convert between different Nepali land measurement units",
    featureTitle: "Features",
    featureTagline: "Powerful Tools",
    featureSubtitle: "Powerful tools for Nepali land measurements",
    featureCalculatorTitle: "Land Calculator",
    featureCalculatorDesc:
      "Calculate land area from length and breadth in various units",
    featureConverterTitle: "Land Converter",
    featureConverterDesc:
      "Convert between traditional Nepali and modern measurement units",
    featureBilingualTitle: "Bilingual Support",
    featureBilingualDesc: "Use the app in both English and Nepali languages",
    length: "Length",
    breadth: "Breadth",
    area: "Area",
    calculate: "Calculate",
    reset: "Reset",
    convert: "Convert",
    from: "From",
    to: "To",
    value: "Value",
    result: "Result",
    ropani: "Ropani",
    aana: "Aana",
    paisa: "Paisa",
    daam: "Daam",
    bigha: "Bigha",
    katha: "Katha",
    dhur: "Dhur",
    squareMeter: "Square Meter",
    squareFeet: "Square Feet",
    feet: "Feet",
    meter: "Meter",
    enterValue: "Enter value",
    footerText: "Designed and developed with ❤️ for Nepal",
    errorInvalidInput: "Please enter valid numbers",
    errorRequired: "This field is required",
    goToCalculator: "Go to Calculator",
    goToConverter: "Go to Converter",
    cta: "Ready to simplify your land measurements?",
    tabAll: "All Features",
    tabCalculator: "Calculator",
    tabConverter: "Converter",
    tabOther: "Other Features",
    landUnitsTitle: "Nepali Land Measurement Units",
    landUnitsSubtitle:
      "Understanding traditional Nepali land measurement systems",
    useCasesTitle: "Who Can Benefit",
    useCasesSubtitle: "Our calculator serves various sectors across Nepal",
    history: "History",
    load: "Load",
    dimensions: "Dimensions",
    outputUnit: "Output Unit",
    areaUnit: "Output Unit",
    savedCalculations: "Saved Calculations",
    savedConversions: "Saved Conversions",
    clearHistory: "Clear History",
    noCalculations: "No calculations yet",
    noConversions: "No conversions yet",
    startCalculating: "Start calculating",
    startConverting: "Start converting",
    developedBy: "Developed for Nepal",
    accuracyNote: "Results are approximate",
    lengthTooltip: "Enter the length measurement",
    breadthTooltip: "Enter the breadth measurement",
    valueTooltip: "Enter the value to convert",
    equivalentTo: "Equivalent to",
    ropaniSystem: "Ropani System",
    bighaSystem: "Bigha System",
    conversionDetails: "Conversion Details",
    convertedTo: "Converted to",
    calculation: "Calculation",
  },
  np: {
    appName: "नेपाली जग्गा क्याल्कुलेटर",
    home: "गृहपृष्ठ",
    calculator: "क्याल्कुलेटर",
    converter: "कन्भर्टर",
    heroTitle: "नेपाली जग्गा नाप क्याल्कुलेटर",
    heroSubtitle:
      "विभिन्न नेपाली जग्गा नाप एकाइहरू बीच गणना र रूपान्तरण गर्नुहोस्",
    heroTagline: "जग्गा नापलाई सरल बनाउनुहोस्",
    getStarted: "सुरु गर्नुहोस्",
    learnMore: "थप जान्नुहोस्",
    calculatorTitle: "जग्गा क्याल्कुलेटर",
    calculatorDescription:
      "लम्बाई र चौडाई नापबाट जग्गाको क्षेत्रफल गणना गर्नुहोस्",
    converterTitle: "जग्गा कन्भर्टर",
    converterDescription:
      "विभिन्न नेपाली जग्गा नाप एकाइहरू बीच रूपान्तरण गर्नुहोस्",
    featureTitle: "विशेषताहरू",
    featureTagline: "शक्तिशाली उपकरणहरू",
    featureSubtitle: "नेपाली जग्गा नापका लागि शक्तिशाली उपकरणहरू",
    featureCalculatorTitle: "जग्गा क्याल्कुलेटर",
    featureCalculatorDesc:
      "विभिन्न एकाइहरूमा लम्बाई र चौडाईबाट जग्गाको क्षेत्रफल गणना गर्नुहोस्",
    featureConverterTitle: "जग्गा कन्भर्टर",
    featureConverterDesc:
      "परम्परागत नेपाली र आधुनिक नाप एकाइहरू बीच रूपान्तरण गर्नुहोस्",
    featureBilingualTitle: "द्विभाषिक समर्थन",
    featureBilingualDesc:
      "अङ्ग्रेजी र नेपाली दुवै भाषाहरूमा एप प्रयोग गर्नुहोस्",
    length: "लम्बाई",
    breadth: "चौडाई",
    area: "क्षेत्रफल",
    calculate: "गणना गर्नुहोस्",
    reset: "रिसेट",
    convert: "रूपान्तरण",
    from: "बाट",
    to: "मा",
    value: "मान",
    result: "परिणाम",
    ropani: "रोपनी",
    aana: "आना",
    paisa: "पैसा",
    daam: "दाम",
    bigha: "बिघा",
    katha: "कट्ठा",
    dhur: "धुर",
    squareMeter: "वर्ग मिटर",
    squareFeet: "वर्ग फिट",
    feet: "फिट",
    meter: "मिटर",
    enterValue: "मान प्रविष्ट गर्नुहोस्",
    footerText: "नेपालको लागि ❤️ का साथ डिजाइन र विकसित",
    errorInvalidInput: "कृपया मान्य संख्याहरू प्रविष्ट गर्नुहोस्",
    errorRequired: "यो फिल्ड आवश्यक छ",
    goToCalculator: "क्याल्कुलेटरमा जानुहोस्",
    goToConverter: "कन्भर्टरमा जानुहोस्",
    cta: "तपाईंको जग्गा नापहरू सरल बनाउन तयार हुनुहुन्छ?",
    tabAll: "सबै विशेषताहरू",
    tabCalculator: "क्याल्कुलेटर",
    tabConverter: "कन्भर्टर",
    tabOther: "अन्य विशेषताहरू",
    landUnitsTitle: "नेपाली जग्गा नाप एकाइहरू",
    landUnitsSubtitle: "परम्परागत नेपाली जग्गा नाप प्रणालीहरू बुझ्दै",
    useCasesTitle: "कसले फाइदा लिन सक्छन्",
    useCasesSubtitle:
      "हाम्रो क्याल्कुलेटरले नेपालभरका विभिन्न क्षेत्रहरूलाई सेवा प्रदान गर्दछ",
    history: "इतिहास",
    load: "लोड गर्नुहोस्",
    dimensions: "आयामहरू",
    outputUnit: "आउटपुट एकाइ",
    areaUnit: "आउटपुट एकाइ",
    savedCalculations: "सुरक्षित गणनाहरू",
    savedConversions: "सुरक्षित रूपान्तरणहरू",
    clearHistory: "इतिहास खाली गर्नुहोस्",
    noCalculations: "अहिलेसम्म कुनै गणनाहरू छैनन्",
    noConversions: "अहिलेसम्म कुनै रूपान्तरणहरू छैनन्",
    startCalculating: "गणना सुरु गर्नुहोस्",
    startConverting: "रूपान्तरण सुरु गर्नुहोस्",
    developedBy: "नेपालको लागि विकसित",
    accuracyNote: "परिणामहरू अनुमानित छन्",
    lengthTooltip: "लम्बाई नाप प्रविष्ट गर्नुहोस्",
    breadthTooltip: "चौडाई नाप प्रविष्ट गर्नुहोस्",
    valueTooltip: "रूपान्तरण गर्न मान प्रविष्ट गर्नुहोस्",
    equivalentTo: "बराबर",
    ropaniSystem: "रोपनी प्रणाली",
    bighaSystem: "बिघा प्रणाली",
    conversionDetails: "रूपान्तरण विवरण",
    convertedTo: "मा रूपान्तरित",
    calculation: "गणना",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    // Try to get saved language preference from localStorage
    const savedLanguage = localStorage.getItem("preferredLanguage");
    if (savedLanguage === "np") {
      setLanguage("np");
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "np" : "en";
    setLanguage(newLanguage);
    // Save preference to localStorage
    if (mounted) {
      localStorage.setItem("preferredLanguage", newLanguage);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
