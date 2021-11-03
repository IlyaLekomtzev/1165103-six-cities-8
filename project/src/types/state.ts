import { Offer } from './offers';
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
  authorizationStatus: string,
  user: UserData,
};

export type State = RootState;
