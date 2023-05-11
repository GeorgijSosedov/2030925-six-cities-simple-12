export enum Approute {
  Main = '/',
  Login = '/login',
  Offer = '/offer',
  Room = '/offer/:id',
}

export enum ApiRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}

export const AUTH_TOKEN_KEY_NAME = 'offers-token';

export type Token = string;

export const CITIES: string[] = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Offers = 'OFFERS',
  City = 'CITY',
  User = 'USER',
  Comments = 'COMMENTS',
}
