<script setup lang="ts">
import BaseButton from '@/components/button/BaseButton.vue'
import type { Hotel } from '@/types/global.types'

defineProps<{
  hotel: Hotel
}>()
</script>

<template>
  <div class="hotel-detail">
    <div class="hotel-detail__image-container">
      <img :src="hotel.image" :alt="hotel.title" class="hotel-detail__image" />
      <div class="hotel-detail__overlay">
        <span v-if="hotel.rate" class="hotel-detail__rate">⭐ {{ hotel.rate.toFixed(1) }}</span>
      </div>
    </div>

    <div class="hotel-detail__body">
      <div class="hotel-detail__header-container">
        <h2 class="hotel-detail__title">{{ hotel.title }}</h2>
        <BaseButton :disabled="true">
          <span class="hotel-detail__atc">Book Now</span>
        </BaseButton>
      </div>

      <div class="hotel-detail__location">
        <span class="hotel-detail__location-icon">📍</span>
        <span>{{ hotel.location_region }}, {{ hotel.location_country }}</span>
      </div>

      <div class="hotel-detail__price">
        <span class="hotel-detail__price-label">Price from</span>
        <span class="hotel-detail__price-value">{{ hotel.price }} {{ hotel.currency }}</span>
      </div>

      <div class="hotel-detail__sections">
        <section v-if="hotel.description_general" class="hotel-detail__section">
          <h3>Overview</h3>
          <p>{{ hotel.description_general }}</p>
        </section>

        <section v-if="hotel.description_location" class="hotel-detail__section">
          <h3>Location</h3>
          <p>{{ hotel.description_location }}</p>
        </section>

        <section v-if="hotel.description_hotel" class="hotel-detail__section">
          <h3>Hotel</h3>
          <p>{{ hotel.description_hotel }}</p>
        </section>

        <section v-if="hotel.description_room" class="hotel-detail__section">
          <h3>Rooms</h3>
          <p>{{ hotel.description_room }}</p>
        </section>

        <section v-if="hotel.description_food_drinks" class="hotel-detail__section">
          <h3>Food & Drinks</h3>
          <p>{{ hotel.description_food_drinks }}</p>
        </section>

        <section v-if="hotel.description_beach" class="hotel-detail__section">
          <h3>Beach</h3>
          <p>{{ hotel.description_beach }}</p>
        </section>

        <section v-if="hotel.description_sport_entertainment" class="hotel-detail__section">
          <h3>Sport & Entertainment</h3>
          <p>{{ hotel.description_sport_entertainment }}</p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hotel-detail {
  width: 600px;
  max-width: 85vw;
}

.hotel-detail__image-container {
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
}

.hotel-detail__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hotel-detail__overlay {
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px;
}

.hotel-detail__rate {
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
}

.hotel-detail__body {
  padding: 24px;
}

.hotel-detail__header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.hotel-detail__title {
  margin: 0 25px 0 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
}

.hotel-detail__atc {
  font-weight: 600;
  white-space: nowrap;
}

.hotel-detail__location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 0.95rem;
  margin-bottom: 16px;
}

.hotel-detail__location-icon {
  font-size: 1.1rem;
}

.hotel-detail__price {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 24px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #01b6db10, #76f7c010);
  border-radius: 8px;
}

.hotel-detail__price-label {
  font-size: 0.9rem;
  color: #666;
}

.hotel-detail__price-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #01b6db;
}

.hotel-detail__sections {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hotel-detail__section h3 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
}

.hotel-detail__section p {
  margin: 0;
  font-size: 0.95rem;
  color: #444;
  line-height: 1.6;
}
</style>
