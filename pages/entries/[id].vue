<script setup lang="ts">
import type { Entry } from '~~/shared/types'

const route = useRoute()
const id = computed(() => String(route.params.id))
const { user } = useSession()

const { data: entry, error } = await useFetch<Entry>(() => `/api/entries/${id.value}`)
if (error.value || !entry.value) {
  throw createError({ statusCode: 404, statusMessage: 'Entry not found', fatal: true })
}

const { data: saved } = await useFetch<Entry[]>('/api/saved', { immediate: Boolean(user.value), default: () => [] })
const isSaved = computed(() => (saved.value ?? []).some((e) => e.id === id.value))

useHead({ title: () => entry.value?.title ?? 'Entry' })
</script>

<template>
  <article v-if="entry" class="entry">
    <NuxtLink to="/entries" class="back">← All entries</NuxtLink>

    <header class="head">
      <p class="date"><time :datetime="entry.date">{{ formatDate(entry.date) }}</time></p>
      <h1>{{ entry.title }}</h1>
      <p class="summary">{{ entry.summary }}</p>
    </header>

    <div class="layout">
      <div class="body">
        <p v-for="(paragraph, i) in entry.body" :key="i">{{ paragraph }}</p>
      </div>

      <aside class="facts" aria-label="Conditions">
        <dl>
          <div>
            <dt>Place</dt>
            <dd>{{ entry.place }}</dd>
          </div>
          <div>
            <dt>Coordinates</dt>
            <dd class="mono">{{ formatCoords(entry.lat, entry.lng) }}</dd>
          </div>
          <div>
            <dt>Weather</dt>
            <dd>{{ entry.weather || 'Not recorded' }}</dd>
          </div>
          <div>
            <dt>Recorded by</dt>
            <dd>{{ entry.author }}</dd>
          </div>
          <div>
            <dt>Tags</dt>
            <dd class="tags">
              <NuxtLink v-for="tag in entry.tags" :key="tag" :to="`/tags/${tag}`" class="tag-link">
                <TagPill :tag="tag" />
              </NuxtLink>
            </dd>
          </div>
        </dl>

        <form v-if="user" method="post" action="/api/saved" class="save">
          <input type="hidden" name="entryId" :value="entry.id" />
          <input type="hidden" name="next" :value="`/entries/${entry.id}`" />
          <AppButton type="submit" :variant="isSaved ? 'secondary' : 'primary'">
            {{ isSaved ? 'Saved · remove' : 'Save to my notes' }}
          </AppButton>
        </form>
        <p v-else class="hint"><NuxtLink :to="`/login?next=/entries/${entry.id}`">Sign in</NuxtLink> to save this entry.</p>
      </aside>
    </div>
  </article>
</template>

<style scoped>
.entry {
  display: grid;
  gap: var(--space-6);
}

.back {
  font-size: var(--text-sm);
  text-decoration: none;
}

.head {
  display: grid;
  gap: var(--space-3);
  max-width: var(--measure);
}

.date {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ochre);
}

.summary {
  font-size: var(--text-md);
  color: var(--color-ink-muted);
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, var(--measure)) 18rem;
  gap: var(--space-7);
  align-items: start;
}

.body {
  display: grid;
  gap: var(--space-4);
  font-size: var(--text-md);
}

.facts {
  display: grid;
  gap: var(--space-5);
  padding: var(--space-5);
  background: var(--color-paper-raised);
  border: 1px solid var(--color-rule);
  border-radius: var(--radius-md);
}

.facts dl {
  margin: 0;
  display: grid;
  gap: var(--space-4);
}

.facts dt {
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ink-faint);
}

.facts dd {
  margin: var(--space-1) 0 0;
  font-size: var(--text-sm);
}

.mono {
  font-family: var(--font-mono);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.tag-link {
  text-decoration: none;
  border-radius: var(--radius-sm);
}

.tag-link:hover :deep(.tag) {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.hint {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
}

@media (max-width: 56rem) {
  .layout {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}
</style>
