import { SESSION_COOKIE, createSession, findAccount, safeNext, wantsRedirect } from '../utils/store'

export default defineEventHandler(async (event) => {
  const body = (await readBody<Record<string, unknown>>(event)) ?? {}
  const email = typeof body.email === 'string' ? body.email : ''
  const password = typeof body.password === 'string' ? body.password : ''
  const account = findAccount(email, password)
  const redirect = wantsRedirect(event)

  if (!account) {
    if (redirect) return sendRedirect(event, '/login?error=1', 303)
    throw createError({ statusCode: 401, statusMessage: 'Email or password is wrong' })
  }

  setCookie(event, SESSION_COOKIE, createSession(account), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })

  const fallback = account.role === 'editor' ? '/admin' : '/entries'
  const next = safeNext(body.next, fallback)
  if (redirect) return sendRedirect(event, next, 303)
  return { user: { email: account.email, name: account.name, role: account.role }, next }
})
