import { ActionType, Actions } from '../../types/action';
import { FavoriteReducerState } from '../../types/state';

const initialState: FavoriteReducerState = {
  offers: [],
  isLoading: false,
};

const favoriteReducer = (state: FavoriteReducerState = initialState, action: Actions): FavoriteReducerState => {
  switch (action.type) {
    case ActionType.SetFavoriteOffers:
      return { ...state, offers: action.payload };
    case ActionType.SetFavoriteIsLoading:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export { favoriteReducer };
