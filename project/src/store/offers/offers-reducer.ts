import { ActionType, Actions } from '../../types/action';
import { OffersReducerState } from '../../types/state';
import { cities, OffersSortValue } from '../../const';

const initialState: OffersReducerState = {
  city: cities[0],
  sort: OffersSortValue.Popular,
  offers: [],
  isLoading: false,
  error: '',
};

const offersReducer = (state: OffersReducerState = initialState, action: Actions): OffersReducerState => {
  switch (action.type) {
    case ActionType.SetCity:
      return { ...state, city: action.payload };
    case ActionType.SetSort:
      return { ...state, sort: action.payload };
    case ActionType.SetOffers:
      return { ...state, offers: action.payload };
    case ActionType.SetOfferMain:
      return {
        ...state,
        offers: state.offers.map((item) => {
          if (action.payload.id === item.id) {
            item = action.payload;
          }
          return item;
        }),
      };
    case ActionType.SetIsLoading:
      return { ...state, isLoading: action.payload };
    case ActionType.SetError:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export { offersReducer };
