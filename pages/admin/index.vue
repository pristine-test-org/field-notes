<script setup lang="ts">
import type { Entry } from '~~/shared/types'

useHead({ title: 'Editor desk' })
const { data: entries } = await useFetch<Entry[]>('/api/entries', { default: () => [] })
const tags = computed(() => new Set((entries.value ?? []).flatMap((e) => e.tags)).size)
</script>

<template>
  <div class="overview">
    <div class="head">
      <h1>Journal overview</h1>
      <AppButton to="/admin/entries/new">New entry</AppButton>
    </div>

    <dl class="stats">
      <div>
        <dt>Published entries</dt>
        <dd>{{ entries?.length ?? 0 }}</dd>
      </div>
      <div>
        <dt>Tags in use</dt>
        <dd>{{ tags }}</dd>
      </div>
    </dl>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Entry</th>
          <th scope="col">Place</th>
          <th scope="col">Recorded by</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry.id">
          <td class="date">{{ entry.date }}</td>
          <td><NuxtLink :to="`/entries/${entry.id}`">{{ entry.title }}</NuxtLink></td>
          <td>{{ entry.place }}</td>
          <td>{{ entry.author }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.overview {
  display: grid;
  gap: var(--space-6);
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.head h1 {
  font-size: var(--text-xl);
}

.stats {
  display: flex;
  gap: var(--space-5);
  margin: 0;
}

.stats div {
  padding: var(--space-4) var(--space-5);
  background: var(--color-paper-raised);
  border: 1px solid var(--color-rule);
  border-radius: var(--radius-md);
  min-width: 12rem;
}

.stats dt {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink-faint);
}

.stats dd {
  margin: 0;
  font-family: var(--font-serif);
  font-size: var(--text-xl);
}

.table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.table th {
  text-align: left;
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink-faint);
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--color-rule-strong);
}

.table td {
  padding: var(--space-3);
  border-bottom: 1px solid var(--color-rule);
}

.date {
  font-family: var(--font-mono);
  color: var(--color-ink-muted);
  white-space: nowrap;
}
</style>
