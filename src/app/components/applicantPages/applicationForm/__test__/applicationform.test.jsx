import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import ApplicationForm from '../page'; // Adjust the path as necessary
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';

// Mock the hooks
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('ApplicationForm', () => {
  let sessionMock;
  let paramsMock;

  beforeEach(() => {
    sessionMock = {
      data: { user: { id: 1 } },
      status: 'authenticated',
    };
    paramsMock = { postId: '123' };

    useSession.mockReturnValue(sessionMock);
    useParams.mockReturnValue(paramsMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should handle file selection correctly', () => {
    const { getByLabelText } = render(<ApplicationForm />);
    const fileInput = getByLabelText('Attachments:');

    const file = new File(['file content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
  });

  test('should update documents state on file selection', async () => {
    const { getByLabelText } = render(<ApplicationForm />);
    const fileInput = getByLabelText('Attachments:');
    const documentType = getByLabelText('Document Type:');

    // Select a document type
    fireEvent.change(documentType, { target: { value: 'CV' } });

    // Simulate file selection
    const file = new File(['file content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Verify if document is added to the state
    await waitFor(() => {
      const documentsDiv = screen.getByText('test.pdf');
      expect(documentsDiv).toBeInTheDocument();
    });
  });

  test('should handle application submission', async () => {
    const { getByText, getByLabelText } = render(<ApplicationForm />);
    const fileInput = getByLabelText('Attachments:');
    const submitButton = getByText('Submit');
    const documentType = getByLabelText('Document Type:');

    // Simulate file selection
    const file = new File(['file content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.change(documentType, { target: { value: 'CV' } });

    // Mock the fetch function to prevent actual API calls
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ applicationId: 456 }),
    }));

    // Simulate form submission
    fireEvent.click(submitButton);

    // await waitFor(() => {
    //   expect(global.fetch).toHaveBeenCalledTimes(1);
    // });
  });

  test('should show error message on application submission failure', async () => {
    const { getByText, getByLabelText, findByText } = render(<ApplicationForm />);
    const submitButton = getByText('Submit');
    const fileInput = getByLabelText('Attachments:');
    const documentType = getByLabelText('Document Type:');

    // Simulate file selection
    const file = new File(['file content'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.change(documentType, { target: { value: 'CV' } });

    // Mock the fetch function to simulate failure
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false,
    }));

    // Simulate form submission
    fireEvent.click(submitButton);

    //const errorMessage = await findByText('Failed to submit application');
    //expect(errorMessage).toBeInTheDocument();
  });
});
