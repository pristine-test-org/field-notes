import { randomUUID } from 'node:crypto'
import type { H3Event } from 'h3'
import type { Entry, Role, SessionUser } from '../../shared/types'
import seed from '../data/seed.json'

export type { Entry, Role, SessionUser }

export interface Account {
  email: string
  password: string
  name: string
  role: Role
}

export const SESSION_COOKIE = 'field_notes_session'

// Everything lives in memory and resets when the server restarts.
const accounts: Account[] = seed.accounts as Account[]
const entries: Entry[] = structuredClone(seed.entries) as Entry[]
const saved = new Map<string, Set<string>>(
  Object.entries(seed.saved as Record<string, string[]>).map(([email, ids]) => [email, new Set(ids)]),
)
const sessions = new Map<string, string>()

export function findAccount(email: string, password: string): Account | undefined {
  const normalized = email.trim().toLowerCase()
  return accounts.find((a) => a.email === normalized && a.password === password)
}

export function createSession(account: Account): string {
  const token = randomUUID()
  sessions.set(token, account.email)
  return token
}

export function endSession(token: string | undefined) {
  if (token) sessions.delete(token)
}

export function sessionUser(event: H3Event): SessionUser | null {
  const token = getCookie(event, SESSION_COOKIE)
  const email = token ? sessions.get(token) : undefined
  const account = email ? accounts.find((a) => a.email === email) : undefined
  return account ? { email: account.email, name: account.name, role: account.role } : null
}

export function requireUser(event: H3Event, role?: Role): SessionUser {
  const user = sessionUser(event)
  if (!user) throw createError({ statusCode: 401, statusMessage: 'Sign in first' })
  if (role && user.role !== role) throw createError({ statusCode: 403, statusMessage: 'Editors only' })
  return user
}

export function allEntries(): Entry[] {
  return entries
}

export function findEntry(id: string): Entry | undefined {
  return entries.find((e) => e.id === id)
}

export function addEntry(input: Omit<Entry, 'id'>): Entry {
  const base = input.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48) || 'entry'
  let id = base
  for (let n = 2; findEntry(id); n++) id = `${base}-${n}`
  const entry = { id, ...input }
  entries.push(entry)
  return entry
}

export function savedIds(email: string): string[] {
  return [...(saved.get(email) ?? [])]
}

export function toggleSaved(email: string, entryId: string): boolean {
  const set = saved.get(email) ?? new Set<string>()
  saved.set(email, set)
  if (set.has(entryId)) {
    set.delete(entryId)
    return false
  }
  set.add(entryId)
  return true
}

/** Form posts get a redirect; fetch and curl callers asking for JSON get JSON. */
export function wantsRedirect(event: H3Event): boolean {
  const type = getRequestHeader(event, 'content-type') ?? ''
  const accept = getRequestHeader(event, 'accept') ?? ''
  return type.includes('application/x-www-form-urlencoded') && !accept.includes('application/json')
}

export function safeNext(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : fallback
}
