import LandConverter from "@/components/land-converter"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

export default function ConverterPage() {
  return (
    <main className="min-h-screen">
      <PageHeader title="converterTitle" description="converterDescription" icon="ArrowRightLeft" />
      <div className="container mx-auto px-4 py-12">
        <LandConverter />
      </div>
      <Footer />
    </main>
  )
}

