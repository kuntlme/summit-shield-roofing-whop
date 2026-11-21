import { useState } from 'react'
import { Send, CheckCircle2, AlertCircle, MapPin, User } from 'lucide-react'
import { firePixelEvent } from '../utils/tracking'
import { submitLeadFn } from '../server/whop'

interface EstimateFormProps {
  onSuccess?: (leadId: string) => void
}

export function EstimateForm({ onSuccess }: EstimateFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    roofAge: '15 - 20 years (Aging)',
    serviceType: 'Full Roof Replacement (Architectural)',
    urgency: 'Standard (1 - 2 weeks)',
    notes: ''
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [leadResult, setLeadResult] = useState<{ leadId: string; timestamp: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      setErrorMessage('Please fill in all required contact and property fields.')
      setStatus('error')
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const result = await submitLeadFn({
        data: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          roofAge: formData.roofAge,
          serviceType: formData.serviceType,
          urgency: formData.urgency,
          notes: formData.notes
        }
      })

      firePixelEvent('estimate_requested', {
        lead_id: result.leadId,
        service: formData.serviceType,
        roof_age: formData.roofAge,
        timestamp: new Date().toISOString()
      })

      setLeadResult({
        leadId: result.leadId,
        timestamp: new Date().toLocaleTimeString()
      })
      setStatus('success')
      if (onSuccess) onSuccess(result.leadId)
    } catch (err: any) {
      console.error('Lead submission error:', err)
      setStatus('error')
      setErrorMessage(err.message || 'Unable to submit estimate. Please call our hotline.')
    }
  }

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      roofAge: '15 - 20 years (Aging)',
      serviceType: 'Full Roof Replacement (Architectural)',
      urgency: 'Standard (1 - 2 weeks)',
      notes: ''
    })
    setStatus('idle')
    setLeadResult(null)
  }

  return (
    <section id="estimate" className="relative bg-white py-20 sm:py-28 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500">
            Priority 24-Hour Aerial Intake
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Request an Itemized Roof Estimate
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Submit your property parameters for an itemized CAD materials quote and drone thermal scan.
            A senior estimator will review your aerial survey and contact you within 24 hours.
          </p>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-10 shadow-xl backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-2xl">
          {status === 'success' && leadResult ? (
            <div className="text-center py-8">
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-400">
                <CheckCircle2 className="size-10" />
              </div>

              <h3 className="mt-4 text-2xl font-black text-slate-900 dark:text-slate-100 sm:text-3xl">
                Estimate Request Received & Dispatched!
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Your property parameters have been routed to our senior estimating team. We are scheduling your high-resolution drone scan.
              </p>

              <div className="mt-6 max-w-lg mx-auto rounded-xl border border-slate-200 bg-white p-5 text-left font-mono text-xs space-y-2 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Confirmation Reference</span>
                  <span className="text-amber-700 dark:text-amber-400 font-bold">{leadResult.leadId}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Service Category</span>
                  <span className="text-slate-800 dark:text-slate-200">{formData.serviceType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                  <span className="text-slate-500 dark:text-slate-400">Property Location</span>
                  <span className="text-slate-800 dark:text-slate-200 truncate max-w-[220px]">{formData.address}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500 dark:text-slate-400">Status</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Priority Dispatch Active</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-slate-800 hover:bg-slate-50 transition shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 p-4 text-xs font-medium text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                  <AlertCircle className="size-4 shrink-0 text-red-500 dark:text-red-400" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-2">
                  <MapPin className="size-4 text-amber-500" />
                  <span>1. Property & Roof Specifications</span>
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Street Address & Zip Code *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 742 Evergreen Terrace, Cleveland, OH 44101"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-600 dark:shadow-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Estimated Roof Age
                    </label>
                    <select
                      value={formData.roofAge}
                      onChange={(e) => setFormData({ ...formData, roofAge: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:shadow-none"
                    >
                      <option>0 - 5 years (Like New)</option>
                      <option>6 - 15 years (Mid-Life)</option>
                      <option>15 - 20 years (Aging)</option>
                      <option>20+ years (Critical Replacement)</option>
                      <option>Unknown (Inspect via Drone)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Service Required
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:shadow-none"
                    >
                      <option>Full Roof Replacement (Architectural)</option>
                      <option>Emergency Leak & Shingle Repair</option>
                      <option>Commercial Flat Roofing (TPO/EPDM)</option>
                      <option>Certified 21-Point Drone Thermal Scan ($149)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-2">
                  <User className="size-4 text-amber-500" />
                  <span>2. Contact Details for Dispatch</span>
                </h3>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Johnathan Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-600 dark:shadow-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. (216) 555-0194"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-600 dark:shadow-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address (for Digital Estimate Report) *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. jmiller@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-600 dark:shadow-none"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Notes, Known Leaks, or Insurance Claim Info
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe any active leaks, attic moisture stains, or specific concerns..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-600 dark:shadow-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-4 px-6 text-sm font-bold text-slate-950 shadow-md transition hover:bg-amber-400 active:scale-[0.99] disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span>Submitting Estimate Request...</span>
                  ) : (
                    <>
                      <span>Submit Priority Estimate Request</span>
                      <Send className="size-4" />
                    </>
                  )}
                </button>

                <p className="mt-3 text-center text-[11px] text-slate-500 dark:text-slate-400">
                  🔒 No obligation · Itemized CAD takeoff · Zero pressure sales
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
