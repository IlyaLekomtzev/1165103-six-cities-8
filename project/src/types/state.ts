import { Offer } from './offers';

export type State = {
  city: string;
  sort: string;
  offers: Offer[];
  isLoading: boolean;
  error: string;
};
