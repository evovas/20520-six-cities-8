export type User = {
  id: number;
  name: string;
  avatarUrl: string;
  isPro: boolean;
}

export type ServerUser = {
  id: number;
  name: string;
  'avatar_url'?: string;
  'is_pro'?: boolean;
}

export type CurrentUser = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
}

export type CurrentUserServer = {
  'avatar_url'?: string;
  email: string;
  id: number;
  'is_pro'?: boolean;
  name: string;
  token: string;
}

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  location: Location;
  name: string;
}

export type Offer = {
  id: number;
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: User;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type ServerOffer = {
  id: number;
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: ServerUser;
  images: string[];
  'is_favorite'?: boolean;
  'is_premium'?: boolean;
  location: Location;
  'max_adults'?: number;
  'preview_image'?: string;
  price: number;
  rating: number;
  title: string;
  type: string;
}

export type Review = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: User;
}

export type ServerReview = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user: ServerUser;
}

export type ReviewPost = {
  comment: string;
  rating: string;
}

export type ServerFavoriteStatus = 0 | 1;
