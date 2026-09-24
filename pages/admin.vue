<script setup lang="ts">
const { user } = useSession()
</script>

<template>
  <div class="desk">
    <div class="bar">
      <p class="eyebrow">Editor desk · {{ user?.name }}</p>
      <nav class="tabs" aria-label="Editor desk">
        <NuxtLink to="/admin" class="tab" exact-active-class="tab--active">Overview</NuxtLink>
        <NuxtLink to="/admin/entries/new" class="tab" exact-active-class="tab--active">New entry</NuxtLink>
      </nav>
    </div>
    <NuxtPage />
  </div>
</template>

<style scoped>
.desk {
  display: grid;
  gap: var(--space-6);
}

.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-rule);
}

.eyebrow {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ochre);
}

.tabs {
  display: flex;
  gap: var(--space-2);
}

.tab {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-ink-muted);
  text-decoration: none;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-pill);
}

.tab:hover {
  color: var(--color-ink);
  background: var(--color-paper-sunk);
}

.tab--active {
  color: var(--color-accent-deep);
  background: var(--color-accent-tint);
}
</style>
