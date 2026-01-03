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
  <button
    :class="['base-button', `base-button--${variant}`]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
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
  transition: background-color 0.3s ease;
}

.base-button:not(:disabled):hover {
  transform: translateX(-1px) translateY(-1px);
  box-shadow: 4px 4px 8px rgba(1, 182, 219, 0.3);
}

.base-button:not(:disabled):active {
  transform: none;
  box-shadow: none;
}

.base-button--primary {
  background: linear-gradient(135deg, #01b6db, #76f7c0);
  color: white;
}

.base-button--primary:hover {
  background: linear-gradient(135deg, #009aba, #76f7c0);
}

.base-button--secondary {
  background-color: #6c757d;
  color: white;
}

.base-button--secondary:hover {
  background-color: #5a6268;
}

.base-button--tertiary {
  background-color: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.base-button--tertiary:hover {
  background-color: #e2e6ea;
}

.base-button:disabled {
  background: #c0c0c0;
  color: #444;
  cursor: not-allowed;
}
</style>
