import { useEffect } from 'react'
import { X, Lock, Sparkles, CreditCard, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { firePixelEvent } from '../utils/tracking'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  planId?: string | null
}

export function CheckoutModal({ isOpen, onClose, planId }: CheckoutModalProps) {
  const selectedPlan = SITE_CONFIG.plans.find((p) => p.id === planId) || SITE_CONFIG.plans[1]

  useEffect(() => {
    if (isOpen) {
      firePixelEvent('deposit_started', {
        plan_id: selectedPlan.id,
        plan_title: selectedPlan.title,
        amount: selectedPlan.price
      })
    }
  }, [isOpen, selectedPlan.id])

  if (!isOpen) return null

  const checkoutUrl = `https://whop.com/checkout/${selectedPlan.id}`

  const handleGoToCheckout = () => {
    // Fire tracking event before redirecting
    firePixelEvent('checkout_opened', {
      plan_id: selectedPlan.id,
      plan_title: selectedPlan.title,
      amount: selectedPlan.price,
      checkout_url: checkoutUrl
    })
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900 transition-colors duration-200">

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="flex size-7 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold text-xs">
              <Lock className="size-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Secure Checkout
              </h3>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                Apple Pay · Google Pay · Card · Klarna · Splitit
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
        <div className="p-6 space-y-5">

          {/* Selected Plan Summary */}
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/20 dark:bg-amber-500/5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-1">
                  Selected Service
                </div>
                <div className="font-bold text-slate-900 dark:text-slate-100">{selectedPlan.title}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400 mt-0.5">{selectedPlan.description}</div>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-slate-100 shrink-0 ml-4">
                {selectedPlan.priceDisplay}
              </div>
            </div>
          </div>

          {/* What you get with real checkout */}
          <div className="space-y-2.5">
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Included at Checkout
            </div>
            {[
              { icon: Sparkles, label: 'Apple Pay & Google Pay', sub: 'One-tap express checkout' },
              { icon: CreditCard, label: 'Credit & Debit Cards', sub: 'Visa, Mastercard, Amex' },
              { icon: Lock, label: '0% Financing Options', sub: 'Klarna, Splitit, Afterpay where approved' }
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 text-sm">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                  <Icon className="size-4 text-amber-500" />
                </div>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200 text-xs">{label}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Plan switcher */}
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
              Or select a different service
            </div>
            <div className="grid grid-cols-3 gap-2">
              {SITE_CONFIG.plans.map((p) => (
                <a
                  key={p.id}
                  href={`https://whop.com/checkout/${p.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    firePixelEvent('checkout_opened', { plan_id: p.id, amount: p.price })
                  }
                  className={`rounded-xl border p-2.5 text-left transition block ${
                    selectedPlan.id === p.id
                      ? 'border-amber-500 bg-amber-50 text-amber-900 shadow-sm dark:bg-slate-950 dark:text-amber-400'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="block text-[11px] font-bold line-clamp-1">{p.title}</span>
                  <span className="block mt-1 text-sm font-black text-slate-900 dark:text-slate-100">
                    {p.priceDisplay}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* CTA button → real Whop checkout */}
          <button
            type="button"
            onClick={handleGoToCheckout}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-4 text-sm font-bold text-slate-950 transition hover:bg-amber-400 active:scale-[0.98]"
          >
            <span>Proceed to Secure Checkout — {selectedPlan.priceDisplay}</span>
            <ArrowRight className="size-4" />
          </button>

          <p className="text-center text-[11px] text-slate-400 dark:text-slate-500">
            You'll be taken to the secure payment page. Card details are never stored on our servers.
          </p>

          {/* BrandingElement */}
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
      </div>
    </div>
  )
}
