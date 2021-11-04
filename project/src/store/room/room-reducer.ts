import { ActionType, Actions } from '../../types/action';
import { RoomReducerState } from '../../types/state';

const initialState: RoomReducerState = {
  offer: null,
  reviews: [],
  nearbyOffers: [],
  isLoading: true,
  error: '',
};

const roomReducer = (state: RoomReducerState = initialState, action: Actions): RoomReducerState => {
  switch (action.type) {
    case ActionType.SetOffer:
      return { ...state, offer: action.payload };
    case ActionType.SetReviews:
      return { ...state, reviews: action.payload };
    case ActionType.SetNearbyOffers:
      return { ...state, nearbyOffers: action.payload };
    case ActionType.SetIsLoadingRoom:
      return { ...state, isLoading: action.payload };
    case ActionType.SetErrorRoom:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export { roomReducer };
