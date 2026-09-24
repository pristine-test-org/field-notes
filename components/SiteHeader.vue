<script setup lang="ts">
const { user, isEditor } = useSession()
const route = useRoute()

const links = computed(() => [
  { to: '/entries', label: 'Entries' },
  { to: '/map', label: 'Map' },
  { to: '/about', label: 'About' },
  ...(isEditor.value ? [{ to: '/admin', label: 'Editor desk' }] : []),
])

const isActive = (to: string) => route.path === to || route.path.startsWith(`${to}/`)
</script>

<template>
  <header class="header">
    <div class="inner">
      <NuxtLink to="/" class="brand">
        <svg class="mark" viewBox="0 0 32 32" aria-hidden="true">
          <rect width="32" height="32" rx="6" />
          <path d="M9 22c4-1 7-4 9-9 1 4 3 7 5 9" />
        </svg>
        <span>Field Notes</span>
      </NuxtLink>

      <nav class="nav" aria-label="Main">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link"
          :aria-current="isActive(link.to) ? 'page' : undefined"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="account">
        <template v-if="user">
          <span class="who">
            {{ user.name }}
            <span class="role">{{ user.role }}</span>
          </span>
          <form method="post" action="/api/logout">
            <AppButton type="submit" variant="ghost" size="sm">Sign out</AppButton>
          </form>
        </template>
        <AppButton v-else to="/login" variant="secondary" size="sm">Sign in</AppButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  border-bottom: 1px solid var(--color-rule);
  background: var(--color-paper-raised);
}

.inner {
  max-width: var(--page-max);
  margin: 0 auto;
  padding: var(--space-4) var(--space-5);
  display: flex;
  align-items: center;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-ink);
  text-decoration: none;
}

.mark {
  width: 1.75rem;
  height: 1.75rem;
}

.mark rect {
  fill: var(--color-accent);
}

.mark path {
  fill: none;
  stroke: var(--color-on-accent);
  stroke-width: 2.4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.nav {
  display: flex;
  gap: var(--space-5);
}

.nav-link {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-ink-muted);
  text-decoration: none;
  padding: var(--space-1) 0;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: var(--color-ink);
}

.nav-link[aria-current='page'] {
  color: var(--color-ink);
  border-bottom-color: var(--color-accent);
}

.account {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.who {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
}

.role {
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-label);
  color: var(--color-accent-deep);
  background: var(--color-accent-tint);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}

@media (max-width: 40rem) {
  .inner {
    gap: var(--space-4);
    padding: var(--space-3) var(--space-4);
  }

  .nav {
    order: 3;
    width: 100%;
    gap: var(--space-4);
  }

  .who {
    display: none;
  }
}
</style>
