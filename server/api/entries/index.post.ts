import { addEntry, requireUser, wantsRedirect } from '../../utils/store'

export default defineEventHandler(async (event) => {
  const user = requireUser(event, 'editor')
  const body = (await readBody<Record<string, unknown>>(event)) ?? {}
  const text = (key: string) => (typeof body[key] === 'string' ? (body[key] as string).trim() : '')

  const title = text('title')
  const place = text('place')
  if (!title || !place) {
    if (wantsRedirect(event)) return sendRedirect(event, '/admin/entries/new?error=missing', 303)
    throw createError({ statusCode: 400, statusMessage: 'Title and place are required' })
  }

  const entry = addEntry({
    title,
    place,
    date: text('date') || new Date().toISOString().slice(0, 10),
    lat: Number(body.lat) || 0,
    lng: Number(body.lng) || 0,
    weather: text('weather'),
    tags: text('tags')
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean),
    author: user.name,
    summary: text('summary'),
    body: text('body')
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean),
  })

  if (wantsRedirect(event)) return sendRedirect(event, `/entries/${entry.id}`, 303)
  setResponseStatus(event, 201)
  return entry
})
