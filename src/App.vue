<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <img alt="Around World app logo" class="logo" src="@/assets/logo-around-world.svg" height="25" />
      <img alt="Vue logo" class="logo" src="@/assets/logo-vue.svg" height="20" width="20" />
      <img alt="Vite logo" class="logo" src="@/assets/logo-vite.svg" height="20" width="20" />
    </div>

    <div class="nav-wrapper">
      <nav>
        <RouterLink to="/">Start</RouterLink>
        <RouterLink to="/project-dev-docs">Project Dev Docs</RouterLink>
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

.logo {
  margin: 0 0.25rem;
}

nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;
}

.nav-wrapper {
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
