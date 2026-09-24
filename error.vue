<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const missing = computed(() => props.error.statusCode === 404)
useHead({ title: missing.value ? 'Not found' : 'Something went wrong' })
</script>

<template>
  <NuxtLayout>
    <div class="error">
      <p class="code">{{ error.statusCode }}</p>
      <h1>{{ missing ? 'This page wandered off the trail' : 'Something went wrong' }}</h1>
      <p class="lead">{{ missing ? 'The entry or page you asked for is not in the journal.' : error.statusMessage }}</p>
      <AppButton @click="clearError({ redirect: '/entries' })">Back to entries</AppButton>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.error {
  max-width: var(--measure);
  display: grid;
  gap: var(--space-4);
  justify-items: start;
}

.code {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--color-ochre);
}

.lead {
  color: var(--color-ink-muted);
  font-size: var(--text-md);
}
</style>
