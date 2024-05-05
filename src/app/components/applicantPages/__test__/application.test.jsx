import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ApplicationForm from '../applicationForm';

describe('ApplicationForm', () => {
  it('renders the form with required fields', () => {
    render(<ApplicationForm />);

    const nameInput = screen.getByLabelText(/Name:/i);
    const emailInput = screen.getByLabelText(/Email:/i);
    const amountInput = screen.getByLabelText(/Amount Requested:/i);
    const descriptionInput = screen.getByLabelText(/Description:/i);
    const attachmentInput = screen.getByLabelText(/Attachments:/i);
    const documentTypeSelect = screen.getByLabelText(/Document Type:/i);
    const submitButton = screen.getByText(/Submit/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(amountInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(attachmentInput).toBeInTheDocument();
    expect(documentTypeSelect).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('prevents form submission with empty fields', () => {
    render(<ApplicationForm />);

    const submitButton = screen.getByText(/Submit/i);
    fireEvent.click(submitButton);

    //expect(screen.getByText(/This field is required/i)).toBeInTheDocument();
  });

});