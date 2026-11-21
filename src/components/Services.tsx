import { useState } from 'react'
import { ArrowRight, Check, Clock, ShieldCheck, Home, AlertTriangle, Building, Wrench } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'
import { firePixelEvent } from '../utils/tracking'

interface ServicesProps {
  onOpenEstimate: () => void
  onOpenCheckout: (planId?: string) => void
}

export function Services({ onOpenEstimate, onOpenCheckout }: ServicesProps) {
  const [selectedService, setSelectedService] = useState(SITE_CONFIG.services[0])

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'home':
        return <Home className="size-5" />
      case 'alert-triangle':
        return <AlertTriangle className="size-5" />
      case 'building':
        return <Building className="size-5" />
      case 'wrench':
        return <Wrench className="size-5" />
      default:
        return <Home className="size-5" />
    }
  }

  const handleSelectService = (service: typeof SITE_CONFIG.services[0]) => {
    setSelectedService(service)
    firePixelEvent('service_viewed', {
      service_id: service.id,
      service_title: service.title,
      slug: service.slug
    })
  }

  return (
    <section id="services" className="relative bg-slate-50 py-20 sm:py-28 border-t border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Commercial & Residential Roofing Services
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Every roof structure faces unique thermal expansion, wind uplift, and moisture stress.
            Explore our specialized disciplines engineered to factory-certified specifications.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-3 lg:col-span-5">
            {SITE_CONFIG.services.map((service) => {
              const isSelected = selectedService.id === service.id
              return (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => handleSelectService(service)}
                  className={`group flex w-full items-start gap-4 rounded-xl border p-5 text-left transition ${
                    isSelected
                      ? 'border-amber-500 bg-white shadow-md dark:bg-slate-950 shadow-amber-500/10'
                      : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-slate-700 dark:hover:bg-slate-950/70'
                  }`}
                >
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-lg transition ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 text-slate-700 group-hover:text-amber-600 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:text-amber-400'
                    }`}
                  >
                    {getIcon(service.icon)}
                  </div>
                  <div>
                    <h3
                      className={`text-base font-bold transition ${
                        isSelected ? 'text-amber-700 dark:text-amber-400' : 'text-slate-800 group-hover:text-slate-900 dark:text-slate-200 dark:group-hover:text-slate-100'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                      {service.shortDesc}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500">
                  Service Specifications
                </span>
                <h3 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-slate-100">
                  {selectedService.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <Clock className="size-3.5 text-amber-500" />
                <span>{selectedService.timeline}</span>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {selectedService.fullDesc}
            </p>

            <div className="mt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Key Engineering Specifications
              </span>
              <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {selectedService.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-900 dark:bg-slate-900/50"
                  >
                    <Check className="size-4 shrink-0 text-amber-500 mt-0.5" />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 dark:border-slate-800 dark:bg-slate-900/40">
              <div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Coverage Guarantee</span>
                </span>
                <p className="mt-1 text-xs font-bold text-slate-800 dark:text-slate-200">
                  {selectedService.warranty}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Ideal Situation</span>
                <p className="mt-1 text-xs font-medium text-slate-700 dark:text-slate-300">
                  {selectedService.idealFor}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={onOpenEstimate}
                className="flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
              >
                <span>Request Quote for {selectedService.title}</span>
                <ArrowRight className="size-4" />
              </button>

              <button
                type="button"
                onClick={() => onOpenCheckout('plan_rrw2g4VrMy12U')}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-amber-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <span>Instant Project Deposit ($500)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
