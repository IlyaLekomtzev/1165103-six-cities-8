export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH'
}

export enum MapIcon {
  Default = '/img/pin.svg',
  Current = '/img/pin-active.svg'
}

export enum OffersSortValue {
  Popular = 'popular',
  PriceLowToHigh = 'price-low-to-high',
  PriceHighToLow = 'price-high-to-low',
  TopRatedFirst = 'top-rated-first',
}

export enum APIRoute {
  Offers = '/hotels',
}

export const cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const offersSortValues = [
  {
    title: 'Popular',
    value: OffersSortValue.Popular,
  },
  {
    title: 'Price: low to high',
    value: OffersSortValue.PriceLowToHigh,
  },
  {
    title: 'Price: high to low',
    value: OffersSortValue.PriceHighToLow,
  },
  {
    title: 'Top rated first',
    value: OffersSortValue.TopRatedFirst,
  },
];
