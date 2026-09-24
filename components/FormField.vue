<script setup lang="ts">
defineProps<{ label: string; for: string; hint?: string }>()
</script>

<template>
  <div class="field">
    <label :for="$props.for" class="label">{{ label }}</label>
    <slot />
    <p v-if="hint" class="hint">{{ hint }}</p>
  </div>
</template>

<style scoped>
.field {
  display: grid;
  gap: var(--space-2);
}

.label {
  font-size: var(--text-sm);
  font-weight: 600;
  color: var(--color-ink);
}

.hint {
  font-size: var(--text-xs);
  color: var(--color-ink-faint);
}

.field :slotted(input),
.field :slotted(textarea) {
  width: 100%;
  font: inherit;
  font-size: var(--text-base);
  color: var(--color-ink);
  background: var(--color-paper-raised);
  border: 1px solid var(--color-rule-strong);
  border-radius: var(--radius-sm);
  padding: var(--space-3);
}

.field :slotted(textarea) {
  min-height: 9rem;
  resize: vertical;
}

.field :slotted(input:focus-visible),
.field :slotted(textarea:focus-visible) {
  border-color: var(--color-accent);
}
</style>
