import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { SITE_CONFIG } from '../config/site'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      {
        title: `${SITE_CONFIG.companyName} | GAF Master Elite® Roofing Contractor`,
      },
      {
        name: 'description',
        content:
          'Commercial and residential architectural roofing contractor. 21-point drone thermal inspections, $500 milestone deposits, and flexible financing with zero penalty early payoff.',
      },
      {
        property: 'og:title',
        content: `${SITE_CONFIG.companyName} | High-Ticket Roofing Done Right`,
      },
      {
        property: 'og:description',
        content:
          'From drone thermal scans to transparent milestone deposits and flexible final balance billing.',
      },
      {
        name: 'theme-color',
        content: '#020617',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'preconnect',
        href: 'https://content.whop.com',
      },
      {
        rel: 'preconnect',
        href: 'https://api.whop.com',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <HeadContent />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('whop_roofing_theme');var isLight=t==='light'||(!t&&window.matchMedia('(prefers-color-scheme: light)').matches);if(isLight){document.documentElement.classList.remove('dark');document.documentElement.setAttribute('data-theme','light');}else{document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
