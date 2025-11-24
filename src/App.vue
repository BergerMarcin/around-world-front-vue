<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="logo-container">
      <img alt="Around World app logo" class="logo" src="@/assets/logo-around-world.svg" height="25" />
      <img alt="Vue logo" class="logo" src="@/assets/logo-vue.svg" height="15" width="15" />
      <img alt="Vite logo" class="logo" src="@/assets/logo-vite.svg" height="15" width="15" />
    </div>

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

.logo-container {
  display: flex;
  place-items: center;
  gap: 0.25rem;
  padding-bottom: 0.25rem;
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
