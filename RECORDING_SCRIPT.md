# 3–5 Minute Screen Recording Guide & Walkthrough Script

Use this step-by-step recording guide to record your 3–5 minute submission video showing the live template, test checkout, lead creation, final invoice billing, and pixel events.

---

### Minute 0:00 – 0:45 | Introduction & Live Site Overview
1. **Show the Browser URL Bar:** Open [https://apex-ridge-roofing-us.whop.site](https://apex-ridge-roofing-us.whop.site).
2. **Introduce the Template:**
   > *"This is Summit Shield Roofing, a production-ready website template engineered for US roofing contractors and deployed live to a whop.site address on Whop Websites."*
3. **Show Site Sections:**
   - Scroll through the **Hero** with GAF Master Elite credentials and instant CTAs.
   - Click on the **Services** section tabs (e.g., *Full Roof Replacement*, *Precision Flashing Repair*, *Commercial Flat TPO*, *Drone Thermal Inspection*).
   - Point out that clicking each service fires the `service_viewed` pixel event.
   - Highlight the **Regional Service Area** zip-code checker (type `44101` and show immediate primary zone verification).

---

### Minute 0:45 – 1:45 | Plans & Completed Test Checkout with Payment Elements
1. **Navigate to the Plans & Deposits Section:**
   - Show the 3 real Whop plans:
     - **$149.00** Drone & Roof Inspection (`plan_NxUGyP6ePxtiN`)
     - **$500.00** Project Reservation Deposit (`plan_rrw2g4VrMy12U`)
     - **$1,250.00** Emergency Leak & Seal Repair (`plan_gb0sZp9xho5MH`)
2. **Trigger Deposit Checkout:**
   - Click **"Lock In Project Deposit ($500)"** or **"Pay Deposit on Whop"**.
   - Show the **Whop Payment Elements Modal**:
     - Point out **`ExpressCheckoutElement`** (Apple Pay and Google Pay buttons).
     - Point out **`CheckoutElement` / `PaymentElement`** with tokenized card entry and financing notes (Klarna, Splitit, Affirm).
     - Point out the mandatory **`BrandingElement`** ("Powered by whop").
3. **Complete the Test Checkout:**
   - Click **"Pay with Apple Pay"** or **"Complete Checkout"**.
   - Show the instant success receipt displaying:
     - **Transaction ID** (`pay_...`)
     - **Card-on-File Setup Intent** (`seti_...`)
     - **Amount** ($500.00 USD)
     - The pixel console will log `deposit_started` and `purchase`.

---

### Minute 1:45 – 2:45 | "Request an Estimate" Form & Whop Leads API
1. **Navigate to the Estimate Intake Form (`#estimate`):**
2. **Fill in Homeowner Parameters:**
   - Address: `742 Evergreen Terrace, Cleveland, OH 44101`
   - Roof Age: `15 - 20 years`
   - Service: `Full Roof Replacement (Architectural)`
   - Name: `Johnathan Miller`
   - Phone: `(216) 555-0194`
   - Email: `jmiller@example.com`
   - Notes: `Recent storm caused shingles to blow off near the chimney.`
3. **Submit the Form:**
   - Click **"Transmit Priority Estimate Request"**.
   - Show the green confirmation badge with the **Confirmation Reference** (`lead_arr_...` or Whop Lead ID) logged directly into the account.
   - Point out that the `estimate_requested` custom pixel event fires automatically in the background.

---

### Minute 2:45 – 3:45 | Card-on-File & Final Balance Milestone Settlement
1. **Navigate to the Milestone Billing Section (`#invoicing`):**
2. **Explain the High-Ticket Flow:**
   > *"Roofing is a high-ticket vertical. Once the $500 reservation deposit is placed and the payment method is securely saved on file via Whop, the crew executes the build. Here is how our portal seamlessly settles the final milestone balance upon 35-point superintendent inspection."*
3. **Show Balance Calculation:**
   - Total Contract: **$5,000** (or toggle Full Architectural $14,850)
   - Deposit Credited: **-$500**
   - Final Balance Due: **$4,500**
4. **Settle the Milestone:**
   - Choose **"Auto-Charge Stored Card"** or **"Send Digital Invoice"**.
   - Click **"Settle Remaining Balance ($4,500)"**.
   - Show the generated live Whop Invoice receipt with **Invoice Number**, **Invoice Reference**, customer breakdown, and 50-year warranty activation confirmation.

---

### Minute 3:45 – 4:30 | Pixel Tracking Verification & Wrap Up
1. **Explain the Whop Pixel Tracking Events:**
   - Point out that all three required custom pixel events are active and fire via `whop.track`:
     - `estimate_requested` (fired on quote submission)
     - `service_viewed` (fired on service inspection and navigation)
     - `deposit_started` (fired when selecting inspection or deposit checkout)
   - Highlight that Whop automatic pageview and checkout events track natively on whop.site.
2. **Conclusion:**
   - Reiterate that the entire site is deployed live on Whop Websites at `https://apex-ridge-roofing-us.whop.site`, uses Whop Payments exclusively with no custom card forms, and provides an end-to-end commercial roofing template ready to pitch real businesses.
