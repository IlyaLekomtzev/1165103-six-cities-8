import { combineReducers } from 'redux';
import { offersReducer } from './offers/offers-reducer';
import { authReducer } from './auth/auth-reducer';
import { roomReducer } from './room/room-reducer';

export enum NameSpace {
  Offers = 'OFFERS',
  Auth = 'AUTH',
  Room = 'ROOM',
}

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersReducer,
  [NameSpace.Auth]: authReducer,
  [NameSpace.Room]: roomReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
