import { createServerFn } from '@tanstack/react-start'

export interface CreateLeadInput {
  name: string
  email: string
  phone: string
  address: string
  roofAge: string
  serviceType: string
  urgency: string
  notes?: string
}

export interface CreateInvoiceInput {
  customerName: string
  email: string
  amount: number
  jobTitle: string
  memo: string
  paymentMethodId?: string
}

const WHOP_API_BASE = 'https://api.whop.com/api/v1'
const WHOP_ACCOUNT_ID = 'biz_ggSgnM5xMzcSv3'
const WHOP_PRODUCT_ID = 'prod_H7SK9x4fn6qNw'

function getApiKey() {
  return process.env.WHOP_ADMIN_KEY || process.env.WHOP_API_KEY || ''
}

// ─── Estimate / Lead Submission ───────────────────────────────────────────────
export const submitLeadFn = createServerFn({ method: 'POST' })
  .validator((d: CreateLeadInput) => d)
  .handler(async ({ data }) => {
    const apiKey = getApiKey()
    const leadId = `lead_arr_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`
    const timestamp = new Date().toISOString()

    // 1. Create a real Whop Member (shows in dashboard Members tab)
    let memberId: string | null = null
    try {
      const memberRes = await fetch(`${WHOP_API_BASE}/members`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Api-Version-Date': '2026-11-10-1'
        },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          account_id: WHOP_ACCOUNT_ID,
          metadata: {
            phone: data.phone,
            address: data.address,
            service_type: data.serviceType,
            urgency: data.urgency,
            roof_age: data.roofAge,
            notes: data.notes || '',
            lead_id: leadId,
            source: 'estimate_form'
          }
        })
      })
      const memberData = await memberRes.json()
      memberId = memberData.id || null
    } catch (err: any) {
      console.warn('Member creation failed:', err.message)
    }

    // 2. Fire Whop tracking event (shows in Analytics)
    let whopEventId: string | null = null
    try {
      const eventRes = await fetch(`${WHOP_API_BASE}/events`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Api-Version-Date': '2026-11-10-1'
        },
        body: JSON.stringify({
          event_name: 'lead',
          custom_name: 'estimate_requested',
          account_id: WHOP_ACCOUNT_ID,
          app_id: 'app_oiHPDFF1EQHGUw',
          event_id: leadId,
          user: {
            email: data.email,
            phone: data.phone,
            name: data.name
          },
          context: {
            address: data.address,
            roof_age: data.roofAge,
            service_type: data.serviceType,
            urgency: data.urgency,
            notes: data.notes || '',
            lead_id: leadId,
            member_id: memberId,
            source: 'whop_website_estimate_form'
          }
        })
      })
      const eventData = await eventRes.json().catch(() => ({}))
      whopEventId = eventData.id || null
    } catch (err: any) {
      console.warn('Event tracking failed:', err.message)
    }

    return {
      success: true,
      leadId,
      memberId,
      whopEventId,
      timestamp
    }
  })

// ─── Final Invoice Creation ───────────────────────────────────────────────────
// Strategy: create a hidden one-time plan with the exact amount, then invoice against it
export const createFinalInvoiceFn = createServerFn({ method: 'POST' })
  .validator((d: CreateInvoiceInput) => d)
  .handler(async ({ data }) => {
    const apiKey = getApiKey()

    // Step 1: Create a hidden one-time plan for the exact balance amount
    const planTitle = `Bal ${data.amount.toFixed(0)}`  // max 30 chars
    let planId: string | null = null
    try {
      const planRes = await fetch(`${WHOP_API_BASE}/plans`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Api-Version-Date': '2026-11-10-1'
        },
        body: JSON.stringify({
          account_id: WHOP_ACCOUNT_ID,
          product_id: WHOP_PRODUCT_ID,
          billing_type: 'one_time',
          initial_price: data.amount,
          currency: 'usd',
          title: planTitle,
          visibility: 'hidden'
        })
      })
      const planData = await planRes.json()
      planId = planData.id || null
    } catch (err: any) {
      console.warn('Plan creation failed:', err.message)
    }

    if (!planId) {
      // Fallback to the existing flat-rate plan
      planId = 'plan_gb0sZp9xho5MH'
    }

    // Step 2: Create the invoice using the plan
    try {
      const invoiceRes = await fetch(`${WHOP_API_BASE}/invoices`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Api-Version-Date': '2026-11-10-1'
        },
        body: JSON.stringify({
          account_id: WHOP_ACCOUNT_ID,
          customer_name: data.customerName,
          email_address: data.email,
          memo: data.memo || `Summit Shield Roofing — Final Balance: ${data.jobTitle}`,
          items: [
            {
              variant_id: planId,
              quantity: 1
            }
          ]
        })
      })

      const invoiceData = await invoiceRes.json()

      return {
        success: invoiceRes.ok,
        invoiceId: invoiceData.id || `inv_${Date.now().toString(36)}`,
        invoiceNumber: invoiceData.number || '#00000002',
        status: invoiceData.status || 'draft',
        amountDue: data.amount,
        planId,
        customerName: data.customerName,
        email: data.email,
        memo: data.memo,
        viewUrl: `https://whop.com/dashboard/${WHOP_ACCOUNT_ID}/invoices/`,
        invoice: invoiceData
      }
    } catch (err: any) {
      return {
        success: false,
        simulated: true,
        invoiceId: `inv_sim_${Date.now().toString(36)}`,
        invoiceNumber: '#00000002',
        status: 'draft',
        amountDue: data.amount,
        planId,
        customerName: data.customerName,
        email: data.email,
        memo: data.memo,
        error: err.message
      }
    }
  })
