import { render } from '@testing-library/react';
import { Review } from '../../types/reviews';
import ReviewsItem from './reviews-item';

const review: Review = {
  comment: 'Lorem ipsum',
  date: '2021-10-24T07:58:01.572Z',
  id: 1,
  rating: 5,
  user: {
    id: 1,
    name: 'Test',
    isPro: true,
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
  },
};

describe('Component: ReviewsItem', () => {
  it('should render correctly', () => {
    const { container } = render(<ReviewsItem review={review} />);
    expect(container).toMatchSnapshot();
  });
});
