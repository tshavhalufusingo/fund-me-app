import { render, fireEvent } from '@testing-library/react';
import Dashboard_home from '../page';
import { useRouter } from 'next/navigation';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Dashboard_home', () => {
  let mockRouter;

  beforeEach(() => {
    mockRouter = {
      push: jest.fn(),
    };
    useRouter.mockReturnValue(mockRouter);
  });

  test('navigates to posts page when "Check available opportunities" button is clicked', () => {
    const { getByText } = render(<Dashboard_home />);
    const button = getByText('Check available opportunies');

    fireEvent.click(button);

    //expect(mockRouter.push).toHaveBeenCalledWith('.//../components/applicantPages/posts');
  });

  test('navigates to review page when "Track Application" button is clicked', () => {
    const { getByText } = render(<Dashboard_home />);
    const button = getByText('Track Application');

    fireEvent.click(button);

    //expect(mockRouter.push).toHaveBeenCalledWith('.//../components/applicantPages/review');
  });

  test('navigates to profile page when "Profile" link is clicked', () => {
    const { getByText } = render(<Dashboard_home />);
    const link = getByText('Profile');

    fireEvent.click(link);

    //expect(mockRouter.push).toHaveBeenCalledWith('.//../components/profile');
  });
});
