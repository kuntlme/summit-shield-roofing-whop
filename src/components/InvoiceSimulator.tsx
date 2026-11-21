import { useState } from 'react'
import { CheckCircle2, AlertCircle, ShieldCheck, CreditCard, RefreshCw, FileCheck2, Lock } from 'lucide-react'
import { createFinalInvoiceFn } from '../server/whop'

export function InvoiceSimulator() {
  const [customerName, setCustomerName] = useState('Sarah Jenkins')
  const [email, setEmail] = useState('s.jenkins@example.com')
  const [totalJobAmount, setTotalJobAmount] = useState(5000)
  const [depositPaid] = useState(500)
  const balanceDue = totalJobAmount - depositPaid
  const [collectionMethod, setCollectionMethod] = useState<'auto_charge' | 'send_invoice'>('auto_charge')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [invoiceResult, setInvoiceResult] = useState<any>(null)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSimulateInvoice = async () => {
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await createFinalInvoiceFn({
        data: {
          customerName,
          email,
          amount: balanceDue,
          jobTitle: totalJobAmount === 5000 ? 'Standard Residential Roof Replacement - Final Milestone' : 'Architectural Roof Replacement - Final Milestone Balance',
          memo: `Balance of $${balanceDue} after deducting $${depositPaid} project deposit.`
        }
      })

      setInvoiceResult(res)
      setStatus('success')
    } catch (err: any) {
      console.error('Invoice creation error:', err)
      setStatus('error')
      setErrorMessage(err.message || 'Failed to generate milestone invoice.')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setInvoiceResult(null)
    setErrorMessage('')
  }

  return (
    <section id="invoicing" className="relative bg-white py-20 sm:py-28 border-t border-slate-200 dark:bg-slate-900 dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Explainer: Client-Centric Milestone Settlement */}
          <div className="lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500">
              Transparent Milestone Billing
            </span>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
              Pay Only When Work is Inspected & Complete
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
              We never demand high-ticket sums upfront. Your project is locked with a standard $500 reservation deposit, and your remaining balance is only billed after our senior superintendent walks the completed build with you and issues full warranty certification.
            </p>

            <div className="mt-6 space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
                  1
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">$500 Project Reservation Deposit</strong>
                  <p className="mt-0.5 text-slate-500 dark:text-slate-400">Locks your senior crew calendar and pre-orders manufacturer materials; payment method stored via bank-grade tokenization.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs">
                  2
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">35-Point Superintendent Sign-Off</strong>
                  <p className="mt-0.5 text-slate-500 dark:text-slate-400">Complete attic, flashing, and magnetic ground sweep inspection conducted with the homeowner.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  3
                </div>
                <div>
                  <strong className="text-slate-900 dark:text-slate-100">Final Milestone Settlement</strong>
                  <p className="mt-0.5 text-slate-500 dark:text-slate-400">Settle balance seamlessly via stored card-on-file or choose digital invoice with 0% APR financing through Klarna and Splitit.</p>
                </div>
              </div>
            </div>

            {/* Homeowner Security Guarantee Card */}
            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-xs dark:border-slate-800 dark:bg-slate-950/80">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-slate-100 font-bold pb-2.5 border-b border-slate-200 dark:border-slate-800">
                <Lock className="size-4 text-amber-500" />
                <span>Homeowner Financial Protection</span>
              </div>
              <div className="mt-3 space-y-2 text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="size-4 text-emerald-500 shrink-0" />
                  <span>256-bit bank encryption with PCI Level 1 compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileCheck2 className="size-4 text-emerald-500 shrink-0" />
                  <span>50-year non-prorated GAF warranty dispatched upon settlement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Client Milestone Settlement Portal Card */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950 dark:shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Client Milestone Settlement Portal
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                  Verified Secure Settlement
                </span>
              </div>

              {status === 'success' && invoiceResult ? (
                /* Success View: Client Receipt */
                <div className="mt-6 space-y-5">
                  <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-center dark:border-emerald-500/30 dark:bg-emerald-500/10">
                    <CheckCircle2 className="mx-auto size-8 text-emerald-600 dark:text-emerald-400" />
                    <h4 className="mt-2 text-lg font-bold text-slate-900 dark:text-slate-100">
                      Milestone Invoice Created & Ready
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      Invoice Reference: {invoiceResult.invoiceId}
                    </p>
                  </div>

                  {/* Itemized Invoice Receipt */}
                  <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 font-mono text-xs space-y-2.5 text-slate-200">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Invoice Number</span>
                      <span className="text-amber-400 font-bold">{invoiceResult.invoiceNumber}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Client / Property Owner</span>
                      <span className="text-slate-200">{invoiceResult.customerName} ({invoiceResult.email})</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Total Contract Value</span>
                      <span className="text-slate-300">${totalJobAmount.toLocaleString()}.00 USD</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">Deposit Credited</span>
                      <span className="text-emerald-400">-${depositPaid.toLocaleString()}.00 USD</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-800 pb-2 text-sm font-bold">
                      <span className="text-slate-200">Final Balance Settled</span>
                      <span className="text-amber-400">${balanceDue.toLocaleString()}.00 USD</span>
                    </div>
                    <div className="flex justify-between pt-1 text-[11px] text-emerald-400">
                      <span>Warranty Status</span>
                      <span>50-Year System Warranty Activated</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a
                      href="https://whop.com/dashboard/biz_ggSgnM5xMzcSv3/invoices/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-5 py-2.5 text-xs font-bold text-white transition shadow-sm"
                    >
                      <FileCheck2 className="size-3.5" />
                      <span>View Invoice in Dashboard →</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-bold text-slate-800 hover:bg-slate-50 transition shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      <RefreshCw className="size-3.5" />
                      <span>Create Another Invoice</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Client Billing Form */
                <div className="mt-6 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">
                        Homeowner Name
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:shadow-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400 mb-1">
                        Homeowner Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 shadow-sm focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:shadow-none"
                      />
                    </div>
                  </div>

                  {/* Project Scope Selection */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400">
                      Scope of Completed Work
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setTotalJobAmount(5000)}
                        className={`rounded-xl border p-2.5 text-left transition ${
                          totalJobAmount === 5000
                            ? 'border-amber-500 bg-amber-50 dark:bg-slate-900 text-amber-900 dark:text-amber-300 font-bold'
                            : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <span className="block font-bold">Standard Roof ($5,000)</span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400">$500 deposit paid → $4,500 due</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setTotalJobAmount(14850)}
                        className={`rounded-xl border p-2.5 text-left transition ${
                          totalJobAmount === 14850
                            ? 'border-amber-500 bg-amber-50 dark:bg-slate-900 text-amber-900 dark:text-amber-300 font-bold'
                            : 'border-slate-200 bg-white text-slate-600 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400 hover:border-slate-300'
                        }`}
                      >
                        <span className="block font-bold">Full Architectural ($14,850)</span>
                        <span className="block text-[10px] text-slate-500 dark:text-slate-400">$500 deposit paid → $14,350 due</span>
                      </button>
                    </div>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none">
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400">Total Contract</span>
                      <span className="block mt-1 text-base font-bold text-slate-900 dark:text-slate-200">
                        ${totalJobAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="rounded-xl border border-slate-200 bg-white p-3.5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 dark:shadow-none">
                      <span className="block text-[11px] text-slate-500 dark:text-slate-400">Deposit Credited</span>
                      <span className="block mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
                        -${depositPaid.toLocaleString()}
                      </span>
                    </div>
                    <div className="rounded-xl border border-amber-300 bg-amber-50 p-3.5 shadow-sm dark:border-amber-500/40 dark:bg-amber-950/20 dark:shadow-none">
                      <span className="block text-[11px] text-amber-800 dark:text-amber-300 font-semibold">Final Balance Due</span>
                      <span className="block mt-1 text-base font-black text-amber-700 dark:text-amber-400">
                        ${balanceDue.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Settlement Preference */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-400">
                      Settlement Preference
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setCollectionMethod('auto_charge')}
                        className={`rounded-xl border p-3 text-left transition ${
                          collectionMethod === 'auto_charge'
                            ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold dark:bg-slate-900 dark:text-amber-300'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="block text-xs font-bold">Auto-Charge Stored Card</span>
                        <span className="block mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                          Securely charged to tokenized method from deposit
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setCollectionMethod('send_invoice')}
                        className={`rounded-xl border p-3 text-left transition ${
                          collectionMethod === 'send_invoice'
                            ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold dark:bg-slate-900 dark:text-amber-300'
                            : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="block text-xs font-bold">Send Digital Invoice</span>
                        <span className="block mt-0.5 text-[10px] text-slate-500 dark:text-slate-400">
                          Email itemized invoice with 0% APR financing options
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Trigger Button */}
                  <button
                    type="button"
                    onClick={handleSimulateInvoice}
                    disabled={status === 'loading'}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 px-4 text-xs font-bold text-slate-950 transition hover:bg-amber-400 active:scale-[0.99] disabled:opacity-50 shadow-md shadow-amber-500/20"
                  >
                    {status === 'loading' ? (
                      <span>Processing Final Milestone Settlement...</span>
                    ) : (
                      <>
                        <CreditCard className="size-4" />
                        <span>
                          {collectionMethod === 'auto_charge'
                            ? `Settle Remaining Balance ($${balanceDue.toLocaleString()})`
                            : `Generate Final Milestone Invoice ($${balanceDue.toLocaleString()})`}
                        </span>
                      </>
                    )}
                  </button>

                  {errorMessage && (
                    <div className="flex items-center gap-2 rounded-lg border border-red-300 bg-red-50 p-3 text-xs text-red-800 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                      <AlertCircle className="size-4 shrink-0 text-red-500 dark:text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
