import { roomReducer } from './room-reducer';
import { RoomReducerState } from '../../types/state';
import { setOffer, setReviews, setNearbyOffers, setIsLoadingRoom, setErrorRoom } from '../action';
import { makeFakeOffer, makeFakeReview } from '../../utils/mocks';

const initialState: RoomReducerState = {
  offer: null,
  reviews: [],
  nearbyOffers: [],
  isLoading: true,
  error: '',
};

const mockOffer = makeFakeOffer();
const mockOffers = Array(5).fill(makeFakeOffer());
const mockReviews = Array(5).fill(makeFakeReview());

describe('Reducer: roomReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(roomReducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should set offer', () => {
    expect(roomReducer(initialState, setOffer(mockOffer)))
      .toEqual({ ...initialState, offer: mockOffer });
  });

  it('should set reviews', () => {
    expect(roomReducer(initialState, setReviews(mockReviews)))
      .toEqual({ ...initialState, reviews: mockReviews });
  });

  it('should set nearby offers', () => {
    expect(roomReducer(initialState, setNearbyOffers(mockOffers)))
      .toEqual({ ...initialState, nearbyOffers: mockOffers });
  });

  it('should set status loading', () => {
    expect(roomReducer(initialState, setIsLoadingRoom(true)))
      .toEqual({ ...initialState, isLoading: true });

    expect(roomReducer(initialState, setIsLoadingRoom(false)))
      .toEqual({ ...initialState, isLoading: false });
  });

  it('should set error message', () => {
    const error = 'Error message';
    expect(roomReducer(initialState, setErrorRoom(error)))
      .toEqual({ ...initialState, error: error });
  });
});
