<template>
  <div class="dev-doc-header__container">
    <h1 class="dev-doc-header__header-main">Around World</h1>
    <h3 class="dev-doc-header__header-description">
      Project created with
      <a href="https://vite.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>
    </h3>
  </div>
</template>

<style scoped>
.dev-doc-header__container {
  margin-bottom: 2rem;
}

.dev-doc-header__header-main,
.dev-doc-header__header-description {
  text-align: center;
}

.dev-doc-header__header-main {
  position: relative;
  top: -10px;
  padding: 3px;
  color: var(--color-primary-1);
  font-size: 2.6rem;
  font-weight: 500;
}

.dev-doc-header__header-description {
  font-size: 1.2rem;
  color: var(--color-text-regular);
}
</style>
