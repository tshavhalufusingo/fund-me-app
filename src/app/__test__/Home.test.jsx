
//import { render, screen, fireEvent } from '@testing-library/react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signIn } from 'next-auth/react';

import Home from '../../app/page'

jest.mock('next/navigation', () => ({
    useRouter: () => ({
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
      isFallback: false,
    }),
  }));

describe('Home Component', () => {

  it('should render login form', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('User email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('User password')).toBeInTheDocument();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  // Mock signIn function from next-auth/react
  jest.mock("next-auth/react", () => ({
    signIn: jest.fn(),
  }));
  
  describe("Home component", () => {
    it("should call signIn function on form submission with correct data", async () => {
      // Render the Home component
      render(<Home />);
  
      // Simulate user input
      const emailInput = screen.getByPlaceholderText("User email");
      const passwordInput = screen.getByPlaceholderText("User password");
  
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "testpassword" } });
  
      // Simulate clicking the login button
      fireEvent.click(screen.getByText("Login"));
  
    });
  });
  
});
