import { authReducer } from './auth-reducer';
import { setAuthorizationStatus, setUserData, requireLogout } from '../action';
import { makeFakeUserData } from '../../utils/mocks';
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

const mockUserData = makeFakeUserData();

describe('Reducer: authReducer', () => {
  it('without additional parameters should return initial state', () => {
    expect(authReducer(initialState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(initialState);
  });

  it('should change the authorization status', () => {
    expect(authReducer(initialState, setAuthorizationStatus(AuthorizationStatus.Auth)))
      .toEqual({ ...initialState, authorizationStatus: AuthorizationStatus.Auth });

    expect(authReducer(initialState, setAuthorizationStatus(AuthorizationStatus.NoAuth)))
      .toEqual({ ...initialState, authorizationStatus: AuthorizationStatus.NoAuth });
  });

  it('should set user data', () => {
    expect(authReducer(initialState, setUserData(mockUserData)))
      .toEqual({ ...initialState, user: mockUserData });
  });

  it('should return to the initial state when logged out', () => {
    expect(authReducer(initialState, requireLogout()))
      .toEqual(initialState);
  });
});
