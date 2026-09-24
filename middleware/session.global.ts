// Loads the session on every navigation and keeps /admin/** for editors.
export default defineNuxtRouteMiddleware(async (to) => {
  const { user, load } = useSession()
  await load()

  if (!to.path.startsWith('/admin')) return
  if (!user.value) return navigateTo({ path: '/login', query: { next: to.fullPath } })
  if (user.value.role !== 'editor') return navigateTo({ path: '/entries', query: { denied: '1' } })
})
