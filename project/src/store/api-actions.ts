import { ThunkActionResult } from '../types/action';
import {
  setIsLoading,
  setOffers,
  setError,
  setAuthorizationStatus,
  setUserData,
  redirectToRoute,
  requireLogout,
  setOffer,
  setIsLoadingRoom,
  setReviews,
  setNearbyOffers,
  setErrorRoom
} from './action';

import { AuthorizationStatus, APIRoute, AppRoute } from '../const';
import { convertSnakeToCamelCase } from '../utils/convertSnakeToCamelCase';
import { saveToken, dropToken } from '../services/token';
import { toast } from 'react-toastify';
import { AuthData, UserData } from '../types/auth-data';
import { Review, SendReview } from '../types/reviews';
import { Offer } from '../types/offers';

const NO_AUTH_MESSAGE = 'Не забудьте авторизоваться';
const AUTH_FAIL_MESSAGE = 'Не удалось авторизоваться. Проверьте введённые данные';
const AUTH_SUCCESS_MESSAGE = 'Вы успешно авторизованы';
const SEND_REVIEW_SUCCESS_MESSAGE = 'Отзыв успешно отправлен';
const SEND_REVIEW_FAIL_MESSAGE = 'Не удалось отправить отзыв';

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

export const getRoom = (id: string): ThunkActionResult => async (dispatch, _getState, api) => {
  dispatch(setIsLoadingRoom(true));
  try {
    dispatch(setErrorRoom(''));

    const { data: offer } = await api.get(`${APIRoute.Offers}/${id}`);
    const adaptedOffer: Offer = convertSnakeToCamelCase(offer);

    const { data: comments } = await api.get(`${APIRoute.Comments}/${id}`);
    const adaptedComments: Review[] = comments.map((comment: any) => convertSnakeToCamelCase(comment));

    const { data: nearbyOffers } = await api.get(`${APIRoute.Offers}/${id}/nearby`);
    const adaptedNearbyOffers: Offer[] = nearbyOffers.map((nearbyOffer: any) => convertSnakeToCamelCase(nearbyOffer));

    dispatch(setOffer(adaptedOffer));
    dispatch(setReviews(adaptedComments));
    dispatch(setNearbyOffers(adaptedNearbyOffers));
  } catch {
    dispatch(setErrorRoom('Не удалось загузить данные о предложении!'));
  }
  dispatch(setIsLoadingRoom(false));
};

type sendReviewType = SendReview & {
  id: string;
}

export const sendReview = ({ id, rating, comment }: sendReviewType): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.post(`${APIRoute.Comments}/${id}`, { rating, comment });
    const adaptedData: Review[] = data.map((review: any) => convertSnakeToCamelCase(review));
    dispatch(setReviews(adaptedData));
    toast.success(SEND_REVIEW_SUCCESS_MESSAGE);
  } catch {
    toast.error(SEND_REVIEW_FAIL_MESSAGE);
  }
};
