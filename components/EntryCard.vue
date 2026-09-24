<script setup lang="ts">
import type { Entry } from '~~/shared/types'

const props = defineProps<{ entry: Entry }>()

const badge = computed(() => {
  const d = new Date(`${props.entry.date}T00:00:00Z`)
  return {
    day: d.getUTCDate(),
    month: d.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' }),
  }
})
</script>

<template>
  <article class="card">
    <div class="top">
      <time class="badge" :datetime="entry.date" :title="formatDate(entry.date)">
        <span class="badge-day">{{ badge.day }}</span>
        <span class="badge-month">{{ badge.month }}</span>
      </time>
      <p class="meta">{{ entry.place }}</p>
    </div>
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
  gap: var(--space-3);
  padding: var(--space-5);
  background: var(--color-paper-raised);
  border: 1px solid var(--color-rule);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-card);
}

.card:hover {
  border-color: var(--color-rule-strong);
}

.top {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-1);
}

.badge {
  display: grid;
  justify-items: center;
  min-width: 3rem;
  padding: var(--space-1) var(--space-2);
  background: var(--color-ochre-tint);
  color: var(--color-ochre);
  border-radius: var(--radius-sm);
  line-height: var(--leading-tight);
}

.badge-day {
  font-family: var(--font-serif);
  font-size: var(--text-lg);
  font-weight: 600;
}

.badge-month {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
}

.meta {
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
  margin: var(--space-1) 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}
</style>
