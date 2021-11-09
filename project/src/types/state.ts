import { Offer } from './offers';
import { Review } from './reviews';
import { RootState } from '../store/root-reducer';
import { UserData } from './auth-data';

export type OffersReducerState = {
  city: string;
  sort: string;
  offers: Offer[];
  isLoading: boolean;
  error: string;
};

export type AuthReducerState = {
  authorizationStatus: string;
  user: UserData;
};

export type RoomReducerState = {
  offer: Offer | null;
  nearbyOffers: Offer[];
  reviews: Review[];
  isLoading: boolean;
  error: string;
};

export type FavoriteReducerState = {
  offers: Offer[];
  isLoading: boolean;
};

export type State = RootState;
