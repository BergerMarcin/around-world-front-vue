<script setup lang="ts">
import BaseButton from '@/components/button/BaseButton.vue'
import { imageUrlFromHotel, rateStandardized } from '@/components/map/utils/hotel-details.utils'
import type { Hotel } from '@/types/global.types'

const props = defineProps<{
  hotel: Hotel
}>()

const imageUrl = imageUrlFromHotel(props.hotel)
const rate = rateStandardized(props.hotel)
</script>

<template>
  <div class="hotel-detail">
    <div class="hotel-detail__image-container">
      <img :src="imageUrl" :alt="hotel.title" class="hotel-detail__image" />
      <div class="hotel-detail__rate-overlay">
        <span v-if="rate" class="hotel-detail__rate">⭐ {{ rate }}</span>
      </div>
    </div>

    <div class="hotel-detail__body">
      <div class="hotel-detail__header-container">
        <h2 class="hotel-detail__title">{{ hotel.title }}</h2>
        <BaseButton>
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

      <div class="hotel-detail__sections-container">
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

<style lang="scss" scoped>
.hotel-detail {
  width: 600px;
  max-width: 85vw;

  &__image-container {
    position: relative;
    width: 100%;
    height: 250px;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__rate-overlay {
    position: absolute;
    top: 0;
    left: 0;
    padding: 16px;
  }

  &__rate {
    background: var(--aw-color-overlay-dark);
    color: var(--aw-color-bg-white);
    padding: 6px 12px;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
  }

  &__body {
    padding: 24px;
  }

  &__header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }

  &__title {
    margin: 0 25px 0 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--aw-color-text-header);
    line-height: 1.3;
  }

  &__atc {
    font-weight: 600;
    white-space: nowrap;
    user-select: none;
  }

  &__location {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--aw-color-text-muted);
    font-size: 0.95rem;
    margin-bottom: 16px;
  }

  &__location-icon {
    font-size: 1.1rem;
  }

  &__price {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 24px;
    padding: 12px 16px;
    background: var(--aw-gradient-primary-faint);
    border-radius: 8px;
  }

  &__price-label {
    font-size: 0.9rem;
    color: var(--aw-color-text-muted);
  }

  &__price-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--aw-color-primary-1);
  }

  &__sections-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__section {
    & h3 {
      margin: 0 0 8px 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--aw-color-text-header);
    }

    & p {
      margin: 0;
      font-size: 0.95rem;
      color: var(--aw-color-text-regular);
      line-height: 1.6;
    }
  }
}
</style>
