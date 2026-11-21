import { ArrowRight, CheckCircle2, FileText } from 'lucide-react'
import { firePixelEvent } from '../utils/tracking'

interface HeroProps {
  onOpenEstimate: () => void
  onOpenCheckout: (planId?: string) => void
}

export function Hero({ onOpenEstimate, onOpenCheckout }: HeroProps) {
  const handleScheduleInspection = () => {
    firePixelEvent('deposit_started', {
      plan_id: 'plan_NxUGyP6ePxtiN',
      title: 'Roof Inspection & Report',
      value: 149,
      currency: 'USD'
    })
    onOpenCheckout('plan_NxUGyP6ePxtiN')
  }

  const handleStartEstimate = () => {
    firePixelEvent('service_viewed', {
      section: 'hero_estimate_cta',
      intent: 'quote_request'
    })
    onOpenEstimate()
  }

  return (
    <section id="hero" className="relative overflow-hidden bg-white py-16 sm:py-24 lg:py-28 dark:bg-slate-950 transition-colors duration-200">
      {/* Subtle architectural grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] dark:opacity-20" />

      {/* Ambient warm glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[36rem] rounded-full bg-amber-500/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300">
              <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Certified GAF Master Elite® · Top 2% US Contractors</span>
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-6xl sm:leading-[1.1]">
              Engineered Roofing Built for Severe US Weather.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              Commercial & architectural installations backed by a 50-year non-prorated system warranty.
              From 21-point drone thermal scans to transparent milestone billing, we protect your home with uncompromising craft.
            </p>

            {/* Direct Conversion Actions */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={handleStartEstimate}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-4 text-base font-bold text-slate-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400 active:scale-[0.98]"
              >
                <span>Request Detailed 3D Estimate</span>
                <ArrowRight className="size-5" />
              </button>

              <button
                onClick={handleScheduleInspection}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 text-base font-semibold text-slate-800 shadow-sm transition hover:border-amber-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                <FileText className="size-5 text-amber-500" />
                <span>Book $149 Drone Inspection</span>
              </button>
            </div>

            {/* Micro guarantees */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-amber-500" />
                <span>$0 Consultation Fee</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-amber-500" />
                <span>0% APR Financing for 12 Mo</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-amber-500" />
                <span>Bank-Grade Card-on-File Security</span>
              </span>
            </div>
          </div>

          {/* Interactive Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-xl backdrop-blur-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="size-3 rounded-full bg-red-500/80" />
                  <div className="size-3 rounded-full bg-amber-500/80" />
                  <div className="size-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-xs text-slate-500 dark:text-slate-400">
                    Summit Shield Certified Protocol
                  </span>
                </div>
                <span className="rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
                  Live Dispatch
                </span>
              </div>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition dark:border-slate-800/80 dark:bg-slate-950/60">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800 font-bold text-sm dark:bg-amber-500/20 dark:text-amber-300">
                    1
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200">
                      Drone Thermal Analysis ($149)
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                      Sub-surface moisture scan & itemized CAD roof blueprint.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-amber-300 bg-amber-50/70 p-3.5 transition dark:border-amber-500/50 dark:bg-amber-500/10">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-slate-950 font-bold text-sm">
                    2
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Project Deposit & Permitting ($500)
                      </h4>
                      <span className="rounded bg-amber-200 px-2 py-0.5 text-[10px] font-bold text-amber-900 dark:bg-amber-500/20 dark:text-amber-300">
                        Secure Card-on-File
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-700 dark:text-slate-300">
                      Locks senior crew schedule & securely stores card for milestone completion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition dark:border-slate-800/80 dark:bg-slate-950/60">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-800 font-bold text-sm dark:bg-slate-800 dark:text-slate-300">
                    3
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200">
                      Tear-Off & GAF Golden Pledge Build
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                      Deck reinforcement, synthetic shield & 130 MPH wind-rated shingles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-slate-50 p-3.5 transition dark:border-slate-800/80 dark:bg-slate-950/60">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-800 font-bold text-sm dark:bg-emerald-500/10 dark:text-emerald-400">
                    4
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-slate-200">
                        Final Inspection & Balance Invoice
                      </h4>
                      <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-500/10 dark:text-emerald-400">
                        Sign-Off Settlement
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                      Sign-off walkthrough, warranty certificate & flexible automated final invoice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:text-slate-400">
                <span>Standard Home Deposit: <strong className="text-slate-900 dark:text-slate-100">$500</strong></span>
                <button
                  onClick={() => onOpenCheckout('plan_rrw2g4VrMy12U')}
                  className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900 transition hover:bg-amber-200 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30"
                >
                  Reserve Project Deposit →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
