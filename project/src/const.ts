export const CITIES_LIST = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum AppRoute {
  Favorites = '/favorites',
  Login = '/login',
  Room = '/offer/:id',
  Root = '/'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortingOption {
  Popular = 'Popular',
  PriceLowFirst = 'Price: low to high',
  PriceHighFirst = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum FetchStatus {
  Idle = 'IDLE',
  Loading = 'LOADING',
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Nearby = '/nearby',
  Comments = '/comments',
}
