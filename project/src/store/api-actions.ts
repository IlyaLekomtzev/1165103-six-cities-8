import { ThunkActionResult } from '../types/action';
import { setIsLoading, setOffers, setError } from './action';
import { APIRoute } from '../const';
import { Offer } from '../types/offers';
import { convertSnakeToCamelCase } from '../utils/convertSnakeToCamelCase';

export const fetchOffersAction = (): ThunkActionResult => async (dispatch, _getState, api): Promise<void> => {
  dispatch(setIsLoading(true));
  try {
    const { data } = await api.get<Offer[]>(APIRoute.Offers);
    const adaptedData = data.map((item) => convertSnakeToCamelCase(item));
    dispatch(setOffers(adaptedData));
  } catch (e) {
    dispatch(setError('Произошла ошибка загрузки данных.'));
  }
  dispatch(setIsLoading(false));
};
