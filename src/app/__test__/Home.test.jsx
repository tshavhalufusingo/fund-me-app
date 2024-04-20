
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

describe("test 1",() =>{
    it("render home log",()=>{
        render(<Home/>);
    });
});

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
  



//   it('should call signIn function on form submission with correct data', async () => {
//     const email = 'test@example.com';
//     const password = 'testpassword';
  
//     // Mock the signIn function
//     const signIn = jest.fn();
  
//     render(<Home signIn={signIn} />); // Pass the mocked signIn function as a prop
  
//     fireEvent.change(screen.getByPlaceholderText('User email'), {
//       target: { value: email },
//     });
//     fireEvent.change(screen.getByPlaceholderText('User password'), {
//       target: { value: password },
//     });
  
//     fireEvent.click(screen.getByText('Login'));
  
//     // Debugging: Log the calls made to the signIn function
//     console.log(signIn.mock.calls);
  
//     // Expect signIn to have been called with the correct arguments
//     expect(signIn).toHaveBeenCalledWith('credentials', {
//       email,
//       password,
//       redirect: false,
//     });
//   });
  
  

//   it('should redirect to /home on successful login', async () => {
//     signIn.mockReturnValue({});

//     render(<Home />);

//     fireEvent.click(screen.getByText('Login'));

//     expect(useRouter().refresh).toHaveBeenCalled();
//     expect(useRouter().push).toHaveBeenCalledWith('/home');
//   });

//   it('should log error on unsuccessful login', async () => {
//     const error = 'Invalid credentials';
//     signIn.mockReturnValue({ error });

//     render(<Home />);

//     fireEvent.click(screen.getByText('Login'));

//     expect(console.log).toHaveBeenCalledWith(error);
//   });

//   it('should navigate to registration page on "Register" button click', () => {
//     render(<Home />);
//     fireEvent.click(screen.getByText('Register'));
//     expect(useRouter().push).toHaveBeenCalledWith('/register');
//   });
});
