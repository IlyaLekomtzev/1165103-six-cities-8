import { ThunkActionResult } from '../types/action';
import {
  setIsLoading,
  setOffers,
  setError,
  setAuthorizationStatus,
  setUserData,
  redirectToRoute,
  requireLogout
} from './action';
import { Offer } from '../types/offers';
import { AuthorizationStatus, APIRoute, AppRoute } from '../const';
import { convertSnakeToCamelCase } from '../utils/convertSnakeToCamelCase';
import { saveToken, dropToken } from '../services/token';
import { toast } from 'react-toastify';
import { AuthData, UserData } from '../types/auth-data';

const NO_AUTH_MESSAGE = 'Не забудьте авторизоваться';
const AUTH_FAIL_MESSAGE = 'Не удалось авторизоваться. Проверьте введённые данные';
const AUTH_SUCCESS_MESSAGE = 'Вы успешно авторизованы';

export const fetchOffersAction = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  dispatch(setIsLoading(true));
  try {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    const adaptedData = data.map((item) => convertSnakeToCamelCase(item));
    dispatch(setOffers(adaptedData));
  } catch {
    dispatch(setError('Произошла ошибка загрузки данных.'));
  }
  dispatch(setIsLoading(false));
};

export const checkAuthAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.get(APIRoute.Login);
    const adaptedData: UserData = convertSnakeToCamelCase(data);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserData(adaptedData));
    toast.success(AUTH_SUCCESS_MESSAGE);
  } catch {
    toast.info(NO_AUTH_MESSAGE);
  }
};

export const loginAction = ({ email, password }: AuthData): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.post(APIRoute.Login, { email, password });
    const adaptedData: UserData = convertSnakeToCamelCase(data);
    saveToken(adaptedData.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserData(adaptedData));
    toast.success(AUTH_SUCCESS_MESSAGE);
    dispatch(redirectToRoute(AppRoute.Main));
  } catch {
    toast.error(AUTH_FAIL_MESSAGE);
  }
};

export const logoutAction = (): ThunkActionResult => async (dispatch, _getState, api) => {
  api.delete(APIRoute.Logout);
  dropToken();
  dispatch(requireLogout());
};
