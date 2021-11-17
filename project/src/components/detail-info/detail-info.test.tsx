import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import DetailInfo from './detail-info';
import { AuthorizationStatus } from '../../const';

const mockStore = configureMockStore();
const offer = {
  bedrooms: 3,
  city: {
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 10,
    },
    name: 'Paris',
  },
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
  host: {
    avatarUrl: 'https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    id: 3,
    isPro: true,
    name: 'Angelina',
  },
  id: 1,
  images: [
    'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80',
    'https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80',
  ],
  isFavorite: true,
  isPremium: true,
  location: {
    latitude: 48.864716,
    longitude: 2.349014,
    zoom: 8,
  },
  maxAdults: 4,
  previewImage: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1469&q=80',
  price: 120,
  rating: 4.8,
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
};

describe('Component: DetailInfo', () => {
  it('should render correctly', () => {
    const store = mockStore({
      AUTH: { authorizationStatus: AuthorizationStatus.NoAuth },
    });

    render(
      <Provider store={store}>
        <DetailInfo offer={offer} />
      </Provider>,
    );

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(offer.description)).toBeInTheDocument();
  });
});
