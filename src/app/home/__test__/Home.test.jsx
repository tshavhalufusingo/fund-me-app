import { render } from "@testing-library/react";
import Page from '../page'

// Mock next-auth/react to simulate user data
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: {
      user: {
        firstName: 'John',
        lastName: 'Doe',
        role: 'Applicant',
      },
    },
    status: 'authenticated', // Adjust as needed (loading, idle)
  }),
}));

describe('Page Component', () => {
  it('should render user information for logged-in user', () => {
    const { getByText } = render(<Page />);

    const expectedText = 'I am Doe John with a role of Applicant';
    expect(getByText(expectedText)).toBeInTheDocument();
  });

//   it('should not render user role for non-logged-in user', () => {
//     // Mock empty user data for testing
//     jest.mock('next-auth/react', () => ({
//       useSession: () => ({
//         data: {
//           user: null,
//         },
//         status: 'authenticated', // Adjust as needed (loading, idle)
//       }),
//     }));

//     const { queryByText } = render(<Page />);

//     expect(queryByText(/role/i)).not.toBeInTheDocument(); // Using regular expression for "role" (case-insensitive)
//   });
});
