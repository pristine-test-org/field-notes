<script setup lang="ts">
import type { Entry } from '~~/shared/types'

useHead({ title: 'Map' })
const { data: entries } = await useFetch<Entry[]>('/api/entries', { default: () => [] })
</script>

<template>
  <div>
    <PageHeader eyebrow="Where we went" title="Map">
      <p>A sketch of every entry's location, drawn from the recorded coordinates. North is up; nothing is to scale.</p>
    </PageHeader>
    <MapPanel :entries="entries ?? []" />
  </div>
</template>
