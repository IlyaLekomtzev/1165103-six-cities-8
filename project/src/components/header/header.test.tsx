import { Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import Header from './header';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: Header', () => {
  it('should display correctly if the user is not logged in', () => {
    const store = mockStore({
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

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should display correctly if the user is logged in', () => {
    const email = 'test@test.com';
    const store = mockStore({
      AUTH: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: {
          id: 123,
          name: 'Test',
          email: email,
          isPro: false,
          avatarUrl: 'https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
          token: 'test',
        },
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
    expect(screen.getByText(email)).toBeInTheDocument();
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });
});
