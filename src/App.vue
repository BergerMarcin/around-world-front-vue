<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Logos from '@/components/logos/Logos.vue'
</script>

<template>
  <header>
    <Logos />

    <div class="nav-container">
      <nav>
        <RouterLink to="/">Start</RouterLink>
        <RouterLink to="/project-dev-docs">Dev Docs</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  display: flex;
  place-items: center;
  justify-content: space-between;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
}

.nav-container {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  cursor: default;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
