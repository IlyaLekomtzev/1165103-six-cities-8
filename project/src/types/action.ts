import {
  ThunkAction,
  ThunkDispatch
} from 'redux-thunk';
import { AxiosInstance } from 'axios';
import { State } from './state';
import * as actions from '../store/action';

export enum ActionType {
  SetCity = 'offers/setCity',
  SetSort = 'offers/setSort',
  SetOffers = 'offers/setOffers',
  SetOfferMain = 'offers/setOffer',
  SetIsLoading = 'offers/setIsLoading',
  SetError = 'offers/setError',

  SetAuthorizationStatus = 'auth/setAuthorizationStatus',
  SetUserData = 'auth/setUserData',
  RedirectToRoute = 'auth/redirectToRoute',
  RequireLogout = 'auth/requireLogout',

  SetOffer = 'room/setOffer',
  SetReviews = 'room/setReviews',
  SetNearbyOffers = 'room/setNearbyOffers',
  SetIsLoadingRoom = 'room/setIsLoadingRoom',
  SetErrorRoom = 'room/setErrorRoom',

  SetFavoriteOffers = 'favorite/setFavoriteOffers',
  SetFavoriteIsLoading = 'favorite/setFavoriteIsLoading',
}

type InferValueTypes<T> = T extends {[key: string]: infer U} ? U : never;

export type Actions = ReturnType<InferValueTypes<typeof actions>>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
