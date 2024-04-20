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

//   it('should render Sign In link for non-logged-in user', () => {
//     render(<Navbar />);
  
//     const signInButton = screen.getByRole('button', { name: /Sign In/i }); // Match "Sign In" case-insensitively
  
//     expect(signInButton).toBeInTheDocument();
//   });

//   it('should render sign in and register links for non-logged-in user', () => {
//     // Mock empty user data (no logged-in user)
//     jest.mock('next-auth/react', () => ({
//       useSession: () => ({
//         data: {
//           user: null,
//         },
//         status: 'authenticated', // Adjust as needed (loading, idle)
//       }),
//       signOut: jest.fn(),
//     }));

//     const { getByText } = render(<Navbar />);

//     expect(getByText('Sign In')).toBeInTheDocument();
//     expect(getByText('Register')).toBeInTheDocument();
//     expect(screen.queryByText('Profile')).not.toBeInTheDocument(); // Check for absence of profile link
//   });
});

const router = jest.fn(() => ({ push: jest.fn() })); // Mocked router instance for convenience
