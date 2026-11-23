/**
 * BACKEND INTEGRATION POINT
 * -------------------------
 * This site currently runs as a static build. The functions below simulate a
 * network request and persist the payload in the browser so the demo is fully
 * interactive without a server.
 *
 * To wire up a real backend, replace the bodies with fetch calls, e.g.:
 *
 *   return fetch('/api/register', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify(data),
 *   }).then((r) => r.json())
 *
 * Suggested endpoints:
 *   POST /api/register          → membership registration
 *   POST /api/trainer-booking   → trainer session request
 *   POST /api/contact           → contact form
 */

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const makeRef = (prefix: string): string =>
  `${prefix}-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`

const push = (key: string, payload: Record<string, unknown>) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(key) || '[]')
    window.localStorage.setItem(key, JSON.stringify([...existing, { ...payload, at: new Date().toISOString() }]))
  } catch {
    /* storage unavailable — the request still "succeeds" for the demo */
  }
}

export interface RegistrationPayload {
  name: string
  email: string
  mobile: string
  age: string
  gender: string
  plan: string
  trainer: string
  schedule: string
  goals: string
  requirements: string
  ref?: string
}

export const submitRegistration = async (data: RegistrationPayload): Promise<{ ref: string }> => {
  await wait(1000)
  const ref = makeRef('FGE')
  push('forge-registrations', { ...data, ref })
  return { ref }
}

export interface BookingPayload {
  trainerId: string
  trainerName: string
  name: string
  mobile: string
  date: string
  time: string
  goal: string
}

export const submitTrainerBooking = async (data: BookingPayload): Promise<{ ref: string }> => {
  await wait(800)
  const ref = makeRef('TRN')
  push('forge-bookings', { ...data, ref })
  return { ref }
}

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export const submitContact = async (data: ContactPayload): Promise<{ ref: string }> => {
  await wait(900)
  const ref = makeRef('MSG')
  push('forge-messages', { ...data, ref })
  return { ref }
}
