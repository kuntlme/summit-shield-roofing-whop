export interface TrackedEventRecord {
  id: string
  name: string
  payload?: Record<string, any>
  timestamp: string
}

type EventListener = (events: TrackedEventRecord[]) => void
const listeners: Set<EventListener> = new Set()
const eventHistory: TrackedEventRecord[] = []

export function subscribeToEvents(listener: EventListener) {
  listeners.add(listener)
  listener([...eventHistory])
  return () => {
    listeners.delete(listener)
  }
}

export function firePixelEvent(name: string, payload?: Record<string, any>) {
  const record: TrackedEventRecord = {
    id: `ev_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 5)}`,
    name,
    payload,
    timestamp: new Date().toLocaleTimeString()
  }

  eventHistory.unshift(record)
  if (eventHistory.length > 50) eventHistory.pop()

  listeners.forEach((fn) => fn([...eventHistory]))

  if (typeof window !== 'undefined') {
    // 1. Call official Whop pixel if present on window
    const whop = (window as any).whop
    if (whop && typeof whop.track === 'function') {
      try {
        whop.track(name, payload)
        console.log(`[Whop Pixel] Tracked event "${name}":`, payload)
      } catch (e) {
        console.warn('[Whop Pixel] Error tracking event:', e)
      }
    } else {
      console.log(`[Whop Pixel Simulated] "${name}":`, payload)
    }

    // 2. Dispatch a custom browser DOM event for interactive UI hooks
    window.dispatchEvent(
      new CustomEvent('whop:pixel:event', {
        detail: record
      })
    )
  }

  return record
}
