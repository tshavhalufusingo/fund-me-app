import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from '../navbar'

// Mock next-auth/react to simulate user data and signOut behavior
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    },
    status: 'authenticated', // Adjust as needed (loading, idle)
  }),
  signOut: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('Navbar Component', () => {
  it('should render user profile link and logout button for logged-in user', () => {
    const { getByText } = render(<Navbar />);

    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('Sing out')).toBeInTheDocument();
  });

});

const router = jest.fn(() => ({ push: jest.fn() })); // Mocked router instance for convenience
