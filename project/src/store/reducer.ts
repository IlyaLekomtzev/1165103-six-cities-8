import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { cities } from '../const';

const initialState: State = {
  city: cities[0],
  offers: [],
  isLoading: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SetCity:
      return { ...state, city: action.payload };
    case ActionType.SetOffers:
      return { ...state, offers: action.payload };
    case ActionType.SetIsLoading:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export { reducer };
