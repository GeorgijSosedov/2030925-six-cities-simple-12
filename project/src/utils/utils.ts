import { Comments } from '../types/review-type';

export const countCurrrentRating = (rating: number) => `${rating * 20}%`;

export const parseDate = (date: string) => {
  const currentDate = new Date(date);
  const month = currentDate.toLocaleString('default', { month: 'long' });
  return `${month} ${currentDate.getFullYear()}`;
};

export function sortReviews(reviews: Comments): Comments {
  const newReviews = [...reviews];
  newReviews.sort((review1, review2) => review1.date > review2.date ? -1 : 1);
  return newReviews;
}

export function makeHash(obj: object): string {
  return JSON.stringify(obj);
}

export function capitalizeFirstLetter(text: string): string {
  const head = text.charAt(0);
  const tail = text.slice(1);
  return head.toUpperCase() + tail;
}
