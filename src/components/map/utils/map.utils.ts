import Leaflet, { type LeafletEvent } from 'leaflet'
import type { Hotel } from '@/types/global.types'

export const customMarkerIcon = Leaflet.divIcon({
  className: 'custom-hotel-marker',
  html: `<svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="markerGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:var(--aw-color-marker-icon-bg-gradient-top)"/>
            <stop offset="100%" style="stop-color:var(--aw-color-marker-icon-bg-gradient-bottom)"/>
          </linearGradient>
        </defs>
        <path fill="url(#markerGradient)" stroke="var(--aw-color-marker-icon-border)" stroke-width="1" d="M12.5 0C5.6 0 0 5.6 0 12.5c0 9.4 12.5 28.5 12.5 28.5S25 21.9 25 12.5C25 5.6 19.4 0 12.5 0z"/>
        <circle cx="12.5" cy="12.5" r="5" fill="var(--aw-color-marker-icon-circle-point)"/>
      </svg>`,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

export const createHotelPopupContent = (hotel: Hotel, isHotelInCart: boolean): string => {
  const rateHtml = hotel.rate ? `<span class="hotel-popup__rate">⭐ ${hotel.rate}</span>` : ''
  const atcButtonDisabled = isHotelInCart ? 'disabled' : ''
  const atcButtonText = isHotelInCart ? 'In Cart' : 'Book Now'

  return `
    <div class="hotel-popup">
      <div class="hotel-popup__image-container">
        <img src="${hotel.image.url}" alt="${hotel.image.alt}" class="hotel-popup__image" />
        ${rateHtml}
      </div>
      <div class="hotel-popup__content">
        <div class="hotel-popup__head">
          <div class="hotel-popup__title-price">
            <h3 class="hotel-popup__title">${hotel.name}</h3>
            <div class="hotel-popup__price">
              <span class="hotel-popup__price-value">${hotel.price}</span>
              <span class="hotel-popup__price-currency">${hotel.currency}</span>
            </div>
          </div>
          <div class="cart-item-head__buttons">
            <button ${atcButtonDisabled} class="hotel-popup__atc-button" type="button">${atcButtonText}</button>
            <button class="hotel-popup__details-button" type="button">See more</button>
          </div>
        </div>
        <p class="hotel-popup__description">${hotel.description.general}</p>
      </div>
    </div>
  `
}

export const updatePopupContentOnOpen = ({
  marker,
  hotel,
  isHotelInCart,
}: {
  marker: Leaflet.Marker
  hotel: Hotel
  isHotelInCart: (hotel: Hotel) => boolean
}) => {
  marker.on('popupopen', function (this: Leaflet.Marker) {
    const popup = this.getPopup()
    popup?.setContent(createHotelPopupContent(hotel, isHotelInCart(hotel)))
  })
}

interface LeafletEventWithOriginalEvent extends LeafletEvent {
  originalEvent: Event
}
export const openHotelModalOnMarkerClick = ({
  marker,
  hotel,
  isTouchDevice,
  openHotelModal,
}: {
  marker: Leaflet.Marker
  hotel: Hotel
  isTouchDevice: boolean
  openHotelModal: (hotel: Hotel) => void
}) => {
  if (!isTouchDevice) {
    marker.on('click', function (this: Leaflet.Marker, leafletEvent: LeafletEvent) {
      const event = leafletEvent as LeafletEventWithOriginalEvent
      event.originalEvent.stopPropagation()
      openHotelModal(hotel)
    })
  }
}

export const openOrClosePopupOnMarkerHover = ({
  marker,
  isTouchDevice,
}: {
  marker: Leaflet.Marker
  isTouchDevice: boolean
}) => {
  if (!isTouchDevice) {
    marker
      .on('mouseover', function (this: Leaflet.Marker) {
        this.openPopup()
      })
      .on('mouseout', function (this: Leaflet.Marker) {
        const popup = this.getPopup()
        const popupElem = popup?.getElement() || undefined
        // Delay close to allow hover over popup
        setTimeout(() => {
          const isHoveringPopup = !!popupElem && popupElem.matches(':hover')
          if (!isHoveringPopup) {
            this.closePopup()
          } else {
            // If currently hovering popup, close when user leaves the popup element
            if (popupElem && !popupElem.dataset.leaveBound) {
              popupElem.dataset.leaveBound = 'true'
              const onLeave = () => {
                delete popupElem.dataset.leaveBound
                this.closePopup()
              }
              popupElem.addEventListener('mouseleave', onLeave, { once: true })
            }
          }
        }, 300)
      })
  }
}

export const openHotelModalOnPopupClick = ({
  marker,
  hotel,
  openHotelModal,
}: {
  marker: Leaflet.Marker
  hotel: Hotel
  openHotelModal: (hotel: Hotel) => void
}) => {
  const resolvedClickHandler = (event: Event) => {
    marker.closePopup()
    event.stopPropagation()
    openHotelModal(hotel)
  }
  marker.on('popupopen', function (this: Leaflet.Marker) {
    const popup = this.getPopup()
    const popupElem = popup?.getElement()
    popupElem?.addEventListener('click', resolvedClickHandler)
  })
  marker.on('popupclose', function (this: Leaflet.Marker) {
    const popup = this.getPopup()
    const popupElem = popup?.getElement()
    popupElem?.removeEventListener('click', resolvedClickHandler)
  })
}

export const addToCartOnAtcButtonClick = ({
  marker,
  hotel,
  addHotelToCart,
  isHotelInCart,
}: {
  marker: Leaflet.Marker
  hotel: Hotel
  addHotelToCart: (hotel: Hotel) => void
  isHotelInCart: (hotel: Hotel) => boolean
}) => {
  const resolvedClickHandler = (event: Event) => {
    event.stopPropagation()
    addHotelToCart(hotel)
    const popup = marker.getPopup()
    popup?.setContent(createHotelPopupContent(hotel, isHotelInCart(hotel)))
  }
  marker.on('popupopen', function (this: Leaflet.Marker) {
    const popup = this.getPopup()
    const popupElem = popup?.getElement()
    const atcButton = popupElem?.querySelector('.hotel-popup__atc-button') as HTMLButtonElement | null | undefined
    atcButton?.addEventListener('click', resolvedClickHandler)
  })
  marker.on('popupclose', function (this: Leaflet.Marker) {
    const popup = this.getPopup()
    const popupElem = popup?.getElement()
    const atcButton = popupElem?.querySelector('.hotel-popup__atc-button') as HTMLButtonElement | null | undefined
    atcButton?.removeEventListener('click', resolvedClickHandler)
  })
}
