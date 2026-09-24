<script setup lang="ts">
import type { Entry } from '~~/shared/types'

defineProps<{ entries: Entry[] }>()
</script>

<template>
  <aside class="panel" aria-labelledby="saved-heading">
    <h2 id="saved-heading" class="heading">Your saved entries</h2>
    <ul v-if="entries.length" class="list">
      <li v-for="entry in entries" :key="entry.id">
        <NuxtLink :to="`/entries/${entry.id}`">{{ entry.title }}</NuxtLink>
        <span class="date">{{ formatDate(entry.date) }}</span>
      </li>
    </ul>
    <p v-else class="empty">Nothing saved yet. Open an entry and press “Save to my notes”.</p>
  </aside>
</template>

<style scoped>
.panel {
  padding: var(--space-5);
  background: var(--color-ochre-tint);
  border-radius: var(--radius-md);
  display: grid;
  gap: var(--space-3);
  align-content: start;
}

.heading {
  font-size: var(--text-md);
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-3);
}

.list li {
  display: grid;
  gap: var(--space-1);
}

.list a {
  font-weight: 600;
  color: var(--color-ink);
}

.date,
.empty {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
}
</style>
