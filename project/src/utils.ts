export const calculateRatingStars = (rating: number): string => {
  const STARS_COUNT = 5;
  return `${Math.round(rating) * 100 / STARS_COUNT}%`;
};
