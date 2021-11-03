import { ActionType, Actions } from '../../types/action';
import { AuthReducerState } from '../../types/state';
import { AuthorizationStatus } from '../../const';

const initialState: AuthReducerState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  user: {
    id: 0,
    name: '',
    email: '',
    isPro: false,
    avatarUrl: '',
    token: '',
  },
};

const authReducer = (state: AuthReducerState = initialState, action: Actions): AuthReducerState => {
  switch (action.type) {
    case ActionType.SetAuthorizationStatus:
      return { ...state, authorizationStatus: action.payload };
    case ActionType.SetUserData:
      return { ...state, user: action.payload };
    case ActionType.RequireLogout:
      return initialState;
    default:
      return state;
  }
};

export { authReducer };
