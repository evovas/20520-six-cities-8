import {commerce, image, datatype, helpers, name, address, date} from 'faker';
import {City, Location, Offer, Review, User} from '../types/data';
import {getRandomPositiveInteger} from '../utils';
import dayjs from 'dayjs';

export const makeFakeUser = (): User => ({
  id: getRandomPositiveInteger(1, 100000),
  name: name.firstName(),
  avatarUrl: image.imageUrl(),
  isPro: datatype.boolean(),
});

export const makeFakeLocation = (): Location => ({
  latitude: +address.latitude(),
  longitude: +address.longitude(),
  zoom: getRandomPositiveInteger(8, 12),
});

export const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: address.city(),
});

export const makeFakeOffer = (): Offer => ({
  id: getRandomPositiveInteger(1, 10000000),
  bedrooms: getRandomPositiveInteger(1, 6),
  city: makeFakeCity(),
  description: commerce.productDescription(),
  goods: [commerce.productMaterial(), commerce.productMaterial(), commerce.productMaterial()],
  host: makeFakeUser(),
  images: [
    image.imageUrl(),
    image.imageUrl(),
    image.imageUrl(),
    image.imageUrl(),
    image.imageUrl(),
    image.imageUrl(),
    image.imageUrl(),
    image.imageUrl(),
    image.imageUrl(),
  ],
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  location: makeFakeLocation(),
  maxAdults: getRandomPositiveInteger(1, 6),
  previewImage: image.imageUrl(),
  price: getRandomPositiveInteger(100, 1000),
  rating: getRandomPositiveInteger(10, 50) / 10,
  title: commerce.productName(),
  type: helpers.randomize(['apartment', 'room', 'house', 'hotel']),
});

export const makeFakeReview = (): Review => ({
  id: getRandomPositiveInteger(1, 10000000),
  comment: datatype.string(getRandomPositiveInteger(50, 300)),
  date: dayjs(date.past()).toISOString(),
  rating: getRandomPositiveInteger(1, 5),
  user: makeFakeUser(),
});
