<script setup lang="ts">
defineProps<{ tag: string }>()
</script>

<template>
  <span class="tag">#{{ tag }}</span>
</template>

<style scoped>
.tag {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--color-accent-deep);
  background: var(--color-accent-tint);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}
</style>
