import { render } from '@testing-library/react';
import { User } from '../../types/user';
import DetailHost from './detail-host';

const host: User = {
  id: 1,
  name: 'Test',
  isPro: true,
  avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
};

describe('Component: Mistakes', () => {
  it('should render correctly', () => {
    const {container} = render(<DetailHost host={host} />);
    expect(container).toMatchSnapshot();
  });
});
