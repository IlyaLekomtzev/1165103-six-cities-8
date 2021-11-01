import { ActionType } from '../types/action';
import { Offer } from '../types/offers';

const inferLiteral = <U, T extends U>(arg: T): T => arg;
const inferLiteralFromString = <T extends string>(arg: T): T => inferLiteral<string, T>(arg);

export const setCity = (city: string) => ({
  type: inferLiteralFromString(ActionType.SetCity),
  payload: city,
} as const);

export const setSort = (sort: string) => ({
  type: inferLiteralFromString(ActionType.SetSort),
  payload: sort,
} as const);

export const setOffers = (offers: Offer[]) => ({
  type: inferLiteralFromString(ActionType.SetOffers),
  payload: offers,
} as const);

export const setIsLoading = (isLoading: boolean) => ({
  type: inferLiteralFromString(ActionType.SetIsLoading),
  payload: isLoading,
} as const);

export const setError = (error: string) => ({
  type: inferLiteralFromString(ActionType.SetError),
  payload: error,
} as const);
