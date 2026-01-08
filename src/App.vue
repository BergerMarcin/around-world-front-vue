<script setup lang="ts">
import { provide, type ShallowRef, useTemplateRef } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import Logos from '@/components/logos/Logos.vue'
import Notification from '@/components/notification/Notification.vue'
import CartNavButton from '@/components/cart/components/CartNavButton.vue'
import CartModal from '@/components/cart/components/CartModal.vue'
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
        <RouterLink to="/">Holidays</RouterLink>
        <div class="nav__separator" />
        <CartNavButton :disabled="$route.name !== 'MainMapView'" class="nav__cart-button" />
        <div class="nav__separator" />
        <RouterLink to="/project-dev-docs">Dev Docs</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <CartModal />

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

  & a,
  .nav__cart-button {
    display: inline-block;
    padding: 0 1rem;
    vertical-align: middle;
    font-size: inherit;
    line-height: inherit;

    &.router-link-exact-active {
      color: var(--aw-color-text-regular);
      text-decoration: underline;
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
  background: var(--aw-color-border-light);
  vertical-align: middle;
}
</style>
