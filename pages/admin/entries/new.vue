<script setup lang="ts">
useHead({ title: 'New entry' })
const route = useRoute()
const missing = computed(() => route.query.error === 'missing')
const today = new Date().toISOString().slice(0, 10)
</script>

<template>
  <div class="new-entry">
    <h1>New entry</h1>
    <p class="lead">Write it up the same day, while the counts are fresh.</p>

    <p v-if="missing" class="error" role="alert">An entry needs at least a title and a place.</p>

    <form method="post" action="/api/entries" class="form">
      <FormField label="Title" for="title">
        <input id="title" name="title" type="text" required placeholder="Low-tide census at Cattle Point" />
      </FormField>

      <fieldset class="group">
        <legend>Where and when</legend>
        <div class="row">
          <FormField label="Date" for="date">
            <input id="date" name="date" type="date" :value="today" />
          </FormField>
          <FormField label="Place" for="place">
            <input id="place" name="place" type="text" required />
          </FormField>
        </div>
        <div class="row">
          <FormField label="Latitude" for="lat" hint="Decimal degrees, e.g. 48.451">
            <input id="lat" name="lat" type="text" inputmode="decimal" />
          </FormField>
          <FormField label="Longitude" for="lng" hint="Decimal degrees, e.g. -122.963">
            <input id="lng" name="lng" type="text" inputmode="decimal" />
          </FormField>
        </div>
        <FormField label="Weather" for="weather">
          <input id="weather" name="weather" type="text" placeholder="Overcast, 14 °C, light westerly" />
        </FormField>
      </fieldset>

      <fieldset class="group">
        <legend>What you saw</legend>
        <FormField label="Summary" for="summary" hint="One or two sentences for the entry card.">
          <textarea id="summary" name="summary" rows="3" />
        </FormField>
        <FormField label="Notes" for="body" hint="Leave a blank line between paragraphs.">
          <textarea id="body" name="body" rows="8" />
        </FormField>
        <FormField label="Tags" for="tags" hint="Comma separated, e.g. birds, wetland">
          <input id="tags" name="tags" type="text" />
        </FormField>
      </fieldset>

      <div class="actions">
        <AppButton type="submit">Publish entry</AppButton>
        <AppButton to="/admin" variant="ghost">Cancel</AppButton>
      </div>
    </form>
  </div>
</template>

<style scoped>
.new-entry {
  display: grid;
  gap: var(--space-4);
  max-width: 48rem;
}

.new-entry h1 {
  font-size: var(--text-xl);
}

.lead {
  color: var(--color-ink-muted);
}

.form {
  display: grid;
  gap: var(--space-5);
  margin-top: var(--space-3);
}

.group {
  margin: 0;
  padding: var(--space-5);
  display: grid;
  gap: var(--space-4);
  background: var(--color-paper-raised);
  border: 1px solid var(--color-rule);
  border-radius: var(--radius-md);
}

.group legend {
  padding: 0 var(--space-2);
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: var(--tracking-label);
  text-transform: uppercase;
  color: var(--color-ochre);
}

.row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

.actions {
  display: flex;
  gap: var(--space-3);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-rule);
}

.error {
  font-size: var(--text-sm);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-sm);
  background: var(--color-danger-tint);
  color: var(--color-danger);
}

@media (max-width: 40rem) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
