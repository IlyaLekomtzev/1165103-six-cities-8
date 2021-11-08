import { combineReducers } from 'redux';
import { offersReducer } from './offers/offers-reducer';
import { authReducer } from './auth/auth-reducer';
import { roomReducer } from './room/room-reducer';
import { favoriteReducer } from './favorite/favorite-reducer';

export enum NameSpace {
  Offers = 'OFFERS',
  Auth = 'AUTH',
  Room = 'ROOM',
  Favorite = 'FAVORITE',
}

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersReducer,
  [NameSpace.Auth]: authReducer,
  [NameSpace.Room]: roomReducer,
  [NameSpace.Favorite]: favoriteReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
