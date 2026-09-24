import { findEntry, requireUser, savedIds, type Entry } from '../utils/store'

export default defineEventHandler((event) => {
  const user = requireUser(event)
  return savedIds(user.email)
    .map((id) => findEntry(id))
    .filter((e): e is Entry => Boolean(e))
})
