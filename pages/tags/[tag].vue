<script setup lang="ts">
import type { Entry } from '~~/shared/types'

const route = useRoute()
const tag = computed(() => String(route.params.tag))
const { data: entries } = await useFetch<Entry[]>('/api/entries', {
  query: { tag },
  default: () => [],
})

useHead({ title: () => `#${tag.value}` })
</script>

<template>
  <div>
    <NuxtLink to="/entries" class="back">← All entries</NuxtLink>
    <PageHeader eyebrow="Tag" :title="`#${tag}`">
      <p>
        {{ entries?.length ?? 0 }} {{ entries?.length === 1 ? 'entry' : 'entries' }} tagged
        <strong>{{ tag }}</strong>, newest first.
      </p>
    </PageHeader>

    <div v-if="entries?.length" class="list">
      <EntryCard v-for="entry in entries" :key="entry.id" :entry="entry" />
    </div>
    <p v-else class="empty">No entries carry this tag yet.</p>
  </div>
</template>

<style scoped>
.back {
  display: inline-block;
  margin-bottom: var(--space-5);
  font-size: var(--text-sm);
  text-decoration: none;
}

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(17rem, 1fr));
  gap: var(--space-5);
}

.empty {
  color: var(--color-ink-muted);
}
</style>
