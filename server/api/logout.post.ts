import { SESSION_COOKIE, endSession, wantsRedirect } from '../utils/store'

export default defineEventHandler((event) => {
  endSession(getCookie(event, SESSION_COOKIE))
  deleteCookie(event, SESSION_COOKIE, { path: '/' })
  if (wantsRedirect(event)) return sendRedirect(event, '/', 303)
  return { ok: true }
})
