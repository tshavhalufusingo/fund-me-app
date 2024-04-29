import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ContactForm from '../page';

describe('ContactForm component', () => {
  test('renders form elements', () => {
    const { getByLabelText, getByText } = render(<ContactForm />);
    expect(getByLabelText(/Name:/i)).toBeInTheDocument();
    expect(getByLabelText(/Email:/i)).toBeInTheDocument();
    expect(getByLabelText(/Message:/i)).toBeInTheDocument();
    expect(getByText(/Submit/i)).toBeInTheDocument();
  });

  test('submits form with correct data', () => {
    const { getByLabelText, getByText } = render(<ContactForm />);
    const nameInput = getByLabelText(/Name:/i);
    const emailInput = getByLabelText(/Email:/i);
    const messageInput = getByLabelText(/Message:/i);
    const submitButton = getByText(/Submit/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });

    fireEvent.click(submitButton);

    
  });
});
