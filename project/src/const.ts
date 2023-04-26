import { Offer, Offers } from './types/offer-type';
export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';
export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export enum AppRoute {
    Main = '/',
    Login = '/login',
    Room = '/offer/:id',

}

export enum ApiRoute {
  Places = '/hotels',
  Login = '/login',
  LogOut = '/logOut',
}

export enum AVATAR_URL {
    Angelina = '/img/avatar-angelina.jpg',
    Max = '/img/avatar-max.jpg'
}

export const getOffersByCity = (offers: Offers, city: string) => {
  const result = offers.filter((offer) => offer.city.name === city);
  return result;
};

export enum SortBy {
  Popular = 'Popular',
  LowToHigh = 'Price: low to high',
  HighToLow = 'Price: high to low',
  TopRated = 'Price: top rated first'
}

export const SortToLow = (a: Offer, b: Offer) => a.cost - b.cost;

export const SortToHigh = (a: Offer, b: Offer) => b.cost - a.cost;

export const SortTopRated = (a: Offer, b: Offer) => b.rating - a.rating;

export const BasicURL = 'https://12.react.pages.academy/six-cities-simple';

export const REQUEST_TIMEOUT = 5000;

export const cities: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}
