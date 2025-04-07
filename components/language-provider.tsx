"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

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
    enterValue: "Enter value",
    footerText: "Designed and developed with ❤️ for Nepal",
    errorInvalidInput: "Please enter valid numbers",
    errorRequired: "This field is required",
    goToCalculator: "Go to Calculator",
    goToConverter: "Go to Converter",
    heroPoint1: "Accurate Conversions",
    heroPoint2: "Traditional & Modern Units",
    heroPoint3: "Bilingual Interface",
    calculatorBenefit1: "Calculate area from length and breadth",
    calculatorBenefit2: "Support for feet and meter measurements",
    calculatorBenefit3: "Convert to Ropani, Bigha, and other units",
    calculatorBenefit4: "Precise calculations with decimal support",
    converterBenefit1: "Convert between all Nepali land units",
    converterBenefit2: "Support for international units (sq. ft, sq. m)",
    converterBenefit3: "Instant conversion with accurate results",
    converterBenefit4: "Handles complex unit relationships",
    bilingualBenefit1: "Full support for English and Nepali",
    bilingualBenefit2: "Native language terminology for all units",
    bilingualBenefit3: "Easy language switching",
    bilingualBenefit4: "Culturally appropriate measurements",
    additionalFeature1: "Accurate Calculations",
    additionalFeature2: "Secure & Private",
    additionalFeature3: "Fast Performance",
    additionalFeature4: "Regular Updates",
    cta: "Ready to simplify your land measurements?",
    tabAll: "All Features",
    tabCalculator: "Calculator",
    tabConverter: "Converter",
    tabOther: "Other Features",
    capabilityCalculator: "Area Calculator",
    capabilityCalculatorDesc:
      "Calculate land area from length and breadth with support for multiple unit systems",
    capabilityConverter: "Unit Converter",
    capabilityConverterDesc:
      "Convert between Ropani, Aana, Bigha, Katha, Dhur and international units",
    capabilityUnits: "Multiple Units",
    capabilityUnitsDesc:
      "Support for all traditional Nepali land measurement units and international standards",
    landUnitsTitle: "Nepali Land Measurement Units",
    landUnitsSubtitle:
      "Understanding traditional Nepali land measurement systems",
    ropaniDesc: "Traditional land unit used in hilly regions of Nepal",
    ropaniEquivalent: "1 Ropani = 16 Aana = 5476 sq. ft",
    aanaDesc: "Subdivision of Ropani used in the hill regions",
    aanaEquivalent: "1 Aana = 4 Paisa = 342.25 sq. ft",
    paisaDesc: "Smaller unit in the Ropani system",
    paisaEquivalent: "1 Paisa = 4 Daam = 85.56 sq. ft",
    daamDesc: "Smallest unit in the Ropani system",
    daamEquivalent: "1 Daam = 21.39 sq. ft",
    bighaDesc: "Traditional land unit used in Terai region of Nepal",
    bighaEquivalent: "1 Bigha = 20 Katha = 72,900 sq. ft",
    kathaDesc: "Subdivision of Bigha used in the Terai region",
    kathaEquivalent: "1 Katha = 20 Dhur = 3,645 sq. ft",
    dhurDesc: "Smallest unit in the Bigha system",
    dhurEquivalent: "1 Dhur = 182.25 sq. ft",
    useCasesTitle: "Who Can Benefit",
    useCasesSubtitle: "Our calculator serves various sectors across Nepal",
    useCaseRealEstate: "Real Estate Professionals",
    useCaseRealEstateDesc:
      "Quickly calculate and convert land measurements for property listings and transactions",
    useCaseGovernment: "Government Officials",
    useCaseGovernmentDesc:
      "Accurately convert between traditional and modern units for land records and taxation",
    useCaseBusiness: "Construction & Development",
    useCaseBusinessDesc:
      "Plan projects with precise land measurements in preferred units",
    useCaseIndividual: "Individual Landowners",
    useCaseIndividualDesc:
      "Understand your property measurements in both traditional and modern terms",
    mobileAppTitle: "Take It With You",
    mobileAppDescription:
      "Our land calculator is also available as a mobile app, allowing you to make calculations on the go without internet connection",
    mobileAppButton: "Get Mobile App",
    mobileAppFeature: "Works Offline",
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
    enterValue: "मान प्रविष्ट गर्नुहोस्",
    footerText: "नेपालको लागि ❤️ का साथ डिजाइन र विकसित",
    errorInvalidInput: "कृपया मान्य संख्याहरू प्रविष्ट गर्नुहोस्",
    errorRequired: "यो फिल्ड आवश्यक छ",
    goToCalculator: "क्याल्कुलेटरमा जानुहोस्",
    goToConverter: "कन्भर्टरमा जानुहोस्",
    heroPoint1: "सटीक रूपान्तरणहरू",
    heroPoint2: "परम्परागत र आधुनिक एकाइहरू",
    heroPoint3: "द्विभाषिक इन्टरफेस",
    calculatorBenefit1: "लम्बाई र चौडाईबाट क्षेत्रफल गणना गर्नुहोस्",
    calculatorBenefit2: "फिट र मिटर नापहरूको लागि समर्थन",
    calculatorBenefit3: "रोपनी, बिघा, र अन्य एकाइहरूमा रूपान्तरण गर्नुहोस्",
    calculatorBenefit4: "दशमलव समर्थनका साथ सटीक गणनाहरू",
    converterBenefit1: "सबै नेपाली जग्गा एकाइहरू बीच रूपान्तरण गर्नुहोस्",
    converterBenefit2:
      "अन्तर्राष्ट्रिय एकाइहरूको लागि समर्थन (वर्ग फिट, वर्ग मिटर)",
    converterBenefit3: "सटीक परिणामहरूसँग तत्काल रूपान्तरण",
    converterBenefit4: "जटिल एकाइ सम्बन्धहरू सम्हाल्छ",
    bilingualBenefit1: "अङ्ग्रेजी र नेपालीको लागि पूर्ण समर्थन",
    bilingualBenefit2: "सबै एकाइहरूको लागि मातृभाषा शब्दावली",
    bilingualBenefit3: "सजिलो भाषा स्विचिङ",
    bilingualBenefit4: "सांस्कृतिक रूपमा उपयुक्त नापहरू",
    additionalFeature1: "सटीक गणनाहरू",
    additionalFeature2: "सुरक्षित र निजी",
    additionalFeature3: "द्रुत प्रदर्शन",
    additionalFeature4: "नियमित अपडेटहरू",
    cta: "तपाईंको जग्गा नापहरू सरल बनाउन तयार हुनुहुन्छ?",
    tabAll: "सबै विशेषताहरू",
    tabCalculator: "क्याल्कुलेटर",
    tabConverter: "कन्भर्टर",
    tabOther: "अन्य विशेषताहरू",
    capabilityCalculator: "क्षेत्रफल क्याल्कुलेटर",
    capabilityCalculatorDesc:
      "विभिन्न एकाइ प्रणालीहरूको समर्थनका साथ लम्बाई र चौडाईबाट जग्गाको क्षेत्रफल गणना गर्नुहोस्",
    capabilityConverter: "एकाइ कन्भर्टर",
    capabilityConverterDesc:
      "रोपनी, आना, बिघा, कट्ठा, धुर र अन्तर्राष्ट्रिय एकाइहरू बीच रूपान्तरण गर्नुहोस्",
    capabilityUnits: "बहु एकाइहरू",
    capabilityUnitsDesc:
      "सबै परम्परागत नेपाली जग्गा नाप एकाइहरू र अन्तर्राष्ट्रिय मापदण्डहरूको लागि समर्थन",
    landUnitsTitle: "नेपाली जग्गा नाप एकाइहरू",
    landUnitsSubtitle: "परम्परागत नेपाली जग्गा नाप प्रणालीहरू बुझ्दै",
    ropaniDesc: "नेपालको पहाडी क्षेत्रमा प्रयोग गरिने परम्परागत जग्गा एकाइ",
    ropaniEquivalent: "१ रोपनी = १६ आना = ५४७६ वर्ग फिट",
    aanaDesc: "पहाडी क्षेत्रमा प्रयोग गरिने रोपनीको उपविभाजन",
    aanaEquivalent: "१ आना = ४ पैसा = ३४२.२५ वर्ग फिट",
    paisaDesc: "रोपनी प्रणालीमा सानो एकाइ",
    paisaEquivalent: "१ पैसा = ४ दाम = ८५.५६ वर्ग फिट",
    daamDesc: "रोपनी प्रणालीमा सबैभन्दा सानो एकाइ",
    daamEquivalent: "१ दाम = २१.३९ वर्ग फिट",
    bighaDesc: "नेपालको तराई क्षेत्रमा प्रयोग गरिने परम्परागत जग्गा एकाइ",
    bighaEquivalent: "१ बिघा = २० कट्ठा = ७२,९०० वर्ग फिट",
    kathaDesc: "तराई क्षेत्रमा प्रयोग गरिने बिघाको उपविभाजन",
    kathaEquivalent: "१ कट्ठा = २० धुर = ३,६४५ वर्ग फिट",
    dhurDesc: "बिघा प्रणालीमा सबैभन्दा सानो एकाइ",
    dhurEquivalent: "१ धुर = १८२.२५ वर्ग फिट",
    useCasesTitle: "कसले फाइदा लिन सक्छन्",
    useCasesSubtitle:
      "हाम्रो क्याल्कुलेटरले नेपालभरका विभिन्न क्षेत्रहरूलाई सेवा प्रदान गर्दछ",
    useCaseRealEstate: "रियल इस्टेट पेशेवरहरू",
    useCaseRealEstateDesc:
      "सम्पत्ति सूचीहरू र लेनदेनका लागि जग्गा नापहरू छिटो गणना र रूपान्तरण गर्नुहोस्",
    useCaseGovernment: "सरकारी अधिकारीहरू",
    useCaseGovernmentDesc:
      "जग्गा रेकर्ड र कराधानका लागि परम्परागत र आधुनिक एकाइहरू बीच सटीक रूपमा रूपान्तरण गर्नुहोस्",
    useCaseBusiness: "निर्माण र विकास",
    useCaseBusinessDesc:
      "पसन्दिदा एकाइहरूमा सटीक जग्गा नापहरूसँग परियोजनाहरू योजना बनाउनुहोस्",
    useCaseIndividual: "व्यक्तिगत जग्गा मालिकहरू",
    useCaseIndividualDesc:
      "तपाईंको सम्पत्ति नापहरू परम्परागत र आधुनिक दुवै शब्दहरूमा बुझ्नुहोस्",
    mobileAppTitle: "आफूसँगै लैजानुहोस्",
    mobileAppDescription:
      "हाम्रो जग्गा क्याल्कुलेटर मोबाइल एपको रूपमा पनि उपलब्ध छ, जसले तपाईंलाई इन्टरनेट जडान बिना पनि चलिरहेको बेला गणनाहरू गर्न अनुमति दिन्छ",
    mobileAppButton: "मोबाइल एप प्राप्त गर्नुहोस्",
    mobileAppFeature: "अफलाइन काम गर्छ",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "np" : "en");
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
