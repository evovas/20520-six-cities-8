import {City, Location, Offers} from '../types/offers';
import {USERS} from './users';

const getRandomImageSrc = (): string => `https://picsum.photos/260/200?random=${Math.random()}`;

export const OFFERS: Offers = [
  {
    id: 1,
    bedrooms: 3,
    city: {
      location: {
        latitude: 52.100000,
        longitude: 4.500000,
        zoom: 10,
      },
      name: 'Amsterdam',
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    goods: ['Lorem ipsum', 'Adipiscing elit', 'Tempor incididunt', 'Magna', 'Aliqua'],
    host: USERS[0],
    images: [getRandomImageSrc(), getRandomImageSrc(), getRandomImageSrc()],
    isFavorite: true,
    isPremium: true,
    location: {
      latitude: 52.150000,
      longitude: 4.550000,
      zoom: 8,
    },
    maxAdults: 4,
    previewImage: getRandomImageSrc(),
    price: 100,
    rating: 4.2,
    title: 'Lorem ipsum dolor sit amet',
    type: 'apartment',
  },
  {
    id: 2,
    bedrooms: 4,
    city: {
      location: {
        latitude: 52.200000,
        longitude: 4.600000,
        zoom: 10,
      },
      name: 'Paris',
    },
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    goods: ['Ut enim ad', 'Quis nostrud', 'Laboris nisi', 'Commodo', 'Consequat'],
    host: USERS[1],
    images: [getRandomImageSrc(), getRandomImageSrc(), getRandomImageSrc()],
    isFavorite: false,
    isPremium: false,
    location: {
      latitude: 52.250000,
      longitude: 4.650000,
      zoom: 8,
    },
    maxAdults: 3,
    previewImage: getRandomImageSrc(),
    price: 200,
    rating: 3.6,
    title: 'Ullamco laboris nisi ut aliquip',
    type: 'house',
  },
  {
    id: 3,
    bedrooms: 2,
    city: {
      location: {
        latitude: 52.300000,
        longitude: 4.700000,
        zoom: 10,
      },
      name: 'Moscow',
    },
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    goods: ['Duis aute', 'Reprehenderit', 'Fugiat nulla', 'Cillum', 'Dolore'],
    host: USERS[2],
    images: [getRandomImageSrc(), getRandomImageSrc(), getRandomImageSrc()],
    isFavorite: true,
    isPremium: false,
    location: {
      latitude: 52.350000,
      longitude: 4.750000,
      zoom: 8,
    },
    maxAdults: 2,
    previewImage: getRandomImageSrc(),
    price: 300,
    rating: 4.8,
    title: 'Duis aute irure dolor',
    type: 'hotel room',
  },
  {
    id: 4,
    bedrooms: 6,
    city: {
      location: {
        latitude: 52.400000,
        longitude: 4.800000,
        zoom: 10,
      },
      name: 'Berlin',
    },
    description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    goods: ['Excepteur sint', 'Officia deserunt', 'deserunt', 'Mollit anim', 'Est laborum'],
    host: USERS[3],
    images: [getRandomImageSrc(), getRandomImageSrc(), getRandomImageSrc()],
    isFavorite: false,
    isPremium: true,
    location: {
      latitude: 52.450000,
      longitude: 4.850000,
      zoom: 8,
    },
    maxAdults: 10,
    previewImage: getRandomImageSrc(),
    price: 400,
    rating: 4.9,
    title: 'Excepteur sint occaecat cupidatat',
    type: 'penthouse',
  }
];
