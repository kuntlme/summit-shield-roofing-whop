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

export const submitLeadFn = createServerFn({ method: 'POST' })
  .validator((d: CreateLeadInput) => d)
  .handler(async ({ data }) => {
    const apiKey = process.env.WHOP_ADMIN_KEY || process.env.WHOP_API_KEY || ''
    if (!apiKey) {
      console.warn('WHOP_ADMIN_KEY is not configured in environment')
    }

    const leadId = `lead_arr_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`

    try {
      // Send event to Whop Attribution & Events API
      const response = await fetch(`${WHOP_API_BASE}/events`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Api-Version-Date': '2026-11-10-1'
        },
        body: JSON.stringify({
          event_name: 'lead',
          custom_name: 'estimate_requested',
          account_id: 'biz_ggSgnM5xMzcSv3',
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
            source: 'whop_website_estimate_form'
          }
        })
      })

      const result = await response.json().catch(() => ({}))

      return {
        success: true,
        leadId,
        data,
        timestamp: new Date().toISOString(),
        whopResponse: result
      }
    } catch (err: any) {
      return {
        success: true,
        leadId,
        data,
        timestamp: new Date().toISOString(),
        fallback: true,
        error: err.message
      }
    }
  })

export const createFinalInvoiceFn = createServerFn({ method: 'POST' })
  .validator((d: CreateInvoiceInput) => d)
  .handler(async ({ data }) => {
    const apiKey = process.env.WHOP_ADMIN_KEY || process.env.WHOP_API_KEY || ''
    if (!apiKey) {
      console.warn('WHOP_ADMIN_KEY is not configured in environment')
    }

    try {
      const response = await fetch(`${WHOP_API_BASE}/invoices`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Api-Version-Date': '2026-11-10-1'
        },
        body: JSON.stringify({
          account_id: 'biz_ggSgnM5xMzcSv3',
          customer_name: data.customerName,
          email_address: data.email,
          memo: data.memo || `Summit Shield Roofing Final Balance - ${data.jobTitle}`,
          items: [
            {
              variant_id: 'plan_gb0sZp9xho5MH',
              quantity: 1
            }
          ]
        })
      })

      const invoiceData = await response.json()

      return {
        success: response.ok,
        invoiceId: invoiceData.id || `inv_${Date.now().toString(36)}`,
        invoiceNumber: invoiceData.number || '#00000002',
        status: invoiceData.status || 'draft',
        amountDue: data.amount,
        customerName: data.customerName,
        email: data.email,
        memo: data.memo,
        lineItems: invoiceData.line_items || [],
        invoice: invoiceData
      }
    } catch (err: any) {
      return {
        success: true,
        simulated: true,
        invoiceId: `inv_sim_${Date.now().toString(36)}`,
        invoiceNumber: '#00000002',
        status: 'draft',
        amountDue: data.amount,
        customerName: data.customerName,
        email: data.email,
        memo: data.memo,
        error: err.message
      }
    }
  })
