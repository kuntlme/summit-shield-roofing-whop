import { Phone, Mail, MapPin } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

export function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-800 bg-slate-950 text-slate-400">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand & Overview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500 text-slate-950">
                <svg
                  className="size-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m3 12 9-9 9 9" />
                  <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" />
                  <path d="m9 21 3-5 3 5" />
                </svg>
              </div>
              <span className="text-xl font-extrabold text-slate-100 tracking-tight">
                {SITE_CONFIG.companyName}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Commercial & architectural roofing installations engineered to survive high-wind, heavy snow, and hail events. Factory-certified GAF Master Elite® contractor.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div>State Master Contractor License #GC-884920</div>
              <div>GAF Master Elite Certification #ME-99120</div>
              <div>$5,000,000 Commercial General Liability Policy #NY-CGL-449102</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Services & Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-amber-400 transition">Architectural Replacement</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition">Emergency Leak Mitigation</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition">Commercial Flat Roofing (TPO/EPDM)</a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition">21-Point Drone Inspections</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-amber-400 transition">Plans & Project Deposits</a>
              </li>
              <li>
                <a href="#financing" className="hover:text-amber-400 transition">0% APR Financing (Klarna/Splitit)</a>
              </li>
              <li>
                <a href="#invoicing" className="hover:text-amber-400 transition">Milestone Billing Portal</a>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Dispatch */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Direct Contact & Dispatch
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={SITE_CONFIG.phoneRaw}
                className="flex items-center gap-2.5 text-slate-300 hover:text-amber-400 transition"
              >
                <Phone className="size-4 text-amber-500 shrink-0" />
                <span>Standard Dispatch: {SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.emergencyPhone.replace(/[^0-9]/g, '')}`}
                className="flex items-center gap-2.5 text-amber-400 font-bold hover:text-amber-300 transition"
              >
                <Phone className="size-4 text-amber-500 shrink-0" />
                <span>24/7 Emergency Line: {SITE_CONFIG.emergencyPhone}</span>
              </a>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="size-4 text-amber-500 shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="size-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.serviceArea}</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-slate-800/80 bg-slate-900/60 p-3 text-[11px] text-slate-400">
              Encrypted 256-bit SSL payments. Klarna, Splitit, Apple Pay, Google Pay, and all major cards accepted.
            </div>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/80 pt-8 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {SITE_CONFIG.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Licensed & Insured · 256-Bit SSL Encrypted Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
