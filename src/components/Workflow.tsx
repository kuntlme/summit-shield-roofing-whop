import { ArrowRight, ShieldCheck } from 'lucide-react'
import { firePixelEvent } from '../utils/tracking'

interface WorkflowProps {
  onOpenCheckout: (planId?: string) => void
  onOpenEstimate: () => void
}

export function Workflow({ onOpenCheckout, onOpenEstimate }: WorkflowProps) {
  const steps = [
    {
      num: '01',
      title: 'Drone Inspection & 3D Estimation',
      time: 'Day 1',
      description:
        'Homeowner submits project requirements or books a $149 certified inspection. Our Part 107 drone fleet captures 4K orthomosaic thermal scans, generating an exact CAD material list and itemized quote.',
      systemFeature: 'Priority Aerial Intake',
      cta: 'Request Estimate',
      action: () => onOpenEstimate()
    },
    {
      num: '02',
      title: 'Project Deposit & Card-on-File Lock',
      time: 'Day 2',
      description:
        'Homeowner commits to the project with a $500 reservation deposit via secure checkout (Apple Pay, Google Pay, or Card). A tokenized card-on-file authorization protects both parties and locks the crew calendar.',
      systemFeature: 'Secure Card-on-File Lock',
      cta: 'View Deposit Plan ($500)',
      action: () => {
        firePixelEvent('deposit_started', {
          plan_id: 'plan_rrw2g4VrMy12U',
          title: 'Roofing Project Deposit',
          value: 500
        })
        onOpenCheckout('plan_rrw2g4VrMy12U')
      }
    },
    {
      num: '03',
      title: 'Tear-Off, Decking & Master Build',
      time: 'Days 3 - 4',
      description:
        'Senior crew arrives on scheduled date. Complete old layer tear-off, rotted wood sub-deck replacement, ice/water barrier installation, and GAF Timberline HDZ shingle placement with magnetic lawn sweeps.',
      systemFeature: 'Daily Milestone Photo Log',
      cta: null,
      action: null
    },
    {
      num: '04',
      title: 'Forensic Walkthrough & Final Settlement',
      time: 'Day 5 (Completion)',
      description:
        'Job superintendent conducts 35-point punch-list inspection with the homeowner. Customer signs off, and the remaining balance is settled transparently—either auto-charged to the stored card on file or delivered as an itemized digital invoice with 0% APR financing.',
      systemFeature: 'Post-Inspection Settlement',
      cta: 'View Milestone Billing',
      action: () => {
        const el = document.getElementById('invoicing')
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  ]

  return (
    <section id="workflow" className="relative bg-slate-50 py-20 sm:py-28 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-800 dark:text-amber-300">
            <ShieldCheck className="size-4 text-amber-500" />
            <span>The High-Ticket Roofing Flow</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Deposit → Job Execution → Final Invoicing
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            High-ticket roofing projects demand predictability and escrow-level security.
            See our seamless operational cadence from the first deposit to final warranty certification.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700 dark:hover:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black text-amber-500">
                    {step.num}
                  </span>
                  <span className="rounded-full border border-slate-200 bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">
                    {step.time}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-slate-100">
                  {step.title}
                </h3>

                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-amber-700 dark:text-amber-400/90">
                    {step.systemFeature}
                  </span>
                </div>

                {step.cta && (
                  <button
                    onClick={step.action || undefined}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-slate-50 py-2 text-xs font-bold text-slate-800 transition hover:border-amber-500 hover:bg-white hover:text-amber-600 dark:border-slate-700 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-amber-400"
                  >
                    <span>{step.cta}</span>
                    <ArrowRight className="size-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-50/70 via-slate-50 to-white p-6 sm:p-8 shadow-sm dark:border-amber-500/30 dark:bg-gradient-to-r dark:from-amber-950/20 dark:via-slate-900/80 dark:to-slate-950">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                Secure Card-on-File Protection
              </span>
              <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl dark:text-slate-100">
                Homeowner Protection & Milestone Security
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                When you pay the $500 project deposit, your payment method is securely tokenized with bank-grade PCI DSS compliance. No full balance is ever charged until you personally inspect the finished roof with our superintendent and authorize completion.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row lg:col-span-4 lg:justify-end">
              <button
                onClick={() => {
                  firePixelEvent('deposit_started', {
                    plan_id: 'plan_rrw2g4VrMy12U',
                    title: 'Roofing Project Deposit',
                    value: 500
                  })
                  onOpenCheckout('plan_rrw2g4VrMy12U')
                }}
                className="rounded-xl bg-amber-500 px-5 py-3 text-xs font-bold text-slate-950 shadow transition hover:bg-amber-400 text-center"
              >
                Test Deposit Checkout ($500)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
