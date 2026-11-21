import { Check, CreditCard, ArrowRight, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { firePixelEvent } from '../utils/tracking'

interface PricingPlansProps {
  onOpenCheckout: (planId?: string) => void
}

export function PricingPlans({ onOpenCheckout }: PricingPlansProps) {
  const handleSelectPlan = (plan: typeof SITE_CONFIG.plans[0]) => {
    firePixelEvent('deposit_started', {
      plan_id: plan.id,
      title: plan.title,
      value: plan.price,
      currency: 'USD'
    })
    onOpenCheckout(plan.id)
  }

  return (
    <section id="pricing" className="relative bg-white py-20 sm:py-28 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Real Plans & Milestone Payments
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            All transactions support Apple Pay, Google Pay, standard cards,
            and flexible buy-now-pay-later financing (Klarna & Splitit) with zero paperwork.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3 lg:items-stretch">
          {SITE_CONFIG.plans.map((plan) => {
            return (
              <div
                key={plan.id}
                data-whop-price={plan.price}
                data-whop-currency="USD"
                className={`relative flex flex-col justify-between rounded-2xl border p-7 sm:p-8 transition ${
                  plan.popular
                    ? 'border-amber-500 bg-white shadow-xl shadow-amber-500/10 dark:bg-slate-950'
                    : 'border-slate-200 bg-white shadow-sm hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-slate-700 dark:hover:bg-slate-950'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 right-6">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                        plan.popular
                          ? 'bg-amber-500 text-slate-950 shadow-md'
                          : 'border border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      {plan.billingType}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      Certified Pricing
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-black text-slate-900 dark:text-slate-100 sm:text-2xl">
                    {plan.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 flex items-baseline gap-2 border-y border-slate-100 dark:border-slate-800/80 py-4">
                    <span className="text-4xl font-extrabold text-slate-900 dark:text-slate-100 sm:text-5xl">
                      {plan.priceDisplay}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      USD / one-time
                    </span>
                  </div>

                  <p className="mt-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mt-6 space-y-2.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      What's Included
                    </span>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                        <Check className="size-4 shrink-0 text-amber-500 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-bold transition active:scale-[0.98] ${
                      plan.popular
                        ? 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-md shadow-amber-500/20'
                        : 'border border-slate-300 bg-slate-50 text-slate-900 hover:border-amber-500 hover:bg-white hover:text-amber-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800 dark:hover:text-amber-400'
                    }`}
                  >
                    <CreditCard className="size-4" />
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="size-4" />
                  </button>

                  {/* Clean micro-guarantee specific to each plan */}
                  <div className="mt-3.5 flex items-center justify-center gap-1.5 text-center text-xs font-medium text-slate-600 dark:text-slate-300">
                    <ShieldCheck className="size-3.5 text-amber-500 shrink-0" />
                    <span>{plan.guarantee}</span>
                  </div>

                  {/* Clean structured payment method chips with zero awkward wrapping */}
                  <div className="mt-3 flex items-center justify-center gap-1.5 flex-wrap text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 dark:border-slate-800 dark:bg-slate-900/80">
                      Apple Pay
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 dark:border-slate-800 dark:bg-slate-900/80">
                      Google Pay
                    </span>
                    <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 dark:border-slate-800 dark:bg-slate-900/80">
                      Cards
                    </span>
                    <span className="rounded-md border border-amber-300 bg-amber-50 px-2 py-0.5 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-300 font-bold">
                      0% APR
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 dark:border-slate-800 dark:bg-slate-900/60 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    Encrypted Express Checkout & Flexible Financing
                  </span>
                  <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
                    PCI-DSS Level 1
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                  Includes bank-level encryption, secure tokenized card-on-file authorization, and instant 0% APR financing via Klarna & Splitit.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span className="size-2 rounded-full bg-emerald-500" />
              <span>256-Bit SSL Encrypted · PCI-DSS Level 1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
