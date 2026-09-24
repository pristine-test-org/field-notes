<script setup lang="ts">
import type { Entry } from '~~/shared/types'

defineProps<{ entry: Entry }>()
</script>

<template>
  <article class="card">
    <p class="meta">
      <time :datetime="entry.date">{{ formatDate(entry.date) }}</time>
      <span aria-hidden="true">·</span>
      <span>{{ entry.place }}</span>
    </p>
    <h2 class="title">
      <NuxtLink :to="`/entries/${entry.id}`">{{ entry.title }}</NuxtLink>
    </h2>
    <p class="summary">{{ entry.summary }}</p>
    <ul class="tags">
      <li v-for="tag in entry.tags" :key="tag"><TagPill :tag="tag" /></li>
    </ul>
  </article>
</template>

<style scoped>
.card {
  position: relative;
  display: grid;
  gap: var(--space-2);
  padding: var(--space-4);
  background: var(--color-paper-raised);
  border: 1px solid var(--color-rule);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}

.card:hover {
  border-color: var(--color-rule-strong);
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--text-xs);
  color: var(--color-ink-faint);
}

.title {
  font-size: var(--text-lg);
}

.title a {
  color: var(--color-ink);
  text-decoration: none;
}

/* The whole card is the link target. */
.title a::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius-md);
}

.title a:focus-visible {
  box-shadow: none;
}

.title a:focus-visible::after {
  box-shadow: var(--focus-ring);
}

.summary {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
}

.tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
