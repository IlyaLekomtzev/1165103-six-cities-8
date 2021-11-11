import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import {
  setAuthorizationStatus,
  setUserData,
  redirectToRoute,
  setOffers,
  setIsLoading,
  requireLogout,
  setReviews,
  setFavoriteIsLoading,
  setFavoriteOffers
} from './action';
import {
  checkAuthAction,
  loginAction,
  fetchOffersAction,
  logoutAction,
  sendReview,
  getFavorites,
  sendFavorite,
  getRoom
} from './api-actions';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { State } from '../types/state';
import { makeFakeUserData, makeFakeOffer, makeFakeReview } from '../utils/mocks';
import { AuthData } from '../types/auth-data';
import { AUTH_TOKEN_KEY_NAME } from '../services/token';
import { SendReview } from '../types/reviews';

describe('Async actions', () => {
  const onFakeUnauthorized = jest.fn();
  const api = createAPI(onFakeUnauthorized());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should set authorization status - "auth" and user data when server returns 200', async () => {
    const store = mockStore();
    const mockUserData = makeFakeUserData();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, mockUserData);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    expect(store.getActions()).toEqual([
      setAuthorizationStatus(AuthorizationStatus.Auth),
      setUserData(mockUserData),
    ]);
  });

  it('should dispatch setAuthorizationStatus, setUserData and redirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
    const mockUserData = makeFakeUserData();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, { ...mockUserData, token: 'secret' });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    expect(store.getActions()).toEqual([
      setAuthorizationStatus(AuthorizationStatus.Auth),
      setUserData({ ...mockUserData, token: 'secret' }),
      redirectToRoute(AppRoute.Main),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, 'secret');
  });

  it('should set offers list when GET /hotels and server returns 200', async () => {
    const store = mockStore();
    const mockOffers = Array(5).fill(makeFakeOffer());
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, mockOffers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchOffersAction());

    expect(store.getActions()).toEqual([
      setIsLoading(true),
      setOffers(mockOffers),
      setIsLoading(false)
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    expect(store.getActions()).toEqual([requireLogout()]);
    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should return reviews for this offer when POST /comments/{id} and server returns 200', async () => {
    const fakeComment: SendReview & { id: string } = { id: '1', comment: 'Lorem ipsum', rating: 5 };
    const mockReviews = Array(5).fill(makeFakeReview());
    mockAPI
      .onPost(APIRoute.Comments + '/' + fakeComment.id)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(sendReview(fakeComment));

    expect(store.getActions()).toEqual([
      setReviews(mockReviews)
    ]);
  });

  it('should set favorite offers list when GET /favorite and server returns 200', async () => {
    const store = mockStore();
    const mockOffers = Array(5).fill(makeFakeOffer());
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockOffers);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(getFavorites());

    expect(store.getActions()).toEqual([
      setFavoriteIsLoading(true),
      setFavoriteOffers(mockOffers),
      setFavoriteIsLoading(false)
    ]);
  });
});
