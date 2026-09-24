<template>
  <div class="shell">
    <a class="skip" href="#main">Skip to content</a>
    <SiteHeader />
    <main id="main" class="main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1;
  width: 100%;
  max-width: var(--page-max);
  margin: 0 auto;
  padding: var(--space-7) var(--space-5) var(--space-8);
}

.skip {
  position: absolute;
  left: var(--space-4);
  top: -3rem;
  padding: var(--space-2) var(--space-4);
  background: var(--color-ink);
  color: var(--color-paper);
  border-radius: var(--radius-sm);
  z-index: 10;
}

.skip:focus {
  top: var(--space-4);
}

@media (max-width: 40rem) {
  .main {
    padding: var(--space-6) var(--space-4) var(--space-7);
  }
}
</style>
