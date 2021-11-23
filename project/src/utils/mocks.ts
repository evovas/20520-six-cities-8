import {commerce, image, datatype, helpers, name, address, date, internet} from 'faker';
import dayjs from 'dayjs';
import {getRandomPositiveInteger} from '../utils';
import {
  City,
  CurrentUser,
  ServerCurrentUser,
  Location,
  Offer,
  Review,
  ServerOffer,
  User,
  ServerUser, ServerReview, ReviewPost
} from '../types/data';
import {CITIES_LIST} from '../const';

export const makeFakeUser = (): User => ({
  id: getRandomPositiveInteger(1, 100000),
  name: name.firstName(),
  avatarUrl: image.imageUrl(),
  isPro: datatype.boolean(),
});

export const makeFakeServerUser = (): ServerUser => ({
  id: getRandomPositiveInteger(1, 100000),
  name: name.firstName(),
  'avatar_url': image.imageUrl(),
  'is_pro': datatype.boolean(),
});

export const makeFakeCurrentUser = (): CurrentUser => ({
  id: getRandomPositiveInteger(1, 100000),
  avatarUrl: image.imageUrl(),
  email: internet.email(),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(25),
});

export const makeFakeCurrentUserServer = (): ServerCurrentUser => ({
  id: getRandomPositiveInteger(1, 100000),
  'avatar_url': image.imageUrl(),
  email: internet.email(),
  'is_pro': datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(25),
});

export const makeFakeLocation = (): Location => ({
  latitude: +address.latitude(),
  longitude: +address.longitude(),
  zoom: getRandomPositiveInteger(8, 12),
});

export const makeFakeCity = (): City => ({
  location: makeFakeLocation(),
  name: helpers.randomize(CITIES_LIST),
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

export const makeFakeServerOffer = (): ServerOffer => ({
  id: getRandomPositiveInteger(1, 10000000),
  bedrooms: getRandomPositiveInteger(1, 6),
  city: makeFakeCity(),
  description: commerce.productDescription(),
  goods: [commerce.productMaterial(), commerce.productMaterial(), commerce.productMaterial()],
  host: makeFakeServerUser(),
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
  'is_favorite': datatype.boolean(),
  'is_premium': datatype.boolean(),
  location: makeFakeLocation(),
  'max_adults': getRandomPositiveInteger(1, 6),
  'preview_image': image.imageUrl(),
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

export const makeFakeServerReview = (): ServerReview => ({
  id: getRandomPositiveInteger(1, 10000000),
  comment: datatype.string(getRandomPositiveInteger(50, 300)),
  date: dayjs(date.past()).toISOString(),
  rating: getRandomPositiveInteger(1, 5),
  user: makeFakeServerUser(),
});

export const makeFakeReviewPost = (): ReviewPost => ({
  comment: datatype.string(getRandomPositiveInteger(50, 300)),
  rating: getRandomPositiveInteger(1, 5).toString(),
});
