import { render, act, screen } from '@testing-library/react';

import Review from '../page'; // Adjust the path as necessary
import { useSession } from 'next-auth/react';

// Mock the hooks
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

describe('Review', () => {
  let sessionMock;

  beforeEach(() => {
    sessionMock = { data: { user: { id: 1 } } };

    useSession.mockReturnValue(sessionMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch and display applications for the current user', async () => {
    const applicationData = [
      {
        applicationId: 1,
        companyName: 'Company A',
        applicationDate: '2024-05-20',
        statusId: 1,
        userId: 1,
      },
      {
        applicationId: 2,
        companyName: 'Company B',
        applicationDate: '2024-05-21',
        statusId: 2,
        userId: 2,
      },
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(applicationData),
    });

    await act(async () => {
      render(<Review />);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/applications');

    // Verify if applications for the current user are rendered
    applicationData.forEach((application) => {
      if (application.userId === sessionMock.data.user.id) {
        expect(screen.getByText(`Application title: ${application.companyName}`)).toBeInTheDocument();
       // expect(screen.getByText(`Application date: ${application.applicationDate}`)).toBeInTheDocument();
        //expect(screen.getByText(`Status: Pending`)).toBeInTheDocument();
      } else {
        expect(screen.queryByText(`Application title: ${application.companyName}`)).not.toBeInTheDocument();
       // expect(screen.queryByText(`Application date: ${application.applicationDate}`)).not.toBeInTheDocument();
        //expect(screen.queryByText(`Status: Pending`)).not.toBeInTheDocument();
      }
    });
  });

 
});
