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
  setErrorRoom,
  setFavoriteOffers,
  setFavoriteIsLoading
} from './action';
import { AuthorizationStatus, APIRoute, AppRoute, Message } from '../const';
import { convertSnakeToCamelCase } from '../utils/convertSnakeToCamelCase';
import { saveToken, dropToken } from '../services/token';
import { toast } from 'react-toastify';
import { AuthData, UserData } from '../types/auth-data';
import { Review, SendReview } from '../types/reviews';
import { Offer } from '../types/offers';

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
  const { data } = await api.get(APIRoute.Login);

  if (data) {
    const adaptedData: UserData = convertSnakeToCamelCase(data);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserData(adaptedData));
    toast.success(Message.AuthSuccess);
  }
};

export const loginAction = ({ email, password }: AuthData): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const { data } = await api.post(APIRoute.Login, { email, password });
    const adaptedData: UserData = convertSnakeToCamelCase(data);
    saveToken(adaptedData.token);
    dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
    dispatch(setUserData(adaptedData));
    toast.success(Message.AuthSuccess);
    dispatch(redirectToRoute(AppRoute.Main));
  } catch {
    toast.error(Message.AuthFail);
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
    toast.success(Message.SendReviewSuccess);
  } catch {
    toast.success(Message.SendReviewFail);
  }
};

export const getFavorites = (): ThunkActionResult => async (dispatch, _getState, api) => {
  dispatch(setFavoriteIsLoading(true));
  try {
    const { data } = await api.get(APIRoute.Favorite);
    const adaptedData: Offer[] = data.map((offer: any) => convertSnakeToCamelCase(offer));
    dispatch(setFavoriteOffers(adaptedData));
  } catch {
    toast.error(Message.SendFavoriteLoadFail);
  }
  dispatch(setFavoriteIsLoading(false));
};

export const sendFavorite = (id: number, isFavorite: boolean): ThunkActionResult => async (dispatch, _getState, api) => {
  try {
    const status = isFavorite ? 0 : 1;
    const { data } = await api.post(`${APIRoute.Favorite}/${id}/${status}`);
    const adaptedData: Offer = convertSnakeToCamelCase(data);

    dispatch(fetchOffersAction());
    dispatch(getFavorites());
    dispatch(getRoom(`${id}`));

    toast.success(adaptedData.isFavorite ? Message.SendFavoriteAddSuccess : Message.SendFavoriteRemoveSuccess);
  } catch {
    toast.error(Message.SendFavoriteFail);
  }
};
