import { render, act, screen, fireEvent } from '@testing-library/react';
import OpenPosts from '../page'; // Adjust the path as necessary
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

// Mock the hooks
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('OpenPosts', () => {
  let sessionMock;
  let useRouterMock;

  beforeEach(() => {
    sessionMock = { data: { user: { id: 1 } } };
    useRouterMock = { push: jest.fn() };

    useSession.mockReturnValue(sessionMock);
    useRouter.mockReturnValue(useRouterMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should fetch and display posts', async () => {
    const postData = [
      {
        postId: 1,
        companyName: 'Company A',
        postContent: 'This is a job opportunity.',
        opportunityType: 'Full-time',
        applicationDeadline: '2024-06-30T00:00:00',
      },
      // Add more post data as needed
    ];

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(postData),
    });

    await act(async () => {
      render(<OpenPosts />);
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/posts');

    // Verify if posts are rendered
    postData.forEach((post) => {
      expect(screen.getByText(post.companyName)).toBeInTheDocument();
      expect(screen.getByText(post.postContent)).toBeInTheDocument();
      expect(screen.getByText(`Funding Type : ${post.opportunityType}`)).toBeInTheDocument();
      expect(screen.getByText(`Closing date : ${post.applicationDeadline.split("T")[0]}`)).toBeInTheDocument();
    });
  });

  test('should handle application', async () => {
    const postData = {
      postId: 1,
      companyName: 'Company A',
      postContent: 'This is a job opportunity.',
      opportunityType: 'Full-time',
      applicationDeadline: '2024-06-30T00:00:00',
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([postData]),
    });

    await act(async () => {
      render(<OpenPosts />);
    });

    const applyButton = screen.getByText('Apply');
    fireEvent.click(applyButton);

    expect(useRouterMock.push).toHaveBeenCalledWith(`/apply/${postData.postId}`);
  });
});
