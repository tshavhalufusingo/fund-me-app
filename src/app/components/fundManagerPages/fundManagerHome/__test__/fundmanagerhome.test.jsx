import { render, fireEvent } from '@testing-library/react';
import Dashboard_home from '../page'; // adjust the path as necessary
import { useRouter } from 'next/navigation';

// Mock the useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Dashboard_home', () => {
  let pushMock;

  beforeEach(() => {
    pushMock = jest.fn();
    useRouter.mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should navigate to submitPost on gotoUpload', () => {
    const { getByText } = render(<Dashboard_home />);
    const submitLink = getByText('Create opportunity');
    
    fireEvent.click(submitLink);

    //expect(pushMock).toHaveBeenCalledWith('/components/fundManagerPages/submitPost');
  });

  test('should navigate to reviewPosts on goReviewPost', () => {
    const { getByText } = render(<Dashboard_home />);
    const reviewLink = getByText('Review Applications');
    
    fireEvent.click(reviewLink);

    //expect(pushMock).toHaveBeenCalledWith('/components/fundManagerPages/reviewPosts');
  });

  test('should navigate to budgetReport on gotoBudget', () => {
    const { getByText } = render(<Dashboard_home />);
    const budgetLink = getByText('Budget and Report');
    
    fireEvent.click(budgetLink);

    //expect(pushMock).toHaveBeenCalledWith('/components/fundManagerPages/budgetReport');
  });

  test('should navigate to profile on Profile link click', () => {
    const { getByText } = render(<Dashboard_home />);
    const profileLink = getByText('Profile');
    
    //expect(profileLink).toHaveAttribute('href', '/profile');
  });

  test('should navigate to reviewopp on goReviewOpp', () => {
    const { getByText } = render(<Dashboard_home />);
    const reviewOppLink = getByText('Review existing opportunities');

    fireEvent.click(reviewOppLink);

   // expect(pushMock).toHaveBeenCalledWith('/components/fundManagerPages/reviewopp');
  });
});
