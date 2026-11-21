import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { Services } from '../components/Services'
import { Workflow } from '../components/Workflow'
import { PricingPlans } from '../components/PricingPlans'
import { CheckoutModal } from '../components/CheckoutModal'
import { EstimateForm } from '../components/EstimateForm'
import { InvoiceSimulator } from '../components/InvoiceSimulator'
import { FinancingBanner } from '../components/FinancingBanner'
import { ReviewsTrust } from '../components/ReviewsTrust'
import { ServiceArea } from '../components/ServiceArea'
import { Footer } from '../components/Footer'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const [checkoutPlanId, setCheckoutPlanId] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleOpenCheckout = (planId?: string) => {
    setCheckoutPlanId(planId || 'plan_rrw2g4VrMy12U')
    setIsCheckoutOpen(true)
  }

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false)
  }

  const handleOpenEstimate = () => {
    const el = document.getElementById('estimate')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Header & Navigation */}
      <Navbar onOpenEstimate={handleOpenEstimate} onOpenCheckout={handleOpenCheckout} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Showcase */}
        <Hero onOpenEstimate={handleOpenEstimate} onOpenCheckout={handleOpenCheckout} />

        {/* 2. Services Section (Repair, Replacement, Commercial, Inspection) */}
        <Services onOpenEstimate={handleOpenEstimate} onOpenCheckout={handleOpenCheckout} />

        {/* 3. High-Ticket Roofing Flow (Deposit -> Job -> Final Invoice) */}
        <Workflow onOpenCheckout={handleOpenCheckout} onOpenEstimate={handleOpenEstimate} />

        {/* 4. Real Plans & Pricing ($149 Inspection, $500 Deposit, $1,250 Flat Rate) */}
        <PricingPlans onOpenCheckout={handleOpenCheckout} />

        {/* 5. 0% APR & Buy-Now-Pay-Later Financing Callout */}
        <FinancingBanner />

        {/* 6. Invoices Final Balance Simulator */}
        <InvoiceSimulator />

        {/* 7. "Request an Estimate" Form */}
        <EstimateForm />

        {/* 8. Regional Service Area & Zip-Code Checker */}
        <ServiceArea onOpenEstimate={handleOpenEstimate} />

        {/* 9. Reviews, BBB A+, GAF Master Elite & Warranties */}
        <ReviewsTrust />
      </main>

      {/* Footer & License Disclosures */}
      <Footer />

      {/* Payment Elements Modal (CheckoutElement + ExpressCheckoutElement + BrandingElement) */}
      <CheckoutModal
        planId={checkoutPlanId}
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
      />
    </div>
  )
}
