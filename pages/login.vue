<script setup lang="ts">
useHead({ title: 'Sign in' })
const route = useRoute()
const { user } = useSession()
const failed = computed(() => route.query.error === '1')
const next = computed(() => (typeof route.query.next === 'string' ? route.query.next : ''))
</script>

<template>
  <div class="login">
    <div class="card">
      <h1>Sign in</h1>
      <p class="lead">Readers keep a list of saved entries. Editors publish new ones.</p>

      <p v-if="user" class="notice" role="status">
        You are signed in as {{ user.name }} ({{ user.role }}).
      </p>
      <p v-if="failed" class="error" role="alert">That email and password do not match an account.</p>

      <form method="post" action="/api/login" class="form">
        <input v-if="next" type="hidden" name="next" :value="next" />
        <FormField label="Email" for="email">
          <input id="email" name="email" type="email" autocomplete="username" required />
        </FormField>
        <FormField label="Password" for="password">
          <input id="password" name="password" type="password" autocomplete="current-password" required />
        </FormField>
        <AppButton type="submit">Sign in</AppButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login {
  display: grid;
  place-items: start center;
}

.card {
  width: 100%;
  max-width: 26rem;
  display: grid;
  gap: var(--space-4);
  padding: var(--space-6);
  background: var(--color-paper-raised);
  border: 1px solid var(--color-rule);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
}

.card h1 {
  font-size: var(--text-xl);
}

.lead {
  font-size: var(--text-sm);
  color: var(--color-ink-muted);
}

.form {
  display: grid;
  gap: var(--space-4);
  margin-top: var(--space-2);
}

.notice,
.error {
  font-size: var(--text-sm);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-sm);
}

.notice {
  background: var(--color-accent-tint);
  color: var(--color-accent-deep);
}

.error {
  background: var(--color-danger-tint);
  color: var(--color-danger);
}
</style>
