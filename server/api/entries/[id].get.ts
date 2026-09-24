import { findEntry } from '../../utils/store'

export default defineEventHandler((event) => {
  const entry = findEntry(getRouterParam(event, 'id') ?? '')
  if (!entry) throw createError({ statusCode: 404, statusMessage: 'Entry not found' })
  return entry
})
