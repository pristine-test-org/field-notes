<script setup lang="ts">
import type { Entry } from '~~/shared/types'

useHead({ title: 'Entries' })
const route = useRoute()
const { user, isReader } = useSession()
const { data: entries } = await useFetch<Entry[]>('/api/entries')
const { data: saved } = await useFetch<Entry[]>('/api/saved', {
  immediate: isReader.value,
  default: () => [],
})
const denied = computed(() => route.query.denied === '1')
</script>

<template>
  <div>
    <PageHeader eyebrow="The journal" title="Entries">
      <p>Every outing, newest first. Open an entry for the full notes and conditions.</p>
    </PageHeader>

    <p v-if="denied" class="notice" role="status">The editor desk is for editors. You are signed in as a reader.</p>

    <div class="layout" :class="{ 'layout--with-panel': isReader }">
      <div class="list">
        <EntryCard v-for="entry in entries" :key="entry.id" :entry="entry" />
      </div>
      <SavedEntriesPanel v-if="isReader" :entries="saved ?? []" />
    </div>

    <p v-if="!user" class="signin-hint">
      <NuxtLink to="/login?next=/entries">Sign in</NuxtLink> to save entries to your own notes.
    </p>
  </div>
</template>

<style scoped>
.layout {
  display: grid;
  gap: var(--space-6);
}

.layout--with-panel {
  grid-template-columns: minmax(0, 1fr) 18rem;
  align-items: start;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: var(--space-5);
}

.notice {
  margin-bottom: var(--space-5);
  padding: var(--space-3) var(--space-4);
  background: var(--color-ochre-tint);
  color: var(--color-ink);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
}

.signin-hint {
  margin-top: var(--space-6);
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
}

@media (max-width: 56rem) {
  .layout--with-panel {
    grid-template-columns: 1fr;
  }
}
</style>
