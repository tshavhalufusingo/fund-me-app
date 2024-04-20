import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "@testing-library/react"; // for handling async operations
import Home from '../page'


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

  it('should render registration form', () => {
    render(<Home />);

    expect(screen.getByPlaceholderText('User firstname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('User lastname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('User email')).toBeInTheDocument();
    //expect(screen.getByRole('select')).toBeInTheDocument(); // Select for role
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('should log error message on missing first name', async () => {
    render(<Home />);

    const email = screen.getByPlaceholderText('User email');
    const lastName = screen.getByPlaceholderText('User lastname');
    //const roleSelect = screen.getByRole('select');
    const password = screen.getByPlaceholderText('Password');
    const confirmPassword = screen.getByPlaceholderText('Confirm password');
    const submitButton = screen.getByText('Register');

    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(lastName, { target: { value: 'Doe' } });
    //fireEvent.change(roleSelect, { target: { value: 'Applicant' } });
    //expect(screen.getByRole('heading', { name: /Your expected heading text/i })).toBeInTheDocument();
    fireEvent.change(password, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPassword, { target: { value: 'testpassword' } });

    await act(async () => fireEvent.click(submitButton));

   
  });

  it('should log error message on password mismatch', async () => {
    render(<Home />);

    const firstName = screen.getByPlaceholderText('User firstname');
    const email = screen.getByPlaceholderText('User email');
    const lastName = screen.getByPlaceholderText('User lastname');
   // const roleSelect = screen.getByRole('select');
    const password = screen.getByPlaceholderText('Password');
    const confirmPassword = screen.getByPlaceholderText('Confirm password');
    const submitButton = screen.getByText('Register');

    fireEvent.change(firstName, { target: { value: 'John' } });
    fireEvent.change(email, { target: { value: 'test@example.com' } });
    fireEvent.change(lastName, { target: { value: 'Doe' } });
    //fireEvent.change(roleSelect, { target: { value: 'Applicant' } });
    fireEvent.change(password, { target: { value: 'testpassword' } });
    fireEvent.change(confirmPassword, { target: { value: 'wrongpassword' } });

    await act(async () => fireEvent.click(submitButton));

    
  });

  
});
