<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'md' | 'sm'
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'primary', size: 'md', type: 'button' },
)

const classes = computed(() => ['btn', `btn--${props.variant}`, `btn--${props.size}`])
</script>

<template>
  <NuxtLink v-if="to" :to="to" :class="classes">
    <slot />
  </NuxtLink>
  <button v-else :type="type" :class="classes">
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  border: 1px solid transparent;
  border-radius: var(--radius-pill);
  font-family: var(--font-sans);
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  cursor: pointer;
  transition:
    background-color 120ms ease,
    border-color 120ms ease,
    color 120ms ease;
}

.btn--md {
  font-size: var(--text-sm);
  padding: var(--space-3) var(--space-5);
}

.btn--sm {
  font-size: var(--text-xs);
  padding: var(--space-2) var(--space-4);
}

.btn--primary {
  background: var(--color-accent);
  color: var(--color-on-accent);
}

.btn--primary:hover {
  background: var(--color-accent-deep);
  color: var(--color-on-accent);
}

.btn--secondary {
  background: transparent;
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.btn--secondary:hover {
  background: var(--color-accent-tint);
  color: var(--color-accent-deep);
}

.btn--ghost {
  background: transparent;
  color: var(--color-ink-muted);
  border-color: var(--color-rule-strong);
}

.btn--ghost:hover {
  color: var(--color-ink);
  border-color: var(--color-ink-muted);
}
</style>
