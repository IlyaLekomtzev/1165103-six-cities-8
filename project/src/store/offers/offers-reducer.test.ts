import { offersReducer } from './offers-reducer';
import { OffersReducerState } from '../../types/state';
import { setCity, setError, setIsLoading, setOffers, setSort } from '../action';
import { makeFakeOffers } from '../../utils/mocks';
import { cities, OffersSortValue } from '../../const';

const initialState: OffersReducerState = {
  city: cities[0],
  sort: OffersSortValue.Popular,
  offers: [],
  isLoading: false,
  error: '',
};

const mockOffers = Array(5).fill(makeFakeOffers());

describe('Reducer: offersReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(offersReducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should set the value of the city', () => {
    expect(offersReducer(initialState, setCity(cities[1])))
      .toEqual({ ...initialState, city: cities[1] });
  });

  it('should set the value of the sort', () => {
    expect(offersReducer(initialState, setSort(OffersSortValue.PriceHighToLow)))
      .toEqual({ ...initialState, sort: OffersSortValue.PriceHighToLow });

    expect(offersReducer(initialState, setSort(OffersSortValue.PriceLowToHigh)))
      .toEqual({ ...initialState, sort: OffersSortValue.PriceLowToHigh });

    expect(offersReducer(initialState, setSort(OffersSortValue.TopRatedFirst)))
      .toEqual({ ...initialState, sort: OffersSortValue.TopRatedFirst });

    expect(offersReducer(initialState, setSort(OffersSortValue.Popular)))
      .toEqual({ ...initialState, sort: OffersSortValue.Popular });
  });

  it('should set offers list', () => {
    expect(offersReducer(initialState, setOffers(mockOffers)))
      .toEqual({ ...initialState, offers: mockOffers });

    expect(offersReducer(initialState, setOffers([])))
      .toEqual({ ...initialState, offers: [] });
  });

  it('should set status loading', () => {
    expect(offersReducer(initialState, setIsLoading(true)))
      .toEqual({ ...initialState, isLoading: true });

    expect(offersReducer(initialState, setIsLoading(false)))
      .toEqual({ ...initialState, isLoading: false });
  });

  it('should set error message', () => {
    const error = 'Error message';
    expect(offersReducer(initialState, setError(error)))
      .toEqual({ ...initialState, error: error });
  });
});
