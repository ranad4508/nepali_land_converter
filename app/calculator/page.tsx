import LandCalculator from "@/components/land-calculator"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

export default function CalculatorPage() {
  return (
    <main className="min-h-screen">
      <PageHeader title="calculatorTitle" description="calculatorDescription" icon="Calculator" />
      <div className="container mx-auto px-4 py-12">
        <LandCalculator />
      </div>
      <Footer />
    </main>
  )
}

