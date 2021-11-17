import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import LoginForm from './login-form';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: LoginForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>,
    );

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });
});
