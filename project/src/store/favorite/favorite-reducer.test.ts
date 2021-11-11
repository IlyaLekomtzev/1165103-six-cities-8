import { favoriteReducer } from './favorite-reducer';
import { FavoriteReducerState } from '../../types/state';
import { setFavoriteIsLoading, setFavoriteOffers } from '../action';
import { makeFakeOffer } from '../../utils/mocks';

const initialState: FavoriteReducerState = {
  offers: [],
  isLoading: false,
};

const mockOffers = Array(5).fill(makeFakeOffer());

describe('Reducer: favoriteReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(favoriteReducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should set favorite offers', () => {
    expect(favoriteReducer(initialState, setFavoriteOffers(mockOffers)))
      .toEqual({ ...initialState, offers: mockOffers });
  });

  it('should set status loading', () => {
    expect(favoriteReducer(initialState, setFavoriteIsLoading(true)))
      .toEqual({ ...initialState, isLoading: true });

    expect(favoriteReducer(initialState, setFavoriteIsLoading(false)))
      .toEqual({ ...initialState, isLoading: false });
  });
});
