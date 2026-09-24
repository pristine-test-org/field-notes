<script setup lang="ts">
useHead({ title: 'About' })
</script>

<template>
  <div class="about">
    <PageHeader eyebrow="About" title="A journal kept in the field">
      <p>Field Notes started as a waterproof notebook passed between the group on every outing.</p>
    </PageHeader>

    <div class="prose">
      <p>
        We are a small volunteer group that walks, paddles and wades the shores and forests around the Salish Sea.
        Each outing ends with one entry: where we were, when, what the weather was doing, and what we saw.
      </p>
      <h2>How entries are written</h2>
      <ul>
        <li>Record what you saw, not what you expected to see.</li>
        <li>Give counts where you can, and say how you counted.</li>
        <li>Note the weather at the start of the outing.</li>
        <li>Photographs and counts only. Nothing is collected.</li>
      </ul>
      <h2>Who can do what</h2>
      <p>
        Anyone can read the journal. Members sign in as readers to keep their own list of saved entries. Editors
        run the editor desk and publish new entries after each outing.
      </p>
    </div>

    <AppButton to="/entries" variant="secondary">Read the entries</AppButton>
  </div>
</template>

<style scoped>
.about {
  display: grid;
  gap: var(--space-6);
  justify-items: start;
}

.prose {
  max-width: var(--measure);
  display: grid;
  gap: var(--space-4);
  font-size: var(--text-md);
  color: var(--color-ink);
}

.prose h2 {
  margin-top: var(--space-4);
  font-size: var(--text-lg);
}

.prose ul {
  margin: 0;
  padding-left: var(--space-5);
  display: grid;
  gap: var(--space-2);
}
</style>
