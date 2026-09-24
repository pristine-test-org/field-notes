import { findEntry, requireUser, safeNext, toggleSaved, wantsRedirect } from '../utils/store'

export default defineEventHandler(async (event) => {
  const user = requireUser(event)
  const body = (await readBody<Record<string, unknown>>(event)) ?? {}
  const entryId = typeof body.entryId === 'string' ? body.entryId : ''
  if (!findEntry(entryId)) throw createError({ statusCode: 404, statusMessage: 'Entry not found' })
  const isSaved = toggleSaved(user.email, entryId)
  if (wantsRedirect(event)) return sendRedirect(event, safeNext(body.next, `/entries/${entryId}`), 303)
  return { entryId, saved: isSaved }
})
