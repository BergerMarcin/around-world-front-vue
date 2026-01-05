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

<style scoped>
.base-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.base-button:not(:disabled):hover {
  transform: translateX(-1px) translateY(-1px);
  box-shadow: 4px 4px 8px var(--color-primary-1-lighter);
}

.base-button:not(:disabled):active {
  transform: none;
  box-shadow: none;
}

.base-button--primary {
  background: var(--gradient-primary);
  color: white;
}

.base-button--primary:hover {
  background: var(--gradient-primary-hover);
}

.base-button--secondary {
  background-color: var(--color-secondary);
  color: white;
}

.base-button--secondary:hover {
  background-color: var(--color-secondary-dark);
}

.base-button--tertiary {
  background-color: transparent;
  color: var(--color-tertiary);
  border: 2px solid var(--color-tertiary);
}

.base-button--tertiary:hover {
  background-color: var(--color-tertiary-hover-bg);
}

.base-button:disabled {
  background: var(--color-bg-light-gray);
  color: var(--color-text-regular);
  cursor: not-allowed;
}
</style>
