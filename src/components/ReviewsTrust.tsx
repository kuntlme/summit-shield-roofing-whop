import { Star } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

export function ReviewsTrust() {
  return (
    <section id="reviews" className="relative bg-slate-50 py-20 sm:py-28 border-t border-slate-200 dark:bg-slate-950 dark:border-slate-800 transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500">
            Homeowner & Commercial Trust
          </span>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
            Verified Craftsmanship & 5-Star Reviews
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400">
            Over 3,800 roofing systems installed with a 99.4% customer satisfaction score across 14 consecutive years.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {SITE_CONFIG.testimonials.map((test, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/60"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm leading-relaxed text-slate-700 italic dark:text-slate-200">
                  "{test.review}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{test.author}</h4>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">{test.location}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{test.date}</span>
                </div>
                <div className="mt-2 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                  {test.project}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4 items-center justify-center text-center">
            <div className="p-3">
              <span className="block text-xl font-extrabold text-slate-900 dark:text-slate-100">GAF</span>
              <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">Master Elite® Certified</span>
            </div>
            <div className="p-3">
              <span className="block text-xl font-extrabold text-slate-900 dark:text-slate-100">BBB A+</span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">14 Consecutive Years</span>
            </div>
            <div className="p-3">
              <span className="block text-xl font-extrabold text-slate-900 dark:text-slate-100">$5M Liability</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Fully Insured & Bonded</span>
            </div>
            <div className="p-3">
              <span className="block text-xl font-extrabold text-slate-900 dark:text-slate-100">50-Year</span>
              <span className="text-xs text-amber-700 dark:text-amber-400 font-semibold">Transferable Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
