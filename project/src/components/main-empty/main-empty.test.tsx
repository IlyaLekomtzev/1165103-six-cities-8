import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import MainEmpty from './main-empty';

const mockStore = configureMockStore();
const city = 'Paris';
const store = mockStore({
  OFFERS: { city },
});

describe('Component: MainEmpty', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MainEmpty />
      </Provider>,
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(`We could not find any property available at the moment in ${city}`)).toBeInTheDocument();
  });
});
