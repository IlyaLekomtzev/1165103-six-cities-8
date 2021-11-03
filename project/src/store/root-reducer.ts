import { combineReducers } from 'redux';
import { offersReducer } from './offers/offers-reducer';
import { authReducer } from './auth/auth-reducer';

export enum NameSpace {
  Offers = 'OFFERS',
  Auth = 'AUTH',
}

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersReducer,
  [NameSpace.Auth]: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
