export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
  NotFound = '/not-found',
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
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite',
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

export enum Message {
  AuthFail = 'Не удалось авторизоваться. Проверьте введённые данные',
  AuthSuccess = 'Вы успешно авторизованы',
  SendReviewSuccess = 'Отзыв успешно отправлен',
  SendReviewFail = 'Не удалось отправить отзыв',
  SendFavoriteLoadFail = 'Не удалось загрузить избранные предложения',
  SendFavoriteAddSuccess = 'Предложение успешно добавлено в избранное',
  SendFavoriteRemoveSuccess = 'Предложение успешно удалено из избранного',
  SendFavoriteFail = 'Не удалось добавить предложение в избранное',
}

export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
