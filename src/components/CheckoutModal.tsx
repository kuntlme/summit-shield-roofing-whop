import { useState, useEffect } from 'react'
import { X, CheckCircle2, CreditCard, Lock, Sparkles, ArrowRight } from 'lucide-react'
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
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'processing' | 'success'>('idle')
  const [receipt, setReceipt] = useState<{
    paymentId: string
    setupIntentId: string
    planTitle: string
    amount: number
    timestamp: string
  } | null>(null)
  const [email, setEmail] = useState('homeowner@example.com')

  useEffect(() => {
    if (planId) {
      const match = SITE_CONFIG.plans.find((p) => p.id === planId)
      if (match) setSelectedPlan(match)
    }
  }, [planId])

  if (!isOpen) return null

  const handleSimulatePayment = (chosenMethod: string) => {
    setCheckoutStatus('processing')

    // Simulate Whop Elements tokenization & Setup Intent capture
    setTimeout(() => {
      const paymentId = `pay_${Math.random().toString(36).substring(2, 11)}`
      const setupIntentId = `seti_${Math.random().toString(36).substring(2, 11)}`

      const receiptData = {
        paymentId,
        setupIntentId,
        planTitle: selectedPlan.title,
        amount: selectedPlan.price,
        timestamp: new Date().toLocaleTimeString()
      }

      setReceipt(receiptData)
      setCheckoutStatus('success')

      // Track deposit or purchase pixel event
      firePixelEvent('deposit_completed', {
        plan_id: selectedPlan.id,
        amount: selectedPlan.price,
        setup_intent_id: setupIntentId,
        method: chosenMethod
      })
    }, 1200)
  }

  const handleReset = () => {
    setCheckoutStatus('idle')
    setReceipt(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 transition-colors duration-200">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">
              <Lock className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Secure Payment & Express Checkout
              </h3>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                End-to-End PCI Level 1 Encrypted Checkout
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[85vh] overflow-y-auto">
          {checkoutStatus === 'success' && receipt ? (
            /* Success confirmation screen */
            <div className="text-center py-6">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
                <CheckCircle2 className="size-8" />
              </div>
              <h4 className="mt-4 text-2xl font-black text-slate-900 dark:text-slate-100">
                Payment Completed Successfully!
              </h4>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Processed securely with PCI Level 1 encryption
              </p>

              {/* Receipt Details Card */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5 text-left space-y-2.5 font-mono text-xs dark:border-slate-800 dark:bg-slate-950">
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Transaction ID</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">{receipt.paymentId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Card-on-File Authorization</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold">{receipt.setupIntentId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Item Plan</span>
                  <span className="text-slate-800 dark:text-slate-200">{receipt.planTitle}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 dark:border-slate-800/80 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Amount Charged</span>
                  <span className="text-slate-900 dark:text-slate-100 font-bold">${receipt.amount}.00 USD</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500 dark:text-slate-400">Timestamp</span>
                  <span className="text-slate-700 dark:text-slate-300">{receipt.timestamp}</span>
                </div>
              </div>

              {/* Required BrandingElement Display */}
              <div className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-slate-50 py-2.5 border border-slate-200 text-xs text-slate-500 dark:bg-slate-950/60 dark:border-slate-800/60 dark:text-slate-400">
                <span>Powered by</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 tracking-tight flex items-center gap-1">
                  <span className="size-2 rounded-full bg-[#FA4616]" />
                  whop
                </span>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 rounded-xl border border-slate-300 bg-white py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 shadow-sm transition dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Book Another Service
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-xl bg-amber-500 py-3 text-xs font-bold text-slate-950 hover:bg-amber-400 shadow transition"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Active Payment Elements View */
            <div className="space-y-6">
              {/* Plan Switcher Pills */}
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Selected Item
                </span>
                <div className="mt-2 grid grid-cols-3 gap-2">
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

              {/* 1. Express Checkout Surface (Apple Pay / Google Pay) */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-amber-500" />
                    <span>Instant One-Tap Checkout</span>
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Encrypted & Verified</span>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleSimulatePayment('apple_pay')}
                    disabled={checkoutStatus === 'processing'}
                    className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 px-4 text-xs font-bold text-white transition hover:bg-slate-800 active:scale-[0.98] disabled:opacity-50"
                  >
                    <svg className="size-4 fill-current" viewBox="0 0 170 170">
                      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.85-11.71-14.42-5.46-8.79-9.87-19.3-13.23-31.54-3.36-12.24-5.04-23.75-5.04-34.54 0-14.42 3.65-26.47 10.96-36.14 7.3-9.68 16.59-14.61 27.87-14.78 4.35 0 9.38 1.15 15.09 3.44 5.71 2.29 9.39 3.49 11.03 3.6 2.07-.33 5.99-1.63 11.77-3.92 5.78-2.28 10.6-3.32 14.47-3.11 11.25.7 20.37 4.96 27.35 12.78-10.03 6.09-14.94 14.54-14.73 25.35.21 8.5 3.33 15.54 9.36 21.13 6.03 5.59 13.06 8.78 21.09 9.58-1.74 5.44-3.8 10.77-6.19 16-.98 2.29-2.07 4.79-3.26 7.5zM119.22 33.11c0-7.39 2.67-14.33 8.01-20.82 5.34-6.49 12.08-10.77 20.21-12.84.44 2.28.65 4.57.65 6.85 0 7.39-2.82 14.44-8.48 21.15-5.65 6.72-12.35 10.95-20.1 12.7-.07-2.39-.29-4.74-.29-7.04z" />
                    </svg>
                    <span>Apple Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSimulatePayment('google_pay')}
                    disabled={checkoutStatus === 'processing'}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white py-3 px-4 text-xs font-bold text-slate-800 transition hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                  >
                    <span className="font-semibold text-slate-700 dark:text-slate-300">G Pay</span>
                    <span>Google Pay</span>
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-800" />
                </div>
                <span className="relative bg-white px-3 text-[11px] font-medium uppercase tracking-wider text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                  Or Pay with Credit / Debit Card
                </span>
              </div>

              {/* 2. Card Payment Surface */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 space-y-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="size-3.5 text-amber-500" />
                    <span>Credit & Debit Card</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    PCI DSS Tokenized
                  </span>
                </div>

                {/* Contact Email field */}
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Account Email (Receipt & Card Authorization)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
                  />
                </div>

                {/* Card Fields Preview */}
                <div className="space-y-2">
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                    Card Information (256-Bit Encrypted)
                  </label>
                  <div className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-xs text-slate-800 flex items-center justify-between shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <CreditCard className="size-4 text-slate-400" />
                      <span className="font-mono text-slate-800 dark:text-slate-200">•••• •••• •••• 4242</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">12/28 · CVC •••</span>
                  </div>
                </div>

                {/* Financing Callout inside checkout */}
                <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-slate-800 dark:border-amber-500/20 dark:bg-amber-500/5 dark:text-slate-300">
                  <div className="flex items-center justify-between font-semibold text-amber-800 dark:text-amber-300">
                    <span>0% Financing Available</span>
                    <span>Flexible Terms</span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-600 dark:text-slate-400">
                    Qualifying customers can split this payment with Klarna, Splitit, or Affirm automatically upon approval.
                  </p>
                </div>

                {/* Complete Button */}
                <button
                  type="button"
                  onClick={() => handleSimulatePayment('card')}
                  disabled={checkoutStatus === 'processing'}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-xs font-bold text-slate-950 transition hover:bg-amber-400 active:scale-[0.98] disabled:opacity-50"
                >
                  {checkoutStatus === 'processing' ? (
                    <span>Processing Payment...</span>
                  ) : (
                    <>
                      <span>Complete Checkout — {selectedPlan.priceDisplay} USD</span>
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </div>

              {/* 3. REQUIRED BrandingElement ("Powered by Whop") */}
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
