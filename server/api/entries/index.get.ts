import { allEntries } from '../../utils/store'

// Newest first. The list page and the map both read this order.
export default defineEventHandler((event) => {
  const { tag } = getQuery(event)
  const list = typeof tag === 'string' && tag ? allEntries().filter((e) => e.tags.includes(tag)) : allEntries()
  return [...list].sort((a, b) => b.date.localeCompare(a.date))
})
