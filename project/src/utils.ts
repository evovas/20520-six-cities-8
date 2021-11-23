import {Offer} from './types/data';

export const calculateRatingStars = (rating: number): string => {
  const STARS_COUNT = 5;
  return `${Math.round(rating) * 100 / STARS_COUNT}%`;
};

export const spliceOffersByCity = (offers: Offer[]): {[key: string]: Offer[]} => (
  offers.reduce<{[city: string]: Offer[]}>((acc, offer)=> {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {})
);

export const getRandomPositiveInteger = (a: number, b:number): number => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};
