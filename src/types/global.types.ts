export interface Hotel {
  sku: string
  name: string
  location: {
    country: string
    region: string
    coordinates: { latitude: number; longitude: number }
  }
  rate: string
  sourceUrl?: string
  image: {
    url: string
    alt: string
    sourceUrl: string
  }
  price: number
  currency: string
  category: 'hotel'
  description: {
    general: string
    location: string
    hotel: string
    foodDrinks: string
    room: string
    beach: string
    sportEntertainment: string
  }
}

export type CartItem = Hotel

export enum ProviderKey {
  BACKEND_API_SERVICE = 'backendApiService',
  LOGS_CONTAINER = 'logsContainer',
}

export const NO_IMAGE = {
  URL: 'src/assets/no_picture.png',
  ALT: 'No picture available',
} as const
