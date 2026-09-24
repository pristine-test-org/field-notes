<script setup lang="ts">
import type { Entry } from '~~/shared/types'

useHead({ title: 'A shared field journal' })
const { user } = useSession()
const { data: entries } = await useFetch<Entry[]>('/api/entries')
const latest = computed(() => (entries.value ?? []).slice(0, 3))
const places = computed(() => new Set((entries.value ?? []).map((e) => e.place)).size)
</script>

<template>
  <div class="home">
    <section class="hero">
      <p class="eyebrow">Salish Sea field group · 2026 season</p>
      <h1>What we saw, where, and in what weather.</h1>
      <p class="lead">
        Field Notes is the group's shared journal. Every outing gets an entry: a place, a date, the conditions,
        and what turned up.
      </p>
      <div class="actions">
        <AppButton to="/entries">Read the journal</AppButton>
        <AppButton v-if="!user" to="/login" variant="secondary">Sign in</AppButton>
        <AppButton v-else to="/map" variant="secondary">Open the map</AppButton>
      </div>
      <dl class="stats">
        <div>
          <dt>Entries</dt>
          <dd>{{ entries?.length ?? 0 }}</dd>
        </div>
        <div>
          <dt>Places</dt>
          <dd>{{ places }}</dd>
        </div>
        <div>
          <dt>Specimens collected</dt>
          <dd>0</dd>
        </div>
      </dl>
    </section>

    <section class="latest" aria-labelledby="latest-heading">
      <div class="section-head">
        <h2 id="latest-heading">Latest from the field</h2>
        <NuxtLink to="/entries">All entries →</NuxtLink>
      </div>
      <div class="grid">
        <EntryCard v-for="entry in latest" :key="entry.id" :entry="entry" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.home {
  display: grid;
  gap: var(--space-8);
}

.hero {
  display: grid;
  gap: var(--space-5);
  max-width: 46rem;
}

.eyebrow {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ochre);
}

.lead {
  font-size: var(--text-md);
  color: var(--color-ink-muted);
  max-width: var(--measure);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.stats {
  display: flex;
  gap: var(--space-7);
  margin: var(--space-4) 0 0;
  padding-top: var(--space-5);
  border-top: 1px solid var(--color-rule);
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
  color: var(--color-ink);
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: var(--space-5);
}

@media (max-width: 40rem) {
  .stats {
    gap: var(--space-5);
  }
}
</style>
