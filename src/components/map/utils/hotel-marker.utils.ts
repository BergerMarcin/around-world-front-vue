import Leaflet, { type LeafletEvent } from 'leaflet'
import { imageUrlFromHotel, rateStandardized } from '@/utils/hotel-details.utils'
import type { Hotel } from '@/types/global.types'
import { LogLevel } from '@/utils/logger'

export const customIcon = Leaflet.divIcon({
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

export function createHotelPopupContent(hotel: Hotel): string {
  const imageUrl = imageUrlFromHotel(hotel)
  const rate = rateStandardized(hotel)
  const rateHtml = rate ? `<span class="hotel-popup__rate">⭐ ${rate}</span>` : ''

  return `
    <div class="hotel-popup">
      <div class="hotel-popup__image-container">
        <img src="${imageUrl}" alt="${hotel.title}" class="hotel-popup__image" />
        ${rateHtml}
      </div>
      <div class="hotel-popup__content">
        <div class="hotel-popup__header">
          <div class="hotel-popup__title-price">
            <h3 class="hotel-popup__title">${hotel.title}</h3>
            <div class="hotel-popup__price">
              <span class="hotel-popup__price-value">${hotel.price}</span>
              <span class="hotel-popup__price-currency">${hotel.currency}</span>
            </div>
          </div>
          <button class="hotel-popup__details-button" type="button">See more</button>
        </div>
        <p class="hotel-popup__description">${hotel.description_general}</p>
      </div>
    </div>
  `
}

// TODO: Remove `devLog`
interface LeafletEventWithOriginalEvent extends LeafletEvent {
  originalEvent: Event
}
export const modalOpenOnMarkerClick = ({
  marker,
  hotel,
  isTouchDevice,
  markerClickHandler,
  devLog,
}: {
  marker: Leaflet.Marker
  hotel: Hotel
  isTouchDevice: boolean
  markerClickHandler: (hotel: Hotel) => (event: Event) => void
  devLog: (...args: unknown[]) => void
}) => {
  if (!isTouchDevice) {
    const resolvedClickHandler = markerClickHandler(hotel)
    marker.on('click', function (this: Leaflet.Marker, event: LeafletEventWithOriginalEvent) {
      resolvedClickHandler(event.originalEvent)
      devLog(`Marker clicked: ${hotel.title}`)
    })
  }
}

// TODO: Remove `devLog`
export const popupOpenOnMarkerHover = ({
  marker,
  hotel,
  isTouchDevice,
  devLog,
}: {
  marker: Leaflet.Marker
  hotel: Hotel
  isTouchDevice: boolean
  devLog: (...args: unknown[]) => void
}) => {
  if (!isTouchDevice) {
    marker
      .on('mouseover', function (this: Leaflet.Marker) {
        this.openPopup()
        devLog(`Mouseover hotel marker ${hotel.title}`)
      })
      .on('mouseout', function (this: Leaflet.Marker) {
        const popup = this.getPopup()
        const popupElem = popup?.getElement() || undefined
        // Delay close to allow hover over popup
        setTimeout(() => {
          const isHoveringPopup = !!popupElem && popupElem.matches(':hover')
          if (!isHoveringPopup) {
            this.closePopup()
            devLog(LogLevel.warn, `Mouseout hotel marker ${hotel.title} (closed after 300ms)`)
          } else {
            // If currently hovering popup, close when user leaves the popup element
            devLog(`Mouseout ignored: hovering popup for ${hotel.title}`)
            if (popupElem && !popupElem.dataset.leaveBound) {
              popupElem.dataset.leaveBound = 'true'
              const onLeave = () => {
                delete popupElem.dataset.leaveBound
                this.closePopup()
                devLog(LogLevel.error, `Popup mouseleave -> closed ${hotel.title}`)
              }
              popupElem.addEventListener('mouseleave', onLeave, { once: true })
            }
          }
        }, 300)
      })
  }
}

// TODO: Remove `devLog`
export const modalOpenOnPopupClick = ({
  marker,
  hotel,
  popupClickHandler,
  devLog,
}: {
  marker: Leaflet.Marker
  hotel: Hotel
  popupClickHandler: (hotel: Hotel) => (event: Event) => void
  devLog: (...args: unknown[]) => void
}) => {
  const resolvedClickHandler = (event: Event) => {
    marker.closePopup()
    popupClickHandler(hotel)(event)
  }
  marker.on('popupopen', function (this: Leaflet.Marker) {
    const popup = this.getPopup()
    const popupElem = popup?.getElement()
    if (popupElem) {
      popupElem.addEventListener('click', resolvedClickHandler)
    }
  })
  marker.on('popupclose', function (this: Leaflet.Marker) {
    const popup = this.getPopup()
    const popupElem = popup?.getElement()
    if (popupElem) {
      popupElem.removeEventListener('click', resolvedClickHandler)
      devLog(LogLevel.warn, `Removed event listener of popupClickHandler. ${hotel.title}`)
    }
  })
}
