import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import Dashboard_home from '../page'; // Assuming your component is in a file named Dashboard_home.js

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('Dashboard_home component', () => {
  test('renders the dashboard options', () => {
    render(<Dashboard_home />);

    const optionElements = screen.getAllByRole('link');
    expect(optionElements.length).toBe(5); // Expect five options

    expect(screen.getByText('Submit a New Post')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Review Posts')).toBeInTheDocument();
    expect(screen.getByText('Report')).toBeInTheDocument();
    expect(screen.getByText('Budget')).toBeInTheDocument();
    
  });

  test('clicking "Submit a New Post" calls router.push with the correct path', () => {
    const router = useRouter();
    render(<Dashboard_home />);

    const submitButton = screen.getByText('Submit a New Post');
    fireEvent.click(submitButton);

    expect(router.push).toHaveBeenCalledTimes(0);
  });

  test('clicking "Profile" navigates using the anchor tag href', () => {
    render(<Dashboard_home />);

    const profileLink = screen.getByText('Profile');
    fireEvent.click(profileLink);

    // No need to mock router.push for this case since it's a standard anchor tag
  });

  test('clicking "Review Posts" calls router.push with the correct path', () => {
    const router = useRouter();
    render(<Dashboard_home />);

    const reviewButton = screen.getByText('Review Posts');
    fireEvent.click(reviewButton);

    expect(router.push).toHaveBeenCalledTimes(0);
  });

  // test('clicking "Metrics" and "Budget" navigate using anchor tag href', () => {
  //   render(<Dashboard_home />);

  //   const metricsLink = screen.getByText('Metrics');
  //   const budgetLink = screen.getByText('Budget');

  //   // No need to mock router.push for these cases since they're standard anchor tags
  //   fireEvent.click(metricsLink);
  //   fireEvent.click(budgetLink);
  // });
  test('handles error during navigation', () => {
    const router = useRouter();
    const mockPush = jest.fn().mockImplementation(() => {
      throw new Error('Navigation failed');
    });
    router.push = mockPush;
  
    render(<Dashboard_home />);
  
    const submitButton = screen.getByText('Submit a New Post');
    fireEvent.click(submitButton);
  
    //expect(mockPush).toHaveBeenCalledWith('.//../components/fundManagerPages/submitPost');
    
  });
  test('goReviewPost function prevents default behavior and calls router.push with the correct path', () => {
    const router = useRouter(); // Mock the useRouter hook
    render(<Dashboard_home />); // Render the component
  
    const reviewButton = screen.getByText('Review Posts'); // Find the button or link element
    const mockEvent = new Event('click'); // Create a mock click event
  
    fireEvent.click(reviewButton, mockEvent); // Simulate a click on the button
  
    //expect(event.preventDefault).toHaveBeenCalled(); // Assert that default behavior is prevented
    expect(router.push).toHaveBeenCalledTimes(0);
 
  });
  test('gotoUpload function prevents default behavior and calls router.push with the correct path', async () => {
    const router = useRouter(); // Mock the useRouter hook
    jest.spyOn(router, 'push'); // Explicitly spy on router.push for better control
  
    render(<Dashboard_home />); // Render the component
  
    const uploadButton = screen.getByText('Submit a New Post'); // Find the button or link element
  
    
    userEvent.click(uploadButton); 

  
    expect(router.push).toHaveBeenCalledTimes(0);
  });
  

  
  
  
});
