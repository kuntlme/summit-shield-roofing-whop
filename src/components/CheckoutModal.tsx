import { useState, useEffect } from 'react'
import { X, Lock, CheckCircle2, ArrowRight, ExternalLink, RefreshCw } from 'lucide-react'
import { WhopElements, Checkout, CheckoutElement } from '@whop/elements-react'
import { loadWhop } from '@whop/elements'
import { SITE_CONFIG } from '../config/site'
import { firePixelEvent } from '../utils/tracking'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  planId?: string | null
}

export function CheckoutModal({ isOpen, onClose, planId }: CheckoutModalProps) {
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
    if (planId) {
      const match = SITE_CONFIG.plans.find((p) => p.id === planId)
      if (match) setSelectedPlan(match)
    }
  }, [planId])

  useEffect(() => {
    if (isOpen) {
      setCompletedPayment(null)
      firePixelEvent('deposit_started', {
        plan_id: selectedPlan.id,
        plan_title: selectedPlan.title,
        amount: selectedPlan.price
      })
    }
  }, [isOpen, selectedPlan.id])

  if (!isOpen) return null

  const directCheckoutUrl = `https://whop.com/checkout/${selectedPlan.id}`

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
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Embedded Secure Checkout
              </h3>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Powered by Whop Payment Elements · Apple Pay, Cards & 0% Financing
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
        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">

          {/* Success Screen */}
          {completedPayment ? (
            <div className="text-center py-6 space-y-5">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
                <CheckCircle2 className="size-10" />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-slate-100">
                  Payment Succeeded!
                </h4>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  Your transaction has been confirmed and stored in your Whop account.
                </p>
              </div>

              <div className="max-w-md mx-auto rounded-xl border border-slate-200 bg-slate-50 p-4 text-left font-mono text-xs space-y-2 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Service Plan</span>
                  <span className="text-slate-900 dark:text-slate-100 font-bold">{selectedPlan.title}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                  <span className="text-slate-500">Amount Paid</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">{selectedPlan.priceDisplay}</span>
                </div>
                {completedPayment.paymentId && (
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="text-slate-500">Payment ID</span>
                    <span className="text-amber-500 font-bold">{completedPayment.paymentId}</span>
                  </div>
                )}
                {completedPayment.setupIntentId && (
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
                    <span className="text-slate-500">Saved Method</span>
                    <span className="text-emerald-400 font-bold">{completedPayment.setupIntentId}</span>
                  </div>
                )}
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Status</span>
                  <span className="text-emerald-500 font-semibold">Completed</span>
                </div>
              </div>

              <div className="flex gap-3 max-w-md mx-auto pt-2">
                <button
                  type="button"
                  onClick={() => setCompletedPayment(null)}
                  className="flex-1 rounded-xl border border-slate-300 bg-white py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <RefreshCw className="inline size-3.5 mr-1" />
                  Book Another Plan
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400 transition"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Plan Switcher Pills */}
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

              {/* Selected Plan Callout Banner */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 flex items-center justify-between dark:border-amber-500/20 dark:bg-amber-500/5">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    {selectedPlan.title} — {selectedPlan.priceDisplay}
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    {selectedPlan.description}
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
                      key={selectedPlan.id}
                      plan={selectedPlan.id}
                      onComplete={(payload: any) => {
                        setCompletedPayment(payload)
                        firePixelEvent('deposit_completed', {
                          plan_id: selectedPlan.id,
                          amount: selectedPlan.price,
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
