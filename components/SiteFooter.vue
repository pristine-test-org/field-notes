<template>
  <footer class="footer">
    <div class="inner">
      <p>Field Notes: a shared journal kept by the Salish Sea field group.</p>
      <p class="meta">Observations are recorded as seen. Nothing is collected.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-rule);
  background: var(--color-paper-sunk);
}

.inner {
  max-width: var(--page-max);
  margin: 0 auto;
  padding: var(--space-6) var(--space-5);
  display: flex;
  justify-content: space-between;
  gap: var(--space-4);
  flex-wrap: wrap;
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
}

.meta {
  color: var(--color-ink-faint);
}
</style>
