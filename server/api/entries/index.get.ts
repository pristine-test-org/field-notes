import { allEntries, type Entry } from '../../utils/store'

// Newest first; entries from the same day fall back to title order so the
// list is stable. The list page and the map both read this order.
function byNewest(a: Entry, b: Entry): number {
  return b.date.localeCompare(a.date) || a.title.localeCompare(b.title)
}

export default defineEventHandler((event) => {
  const { tag } = getQuery(event)
  const wanted = typeof tag === 'string' ? tag.trim().toLowerCase() : ''
  const list = wanted ? allEntries().filter((e) => e.tags.some((t) => t.toLowerCase() === wanted)) : allEntries()
  return [...list].sort(byNewest)
})
