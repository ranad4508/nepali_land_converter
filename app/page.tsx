import Hero from "@/components/hero"
import Footer from "@/components/footer"
import FeatureSection from "@/components/feature-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <FeatureSection />
      <Footer />
    </main>
  )
}

