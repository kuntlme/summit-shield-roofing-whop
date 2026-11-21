import { Percent } from 'lucide-react'

export function FinancingBanner() {
  return (
    <section id="financing" className="relative bg-slate-50 py-16 sm:py-20 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:shadow-2xl">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-800 dark:text-amber-300">
                <Percent className="size-3.5 text-amber-500" />
                <span>0% APR Promotional Financing Available</span>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                Replace Your Roof Today. Pay Over Time.
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                A sudden roof leak or hail strike shouldn't drain your emergency savings. Approved homeowners automatically unlock flexible 0% APR buy-now-pay-later and installment terms right at checkout with zero paperwork.
              </p>

              {/* Three Key Options */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
                  <span className="block text-xs font-bold text-amber-700 dark:text-amber-400">Klarna & Affirm</span>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    Split into 4 equal bi-weekly payments or low-interest monthly terms up to 36 months.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
                  <span className="block text-xs font-bold text-amber-700 dark:text-amber-400">Splitit Installments</span>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    Use your existing credit card limit. Zero credit applications and 0% interest charges.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/80">
                  <span className="block text-xs font-bold text-amber-700 dark:text-amber-400">0% Interest 12 Mo</span>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    Zero interest if paid in full within 12 months for qualified residential replacements.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Card: How it Surfaces at Checkout */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Checkout Integration</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">Instant Automated Approval</span>
                </span>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                    <span className="font-semibold">Standard Card (Pay in Full)</span>
                    <span className="text-slate-500 dark:text-slate-400">$5,000</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-900 dark:border-amber-500/40 dark:bg-amber-950/30 dark:text-amber-300">
                    <span className="font-semibold">Split into 4 Payments</span>
                    <span className="font-bold text-amber-700 dark:text-amber-400">$1,250 / bi-weekly</span>
                  </div>
                  <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3 text-slate-800 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                    <span className="font-semibold">Monthly Financing (24 mo)</span>
                    <span className="text-slate-500 dark:text-slate-400">$229 / mo</span>
                  </div>
                </div>

                <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                  Financing options appear directly during checkout. No separate third-party redirect or clunky paperwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
