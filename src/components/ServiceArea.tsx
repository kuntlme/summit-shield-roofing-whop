import { useState } from 'react'
import { MapPin, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

interface ServiceAreaProps {
  onOpenEstimate: () => void
}

export function ServiceArea({ onOpenEstimate }: ServiceAreaProps) {
  const [zipInput, setZipInput] = useState('')
  const [zipStatus, setZipStatus] = useState<'idle' | 'covered' | 'extended'>('idle')

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault()
    if (!zipInput || zipInput.length < 5) return

    // Quick regional demo check
    const zipPrefix = zipInput.substring(0, 2)
    if (['44', '43', '15', '16', '48'].includes(zipPrefix)) {
      setZipStatus('covered')
    } else {
      setZipStatus('extended')
    }
  }

  return (
    <section id="service-area" className="relative bg-slate-50 py-20 sm:py-28 border-t border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
              Dedicated Regional Coverage
            </h2>
            <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
              Our mobile roofing and drone inspection crews are stationed throughout the metropolitan and tri-state area for rapid storm dispatch and scheduled architectural installations.
            </p>

            <div className="mt-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-500">
                Primary Counties Served:
              </span>
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200 sm:grid-cols-2">
                {SITE_CONFIG.serviceCounties.map((county, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-lg bg-white p-2.5 border border-slate-200 shadow-sm dark:bg-slate-950 dark:border-slate-800">
                    <CheckCircle2 className="size-4 text-amber-500 shrink-0" />
                    <span>{county}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
              Commercial projects accepted nationwide upon architectural review.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950">
              <div className="flex items-center gap-2.5 border-b border-slate-200 pb-4 dark:border-slate-800">
                <MapPin className="size-5 text-amber-500" />
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                    Check Your Zip Code
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Confirm guaranteed 24-hour drone & repair technician dispatch.
                  </p>
                </div>
              </div>

              <form onSubmit={handleCheckZip} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Enter 5-Digit US Zip Code
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      maxLength={5}
                      placeholder="e.g. 44101"
                      value={zipInput}
                      onChange={(e) => {
                        setZipInput(e.target.value.replace(/[^0-9]/g, ''))
                        setZipStatus('idle')
                      }}
                      className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm font-mono text-slate-900 placeholder:text-slate-400 shadow-sm focus:bg-white focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-600 dark:shadow-none"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-amber-500 px-5 py-3 text-xs font-bold text-slate-950 transition hover:bg-amber-400"
                    >
                      Verify Area
                    </button>
                  </div>
                </div>

                {zipStatus === 'covered' && (
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-xs dark:border-emerald-500/30 dark:bg-emerald-500/10">
                    <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-400">
                      <CheckCircle2 className="size-4" />
                      <span>Direct Coverage Confirmed!</span>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">
                      Zip code <strong>{zipInput}</strong> is located within our priority primary response zone. Certified senior crew available within 24 to 48 hours.
                    </p>
                    <button
                      type="button"
                      onClick={onOpenEstimate}
                      className="mt-3 flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      <span>Proceed to Free Estimate Request</span>
                      <ArrowRight className="size-3" />
                    </button>
                  </div>
                )}

                {zipStatus === 'extended' && (
                  <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs dark:border-amber-500/30 dark:bg-amber-500/10">
                    <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400">
                      <AlertCircle className="size-4" />
                      <span>Regional Extended Service Zone</span>
                    </div>
                    <p className="mt-1 text-slate-600 dark:text-slate-300">
                      Zip code <strong>{zipInput}</strong> is supported with standard scheduling. Submit an estimate request or call our hotline for priority dispatch.
                    </p>
                    <button
                      type="button"
                      onClick={onOpenEstimate}
                      className="mt-3 flex items-center gap-1.5 font-bold text-amber-700 dark:text-amber-400 hover:underline"
                    >
                      <span>Submit Request for Extended Review</span>
                      <ArrowRight className="size-3" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
