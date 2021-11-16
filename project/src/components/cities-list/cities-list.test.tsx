import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import CitiesList from './cities-list';

const mockStore = configureMockStore();
const store = mockStore({});
const cities = ['Paris', 'Cologne', 'Brussels'];

describe('Component: CitiesList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
          <CitiesList cities={cities} selectedCity={cities[0]} />
      </Provider>,
    );

    for (let i = 0; i < cities.length; i++) {
      expect(screen.getByText(cities[i])).toBeInTheDocument();
    }
    expect(screen.queryByText(/Moscow/i)).not.toBeInTheDocument();
  });
});
