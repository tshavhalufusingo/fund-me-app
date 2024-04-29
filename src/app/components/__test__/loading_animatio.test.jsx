import React from 'react';
import { render } from '@testing-library/react';
import Loading from '../loading_animation';

describe('Loading component', () => {

  test('renders loader element', () => {
    const { container } = render(<Loading />);
    const loaderElement = container.querySelector('.loader');
    expect(loaderElement).toBeInTheDocument();
  });
});
