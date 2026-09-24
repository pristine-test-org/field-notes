<script setup lang="ts">
import type { Entry } from '~~/shared/types'

const props = defineProps<{ entries: Entry[] }>()

// A plain projection of the entries' bounding box onto the panel. No tiles, no API.
const pins = computed(() => {
  const lats = props.entries.map((e) => e.lat)
  const lngs = props.entries.map((e) => e.lng)
  const [minLat, maxLat] = [Math.min(...lats), Math.max(...lats)]
  const [minLng, maxLng] = [Math.min(...lngs), Math.max(...lngs)]
  const span = (lo: number, hi: number) => hi - lo || 1
  return props.entries.map((entry, index) => ({
    entry,
    number: index + 1,
    left: 8 + ((entry.lng - minLng) / span(minLng, maxLng)) * 84,
    top: 8 + ((maxLat - entry.lat) / span(minLat, maxLat)) * 84,
  }))
})
</script>

<template>
  <div class="map">
    <div class="panel" role="img" :aria-label="`Sketch map of ${entries.length} entry locations`">
      <span class="compass" aria-hidden="true">N ↑</span>
      <NuxtLink
        v-for="pin in pins"
        :key="pin.entry.id"
        :to="`/entries/${pin.entry.id}`"
        class="pin"
        :style="{ left: `${pin.left}%`, top: `${pin.top}%` }"
        :title="pin.entry.title"
      >
        {{ pin.number }}
      </NuxtLink>
    </div>
    <ol class="legend">
      <li v-for="pin in pins" :key="pin.entry.id">
        <span class="num">{{ pin.number }}</span>
        <div>
          <NuxtLink :to="`/entries/${pin.entry.id}`">{{ pin.entry.place }}</NuxtLink>
          <p class="coords">{{ formatCoords(pin.entry.lat, pin.entry.lng) }}</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.map {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(16rem, 1fr);
  gap: var(--space-6);
  align-items: start;
}

.panel {
  position: relative;
  aspect-ratio: 4 / 3;
  background-color: var(--color-accent-tint);
  background-image:
    linear-gradient(var(--color-rule) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-rule) 1px, transparent 1px);
  background-size: 2.5rem 2.5rem;
  border: 1px solid var(--color-rule-strong);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.compass {
  position: absolute;
  right: var(--space-4);
  top: var(--space-3);
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink-faint);
}

.pin {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 1.75rem;
  height: 1.75rem;
  display: grid;
  place-items: center;
  border-radius: var(--radius-pill);
  background: var(--color-accent);
  color: var(--color-on-accent);
  font-size: var(--text-xs);
  font-weight: 700;
  text-decoration: none;
  border: 2px solid var(--color-paper-raised);
}

.pin:hover {
  background: var(--color-ochre);
  color: var(--color-on-accent);
}

.legend {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: var(--space-3);
}

.legend li {
  display: flex;
  gap: var(--space-3);
  align-items: baseline;
}

.num {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ochre);
  min-width: 1.5rem;
}

.coords {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--color-ink-faint);
}

@media (max-width: 48rem) {
  .map {
    grid-template-columns: 1fr;
  }
}
</style>
