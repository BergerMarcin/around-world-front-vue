<script setup lang="ts">
import { provide, type ShallowRef, useTemplateRef } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Logos from '@/components/logos/Logos.vue'
import Notification from '@/components/notification/Notification.vue'
import { ProviderKey } from '@/types/global.types'

const logsContainer: Readonly<ShallowRef<HTMLElement | null>> = useTemplateRef('logsContainer')
provide(ProviderKey.LOGS_CONTAINER, logsContainer)
</script>

<template>
  <header class="app__header">
    <Logos />
    <div ref="logsContainer" style="font-size: 8px"></div>
    <div class="nav__container">
      <nav class="nav__nav" aria-label="Main app navigation">
        <RouterLink to="/">Start</RouterLink>
        <div class="nav__separator" />
        <RouterLink to="/project-dev-docs">Dev Docs</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <Notification />
</template>

<style lang="scss" scoped>
.app__header {
  display: flex;
  place-items: center;
  justify-content: space-between;
}

.nav__container {
  display: flex;
  place-items: flex-start;
  flex-wrap: wrap;
}

.nav__nav {
  width: 100%;
  font-size: 1rem;
  text-align: center;

  & a {
    display: inline-block;
    padding: 0 1rem;
    vertical-align: middle;

    &.router-link-exact-active {
      color: var(--color-text-regular);
      cursor: default;
    }

    &.router-link-exact-active:hover {
      background: transparent;
    }
  }
}

.nav__separator {
  display: inline-block;
  width: 1px;
  height: 25px;
  background: var(--color-border-light);
  vertical-align: middle;
}
</style>
