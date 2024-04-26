import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import UserWaintingApproval from '../userWaintingApproval';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: () =>
      Promise.resolve([
        {
          userId: 1,
          firstname: 'John',
          lastname: 'Doe',
          userEmail: 'john@example.com',
          userRole: 'Applicant',
          statusId: 1,
        },
        {
          userId: 2,
          firstname: 'Jane',
          lastname: 'Doe',
          userEmail: 'jane@example.com',
          userRole: 'FundManager',
          statusId: 2,
        },
      ]),
  });
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('renders user data correctly', async () => {
  await act(async () => {
    render(<UserWaintingApproval />);
  });

  expect(screen.getByText('Users awaiting approval')).toBeInTheDocument();
  expect(screen.getByText('User id')).toBeInTheDocument();
  expect(screen.getByText('First name')).toBeInTheDocument();
  expect(screen.getByText('Last name')).toBeInTheDocument();
  expect(screen.getByText('Email')).toBeInTheDocument();
  expect(screen.getByText('Role')).toBeInTheDocument();
  expect(screen.getByText('Status')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument();
    //expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Applicant')).toBeInTheDocument();
    expect(screen.getByText('Pending')).toBeInTheDocument();

    expect(screen.getByText('Jane')).toBeInTheDocument();
    //expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('Fund Manager')).toBeInTheDocument();
    expect(screen.getByText('Approved')).toBeInTheDocument();
  });
});
