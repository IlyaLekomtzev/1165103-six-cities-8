import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus, AppRoute, cities, OffersSortValue } from '../../const';
import App from './app';

const mockStore = configureMockStore();

const store = mockStore({
  OFFERS: {
    city: cities[0],
    sort: OffersSortValue.Popular,
    offers: [],
    isLoading: false,
    error: '',
  },
  AUTH: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    user: {
      id: 0,
      name: '',
      email: '',
      isPro: false,
      avatarUrl: '',
      token: '',
    },
  },
});

const history = createMemoryHistory();
const fakeApp = (
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);
    render(fakeApp);

    expect(screen.getByRole('heading')).toHaveTextContent('Sign in');
  });

  it('should render "NotFoundScreen" when user navigate to "/not-found"', () => {
    history.push(AppRoute.NotFound);
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Перейти на главную')).toBeInTheDocument();
  });
});
