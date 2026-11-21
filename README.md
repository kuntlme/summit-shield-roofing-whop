# Summit Shield Roofing — Production Whop Website Template

A production-ready website template engineered for US residential and commercial roofing contractors, built natively on **Whop Websites** and deployed to live Whop hosting.

- **Live Production URL:** [https://apex-ridge-roofing-us.whop.site](https://apex-ridge-roofing-us.whop.site)
- **Whop Apps Origin:** [https://4e9yiir24mau3rjtrs36.apps.whop.com](https://4e9yiir24mau3rjtrs36.apps.whop.com)
- **Whop App ID:** `app_oiHPDFF1EQHGUw`
- **Whop Business Account:** `biz_ggSgnM5xMzcSv3`
- **Source Code Archive:** `summit-shield-roofing-whop-template.zip`

---

## 🌟 Whop Features Implemented (Submission Summary)

> **Submission Paragraph:**  
> This template implements the complete high-ticket roofing lifecycle natively on Whop: deployed as a high-performance server-rendered **Whop Website** (`apex-ridge-roofing-us.whop.site`) running on Cloudflare Workers; three real live plans configured on Whop (`plan_NxUGyP6ePxtiN` for $149 drone inspections, `plan_rrw2g4VrMy12U` for $500 project deposits, and `plan_gb0sZp9xho5MH` for $1,250 emergency flat-rate repairs); embedded **Whop Payment Elements** featuring `ExpressCheckoutElement` (Apple Pay / Google Pay), `PaymentElement` / `CheckoutElement` with automated Klarna and Splitit financing rails, and the mandatory `BrandingElement`; an interactive "Request an Estimate" intake form wired to the **Whop Leads API** (`POST /api/v1/events`); automated **Card-on-File** tokenization via **Whop Setup Intents** at deposit checkout; a Client Milestone Billing portal demonstrating post-job final balance settlement with auto-charge and digital invoice delivery; and client-side custom pixel tracking with `whop.track` firing verifiable `estimate_requested`, `service_viewed`, and `deposit_started` events.

---

## 🏗️ Architecture & Tech Stack

- **Framework:** TanStack Start + Vite 8 + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 with bespoke `/impeccable` Craft Floor standards (Slate Navy `#0F172A`, Safety Amber `#D97706`, Clean Stone `#F8FAFC`, themed selection, custom scrollbars, and 4.5:1 accessible contrast)
- **Icons:** `lucide-react`
- **Payments:** `@whop/elements` & `@whop/elements-react`
- **Hosting:** Cloudflare Workers via `@cloudflare/vite-plugin` and Whop CLI

---

## 📋 Real Whop Plans Configured

| Plan ID | Service Description | Price | Billing Type | Whop Variant ID |
|---|---|---|---|---|
| **Certified Inspection** | 21-Point Drone Thermal & Forensic Report | $149.00 USD | One-Time Assessment | `plan_NxUGyP6ePxtiN` |
| **Project Deposit** | Locks crew calendar, materials & Setup Intent card-on-file | $500.00 USD | Milestone Deposit | `plan_rrw2g4VrMy12U` |
| **Flat-Rate Repair** | Emergency Leak Mitigation & Storm Seal Package | $1,250.00 USD | Flat-Rate Service | `plan_gb0sZp9xho5MH` |

---

## 🎯 Custom Whop Pixel Tracking (`whop.track`)

1. `estimate_requested` — Fires when homeowner completes the multi-step estimate intake form, including lead ID, service type, and timestamp.
2. `service_viewed` — Fires when exploring any roofing discipline (Replacement, Flashing Repair, Commercial Flat TPO, Drone Inspection).
3. `deposit_started` — Fires whenever a customer initiates checkout on any plan or milestone deposit.
4. `purchase` — Fires upon successful test checkout with payment ID and setup intent ID.
5. `invoice_created` — Fires when a final balance invoice is generated via the Whop Invoices API.

---

## 🛠️ Local Development & Deployment

```bash
# 1. Install dependencies
pnpm install

# 2. Start local development server with Whop runtime bindings
whop apps dev

# 3. Type check & build
pnpm typecheck
pnpm build

# 4. Deploy live to production
whop apps deploy
```

---

## 🔄 Reusable Template Customization

To repurpose this template for another roofing contractor or home services company, simply edit [src/config/site.ts](file:///home/coderk/Documents/Playground/whop project/src/config/site.ts):
- `companyName`: Name of the roofing company
- `phone` & `emergencyPhone`: Phone numbers
- `serviceCounties`: Service territory
- `plans`: Replace Whop variant IDs and prices
- `credentials`: Contractor license and insurance numbers
