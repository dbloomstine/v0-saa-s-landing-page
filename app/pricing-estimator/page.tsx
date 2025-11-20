import { PricingEstimator } from "@/components/pricing-estimator"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Pricing Calculator - Fund Administration Estimator",
  description: "Calculate your fund administration costs with our interactive pricing estimator. Get instant estimates for low, medium, and high service tiers.",
}

export default function PricingEstimatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-16">
        <PricingEstimator />
      </main>
      <Footer />
    </>
  )
}
