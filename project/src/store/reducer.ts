import { ActionType, Actions } from '../types/action';
import { State } from '../types/state';
import { cities } from '../const';

const initialState: State = {
  city: cities[0],
  offers: [],
  isLoading: false,
  error: '',
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.SetCity:
      return { ...state, city: action.payload };
    case ActionType.SetOffers:
      return { ...state, offers: action.payload };
    case ActionType.SetIsLoading:
      return { ...state, isLoading: action.payload };
    case ActionType.SetError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export { reducer };
