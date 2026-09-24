<script setup lang="ts">
defineProps<{ eyebrow?: string; title: string }>()
</script>

<template>
  <header class="page-header">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <h1>{{ title }}</h1>
    <div v-if="$slots.default" class="lead">
      <slot />
    </div>
  </header>
</template>

<style scoped>
.page-header {
  display: grid;
  gap: var(--space-3);
  max-width: var(--measure);
  margin-bottom: var(--space-7);
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
}
</style>
