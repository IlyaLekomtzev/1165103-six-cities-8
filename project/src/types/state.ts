import { Offer } from './offers';

export type State = {
  city: string;
  offers: Offer[];
  isLoading: boolean;
  error: string;
};