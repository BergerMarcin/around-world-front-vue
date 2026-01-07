<script lang="ts" setup>
const props = defineProps<{
  variant?: 'primary' | 'secondary' | 'tertiary'
  disabled?: boolean
}>()

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const variant = props.variant || 'primary'
const disabled = props.disabled || false
</script>

<template>
  <button :class="['base-button', `base-button--${variant}`]" :disabled="disabled" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  padding: 12px 24px;
  color: var(--color-button-text);
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;

  &:not(:disabled):hover {
    transform: translateX(-1px) translateY(-1px);
    box-shadow: 4px 4px 8px var(--color-button-shadow);
  }

  &:not(:disabled):active {
    transform: none;
    box-shadow: none;
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    color: var(--color-button-disabled-text);
    background: var(--color-button-disabled-bg);
    cursor: not-allowed;
  }
}

.base-button--primary {
  background: var(--color-button-primary-bg);
  &:hover {
    background: var(--color-button-primary-bg-hover);
  }
}

.base-button--secondary {
  background: var(--color-button-secondary-bg);
  &:hover {
    background: var(--color-button-secondary-bg-hover);
  }
}

.base-button--tertiary {
  background: var(--color-button-tertiary-bg);
  &:hover {
    background: var(--color-button-tertiary-bg-hover);
  }
}
</style>
