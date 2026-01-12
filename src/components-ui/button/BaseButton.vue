<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'tertiary'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    type: 'button',
    disabled: false,
  },
)

const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()
</script>

<template>
  <button
    :type="type"
    :class="['base-button', `base-button--${variant}`]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.base-button {
  padding: 12px 24px;
  color: var(--aw-color-button-text);
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;

  &:not(:disabled):hover {
    transform: translateX(-1px) translateY(-1px);
    box-shadow: 4px 4px 8px var(--aw-color-button-box-shadow);
  }

  &:not(:disabled):active {
    transform: none;
    box-shadow: none;
  }

  &:disabled,
  &:disabled:hover,
  &:disabled:active {
    color: var(--aw-color-button-disabled-text);
    background: var(--aw-color-button-disabled-bg);
    cursor: not-allowed;
  }
}

.base-button--primary {
  background: var(--aw-color-button-primary-bg);
  &:hover {
    background: var(--aw-color-button-primary-bg-hover);
  }
}

.base-button--secondary {
  background: var(--aw-color-button-secondary-bg);
  &:hover {
    background: var(--aw-color-button-secondary-bg-hover);
  }
}

.base-button--tertiary {
  background: var(--aw-color-button-tertiary-bg);
  &:hover {
    background: var(--aw-color-button-tertiary-bg-hover);
  }
}
</style>
