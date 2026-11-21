import { useState, useEffect } from 'react'
import { Phone, Menu, X, ArrowRight, MapPin, CreditCard, Sun, Moon } from 'lucide-react'
import { SITE_CONFIG } from '../config/site'

interface NavbarProps {
  onOpenEstimate: () => void
  onOpenCheckout: (planId?: string) => void
}

export function Navbar({ onOpenEstimate, onOpenCheckout }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Read stored theme preference or root state
    const stored = typeof window !== 'undefined' ? localStorage.getItem('whop_roofing_theme') : null
    if (stored) {
      const isDarkTheme = stored === 'dark'
      setIsDark(isDarkTheme)
      if (isDarkTheme) {
        document.documentElement.classList.add('dark')
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        document.documentElement.setAttribute('data-theme', 'light')
      }
    } else if (typeof document !== 'undefined') {
      const isCurrentlyDark = document.documentElement.classList.contains('dark')
      setIsDark(isCurrentlyDark)
      document.documentElement.setAttribute('data-theme', isCurrentlyDark ? 'dark' : 'light')
    }
  }, [])

  const toggleTheme = () => {
    const nextIsDark = !isDark
    setIsDark(nextIsDark)
    if (nextIsDark) {
      document.documentElement.classList.add('dark')
      document.documentElement.setAttribute('data-theme', 'dark')
      try {
        localStorage.setItem('whop_roofing_theme', 'dark')
      } catch (e) {}
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.setAttribute('data-theme', 'light')
      try {
        localStorage.setItem('whop_roofing_theme', 'light')
      } catch (e) {}
    }
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md transition-colors duration-200 dark:border-slate-800 dark:bg-slate-950/90">
      {/* Top emergency announcement bar */}
      <div className="bg-amber-600 px-4 py-1.5 text-xs font-semibold text-slate-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block size-2 animate-ping rounded-full bg-slate-950" />
            <span>24/7 Storm Damage & Rapid Emergency Response Dispatch</span>
          </div>
          <div className="hidden items-center gap-4 sm:flex">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="size-3.5" />
              <span>{SITE_CONFIG.serviceArea}</span>
            </span>
            <a
              href={`tel:${SITE_CONFIG.emergencyPhone.replace(/[^0-9]/g, '')}`}
              className="flex items-center gap-1.5 rounded bg-slate-950 px-2.5 py-0.5 font-bold text-amber-300 transition hover:bg-slate-900"
            >
              <Phone className="size-3 text-amber-400" />
              <span>Emergency: {SITE_CONFIG.emergencyPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand identity */}
        <a href="#hero" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 mr-3 xl:mr-6">
          <div className="flex size-10 items-center justify-center rounded-lg bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition group-hover:bg-amber-400 shrink-0">
            <svg
              className="size-6"
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
          <div className="shrink-0">
            <span className="block text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-xl leading-tight whitespace-nowrap">
              {SITE_CONFIG.companyName}
            </span>
            <span className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400 leading-tight whitespace-nowrap">
              GAF Master Elite® Contractor
            </span>
          </div>
        </a>

        {/* Desktop navigation links - concise names & generous spacing, never colliding */}
        <div className="hidden items-center gap-4 xl:flex 2xl:gap-6 text-xs xl:text-sm font-semibold text-slate-700 dark:text-slate-300">
          <a
            href="#services"
            className="transition hover:text-amber-600 dark:hover:text-amber-400 whitespace-nowrap"
          >
            Services
          </a>
          <a
            href="#workflow"
            className="transition hover:text-amber-600 dark:hover:text-amber-400 whitespace-nowrap"
          >
            Workflow
          </a>
          <a
            href="#pricing"
            className="transition hover:text-amber-600 dark:hover:text-amber-400 whitespace-nowrap"
          >
            Plans
          </a>
          <a
            href="#financing"
            className="transition hover:text-amber-600 dark:hover:text-amber-400 whitespace-nowrap"
          >
            Financing
          </a>
          <a
            href="#invoicing"
            className="transition hover:text-amber-600 dark:hover:text-amber-400 whitespace-nowrap"
          >
            Milestones
          </a>
          <a
            href="#reviews"
            className="transition hover:text-amber-600 dark:hover:text-amber-400 whitespace-nowrap"
          >
            Reviews
          </a>
        </div>

        {/* Action CTAs & Icon Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Theme Toggle Icon-Only Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex size-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-sm transition hover:border-amber-500 hover:text-amber-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-300 dark:hover:border-amber-500 dark:hover:text-amber-400"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="size-4 text-amber-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="size-4 text-slate-700 transition-transform hover:-rotate-12" />
            )}
          </button>

          {/* Pay Deposit CTA */}
          <button
            type="button"
            onClick={() => onOpenCheckout('plan_rrw2g4VrMy12U')}
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-amber-500 hover:text-amber-600 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-amber-500 dark:hover:text-amber-400 whitespace-nowrap"
          >
            <CreditCard className="size-3.5 text-amber-500" />
            <span>Pay Deposit ($500)</span>
          </button>

          {/* Request Estimate CTA */}
          <button
            type="button"
            onClick={onOpenEstimate}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-slate-950 shadow-sm transition hover:bg-amber-400 active:scale-[0.98] whitespace-nowrap"
          >
            <span>Request Estimate</span>
            <ArrowRight className="size-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex xl:hidden rounded-lg border border-slate-300 bg-white p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-5 xl:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-3">
            {/* Mobile theme toggle row */}
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-800 dark:bg-slate-900/60">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Theme</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800 hover:border-amber-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                {isDark ? (
                  <>
                    <Sun className="size-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="size-3.5 text-slate-700" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>

            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Services
            </a>
            <a
              href="#workflow"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Deposit & Job Workflow
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Plans & Pricing
            </a>
            <a
              href="#financing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Financing (Klarna & Splitit)
            </a>
            <a
              href="#invoicing"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Milestone Settlement
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Reviews & Warranties
            </a>

            <div className="mt-3 flex flex-col gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenCheckout('plan_rrw2g4VrMy12U')
                }}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 py-2.5 text-xs font-semibold text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              >
                <CreditCard className="size-4 text-amber-500" />
                <span>Reserve Project Deposit ($500)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenEstimate()
                }}
                className="flex items-center justify-center gap-2 rounded-lg bg-amber-500 py-2.5 text-xs font-bold text-slate-950"
              >
                <span>Request Free Estimate</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
