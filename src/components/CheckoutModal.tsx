import { useState, useEffect } from 'react'
import { X, Lock, CheckCircle2, ArrowRight, ExternalLink, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react'
import { WhopElements, Checkout, CheckoutElement } from '@whop/elements-react'
import { loadWhop } from '@whop/elements'
import { SITE_CONFIG } from '../config/site'
import { firePixelEvent } from '../utils/tracking'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  planId?: string | null
}

const TEST_PLAN = {
  id: 'plan_12oePCZapctEH',
  title: 'Test Sandbox Deposit (Simulation)',
  price: 0,
  priceDisplay: '$0.00 (Free Test)',
  description: 'Zero-deduction sandbox transaction to safely test Whop checkout without charging any money.'
}

export function CheckoutModal({ isOpen, onClose, planId }: CheckoutModalProps) {
  const [isTestMode, setIsTestMode] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(
    SITE_CONFIG.plans.find((p) => p.id === planId) || SITE_CONFIG.plans[1]
  )
  const [elementsLoader, setElementsLoader] = useState<any>(null)
  const [completedPayment, setCompletedPayment] = useState<any>(null)
  const [loadError, setLoadError] = useState<string | null>(null)

  // Initialize Whop Elements loader on client mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        setElementsLoader(loadWhop())
      } catch (err: any) {
        setLoadError(err.message || 'Failed to initialize payment gateway')
      }
    }
  }, [])

  useEffect(() => {
    if (planId && !isTestMode) {
      const match = SITE_CONFIG.plans.find((p) => p.id === planId)
      if (match) setSelectedPlan(match)
    }
  }, [planId, isTestMode])

  useEffect(() => {
    if (isOpen) {
      setCompletedPayment(null)
      const activePlan = isTestMode ? TEST_PLAN : selectedPlan
      firePixelEvent('deposit_started', {
        plan_id: activePlan.id,
        plan_title: activePlan.title,
        amount: activePlan.price,
        is_test_mode: isTestMode
      })
    }
  }, [isOpen, selectedPlan.id, isTestMode])

  if (!isOpen) return null

  const activePlan = isTestMode ? TEST_PLAN : selectedPlan
  const directCheckoutUrl = `https://whop.com/checkout/${activePlan.id}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-auto overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 transition-colors duration-200">

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 sm:px-6 py-4 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/70">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">
              <Lock className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>Whop Payment Elements</span>
                {isTestMode && (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    Test Mode ($0)
                  </span>
                )}
              </h3>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                {isTestMode
                  ? 'Sandbox Mode · Zero deduction · Safe for test checkout'
                  : 'PCI Level 1 Checkout · Apple Pay, Cards & Flexible Financing'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[82vh] overflow-y-auto">

          {/* Success Screen */}
          {completedPayment ? (
            <div className="text-center py-6 space-y-5">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
                <CheckCircle2 className="size-10" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  {isTestMode ? 'Test Checkout Successful!' : 'Payment Succeeded!'}
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {isTestMode
                    ? 'Completed via Whop sandbox mode with $0 charged. Verified on Whop.'
                    : 'Your transaction has been confirmed and stored in your Whop account.'}
                </p>
              </div>

              <div className="max-w-md mx-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-left font-mono text-xs space-y-2 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Service Plan</span>
                  <span className="text-slate-900 dark:text-slate-100 font-bold">{activePlan.title}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Amount Charged</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activePlan.priceDisplay}</span>
                </div>
                {completedPayment.paymentId && (
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="text-slate-500">Payment ID</span>
                    <span className="text-amber-500 font-bold">{completedPayment.paymentId}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-500 font-semibold">Verified on Whop</span>
                </div>
              </div>

              <div className="flex gap-3 max-w-md mx-auto pt-2">
                <button
                  type="button"
                  onClick={() => setCompletedPayment(null)}
                  className="flex-1 rounded-xl border border-slate-300 bg-white py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <RefreshCw className="inline size-3.5 mr-1" />
                  Test Another
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">

              {/* Mode Toggle Banner: Production vs Test Sandbox */}
              <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-2.5 dark:border-slate-800 dark:bg-slate-950/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                    Want to test without spending real money?
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsTestMode(!isTestMode)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5 ${
                    isTestMode
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Sparkles className="size-3" />
                  <span>{isTestMode ? '✓ Test Mode ($0 Active)' : 'Switch to Test Mode ($0)'}</span>
                </button>
              </div>

              {/* If Test Mode is ON, show test banner */}
              {isTestMode ? (
                <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-3.5 text-xs text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <span>🧪 Sandbox Test Plan Selected: $0.00 / Zero Deduction</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 dark:text-emerald-400 leading-relaxed">
                    This test plan uses Whop's genuine checkout pipeline with <strong>$0.00 charge</strong>. No money will be deducted from your card or bank account, allowing you to complete and record a successful test checkout for your demo submission!
                  </p>
                </div>
              ) : (
                /* Plan Switcher Pills */
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                    Select Roofing Package
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {SITE_CONFIG.plans.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSelectedPlan(p)}
                        className={`rounded-xl border p-2.5 text-left transition ${
                          selectedPlan.id === p.id
                            ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm dark:bg-slate-950 dark:text-amber-400'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="block text-[11px] font-bold line-clamp-1">{p.title}</span>
                        <span className="block mt-1 text-sm font-black text-slate-900 dark:text-slate-100">
                          {p.priceDisplay}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Plan Details Callout */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 flex items-center justify-between dark:border-amber-500/20 dark:bg-amber-500/5">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {activePlan.title} — {activePlan.priceDisplay}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    {activePlan.description}
                  </div>
                </div>
                <a
                  href={directCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center gap-1 text-[11px] font-medium text-amber-600 hover:text-amber-700 dark:text-amber-400 ml-3"
                  title="Open hosted checkout page in new tab"
                >
                  <span>New window</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>

              {/* Real Embedded Whop Payment Elements */}
              <div className="rounded-2xl border border-slate-200 bg-white p-2 sm:p-4 dark:border-slate-800 dark:bg-slate-950/80 min-h-[380px]">
                {loadError ? (
                  <div className="p-8 text-center space-y-3">
                    <p className="text-xs text-red-500">{loadError}</p>
                    <a
                      href={directCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-slate-950"
                    >
                      <span>Proceed to Hosted Checkout</span>
                      <ArrowRight className="size-3.5" />
                    </a>
                  </div>
                ) : elementsLoader ? (
                  <WhopElements
                    elements={elementsLoader}
                    appearance={{
                      theme: {
                        appearance: 'dark'
                      }
                    }}
                  >
                    <Checkout
                      key={`${activePlan.id}_${isTestMode}`}
                      plan={activePlan.id}
                      promoCode={isTestMode ? 'test100' : undefined}
                      onComplete={(payload: any) => {
                        setCompletedPayment(payload)
                        firePixelEvent('deposit_completed', {
                          plan_id: activePlan.id,
                          amount: activePlan.price,
                          payload
                        })
                      }}
                      fallback={
                        <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                          <div className="size-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent mb-3" />
                          <span className="text-xs">Loading Whop Payment Elements...</span>
                        </div>
                      }
                    >
                      <CheckoutElement className="w-full" />
                    </Checkout>
                  </WhopElements>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                    <div className="size-6 animate-spin rounded-full border-2 border-amber-500 border-t-transparent mb-3" />
                    <span className="text-xs">Connecting to Whop Payments...</span>
                  </div>
                )}
              </div>

              {/* Mandatory BrandingElement Component */}
              <div className="flex items-center justify-center gap-2 pt-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="text-[11px]">Powered by</span>
                <a
                  href="https://whop.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-800 dark:text-slate-300 hover:text-black dark:hover:text-white transition flex items-center gap-1.5"
                >
                  <span className="size-2 rounded-full bg-[#FA4616]" />
                  <span>whop</span>
                </a>
                <span className="text-slate-400 dark:text-slate-600">·</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">PCI Level 1 Certified</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
