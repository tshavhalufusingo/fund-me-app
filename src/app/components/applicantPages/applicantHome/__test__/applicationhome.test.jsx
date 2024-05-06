import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Dashboard_home from '../page';
import { useRouter } from 'next/navigation';

// Mock useRouter to simulate navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Dashboard_home component', () => {
//   it('navigates to posts page when "Check available opportunities" link is clicked', () => {
//     const mockRouterPush = jest.fn();
//     useRouter.mockReturnValue({ push: mockRouterPush });

//     const { getByText } = render(<Dashboard_home />);
//     const checkOpportunitiesLink = getByText('Check available opportunities');
//     fireEvent.click(checkOpportunitiesLink);

//     expect(mockRouterPush).toHaveBeenCalledWith('.//../components/applicantPages/posts');
//   });

  it('navigates to posts page when "Review Applications" link is clicked', () => {
    const mockRouterPush = jest.fn();
    useRouter.mockReturnValue({ push: mockRouterPush });

    const { getByText } = render(<Dashboard_home />);
    const reviewApplicationsLink = getByText('Review Applications');
    fireEvent.click(reviewApplicationsLink);

    expect(mockRouterPush).toHaveBeenCalledWith('.//../components/applicantPages/posts');
  });
});
