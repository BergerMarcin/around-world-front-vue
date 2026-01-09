export interface Hotel {
  sku: string;
  title: string;
  location_country: string;
  location_region: string;
  location_coordinates_latitude: number;
  location_coordinates_longitude: number;
  rate?: number | null;
  source_url?: string | null;
  image: string;
  image_file: string;
  price: number;
  currency: string;
  category: "hotel";
  description_general: string;
  description_location: string;
  description_hotel: string;
  description_food_drinks: string;
  description_room: string;
  description_beach: string;
  description_sport_entertainment: string;
}

export type CartItem = Hotel

export enum ProviderKey {
  BACKEND_API_SERVICE = 'backendApiService',
  LOGS_CONTAINER = 'logsContainer',
}
