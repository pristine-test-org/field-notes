<script setup lang="ts">
useHead({ titleTemplate: (title) => (title ? `${title} · Field Notes` : 'Field Notes') })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
