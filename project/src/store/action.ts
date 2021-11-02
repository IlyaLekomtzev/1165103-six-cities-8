import { ActionType } from '../types/action';
import { Offer } from '../types/offers';
import { UserData } from '../types/auth-data';
import { AppRoute } from '../const';

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

export const setAuthorizationStatus = (status: string) => ({
  type: inferLiteralFromString(ActionType.SetAuthorizationStatus),
  payload: status,
} as const);

export const setUserData = (userData: UserData) => ({
  type: inferLiteralFromString(ActionType.SetUserData),
  payload: userData,
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: inferLiteralFromString(ActionType.RedirectToRoute),
  payload: url,
} as const);

export const requireLogout = () => ({
  type: inferLiteralFromString(ActionType.RequireLogout),
} as const);
