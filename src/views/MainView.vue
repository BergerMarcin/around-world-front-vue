<script setup lang="ts">
import Map from '@/components/map/components/Map.vue'
import HotelModal from '@/components/hotel-modal/components/HotelModal.vue'
import CartModal from '@/components/cart/components/CartModal.vue'
import OrderModal from '@/components/order/components/OrderModal.vue';
</script>

<template>
  <main>
    <Map />
    <HotelModal />
    <CartModal />
    <OrderModal />
  </main>
</template>
