import type { SessionUser } from '~~/shared/types'

/** The signed-in user, read once per request by the global route middleware. */
export function useSession() {
  const user = useState<SessionUser | null>('session-user', () => null)
  const loaded = useState<boolean>('session-loaded', () => false)

  async function load() {
    if (loaded.value) return
    const { user: current } = await useRequestFetch()<{ user: SessionUser | null }>('/api/me')
    user.value = current
    loaded.value = true
  }

  return {
    user,
    load,
    isEditor: computed(() => user.value?.role === 'editor'),
    isReader: computed(() => user.value?.role === 'reader'),
  }
}
