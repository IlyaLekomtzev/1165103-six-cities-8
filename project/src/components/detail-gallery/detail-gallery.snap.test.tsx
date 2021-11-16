import { render } from '@testing-library/react';
import DetailGallery from './detail-gallery';

const images = [
  'https://images.unsplash.com/photo-1636192677130-83a4cbd0f7d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1627110563676-7f534cbab296?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80',
  'https://images.unsplash.com/photo-1635886534663-3d258f58d586?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
];

describe('Component: DetailGallery', () => {
  it('should render correctly', () => {
    const {container} = render(<DetailGallery images={images} />);
    expect(container).toMatchSnapshot();
  });
});
