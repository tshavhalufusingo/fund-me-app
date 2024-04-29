import { render, screen,fireEvent,waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FundManagerHome from "../page"; 
jest.mock("next-auth/react", () => ({
  useSession: () => ({ data: { user: { id: 1 } } }),
}));


//////////////////
describe('FundManagerHome component', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // clear mocks before each test
    });

    test("renders form to create new post initially", () => {
        render(<FundManagerHome />);
        const titleInput = screen.getByLabelText("Title:");
        const descriptionInput = screen.getByLabelText("Description:");
        const submitButton = screen.getByText("Submit");
      
        expect(titleInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
      });
  
    test('renders submit form when not reviewing', () => {
      // Mock useSession to return a mock session object
      const mockSession = {
        user: {
          id: '123',
        },
      };
      jest.spyOn(require('next-auth/react'), 'useSession').mockReturnValueOnce({ data: mockSession });
  
      const { getByText, getByLabelText } = render(<FundManagerHome />);
      expect(getByText('Submit a New Post')).toBeInTheDocument();
      expect(getByLabelText('Title:')).toBeInTheDocument();
      expect(getByLabelText('Opportunity Type:')).toBeInTheDocument();
      expect(getByLabelText('Description:')).toBeInTheDocument();
      expect(getByLabelText('Funding Amount:')).toBeInTheDocument();
      expect(getByLabelText('Application Deadline:')).toBeInTheDocument();
      expect(getByText('Submit')).toBeInTheDocument();
    });
  
   
  
    test('submits form data', async () => {
      // Mock useSession to return a mock session object
      const mockSession = {
        user: {
          id: '123',
        },
      };
      jest.spyOn(require('next-auth/react'), 'useSession').mockReturnValueOnce({ data: mockSession });
  
      const { getByLabelText, getByText } = render(<FundManagerHome />);
      fireEvent.change(getByLabelText('Title:'), { target: { value: 'Test Title' } });
      fireEvent.change(getByLabelText('Description:'), { target: { value: 'Test Description' } });
      fireEvent.change(getByLabelText('Funding Amount:'), { target: { value: '10000' } });
      fireEvent.change(getByLabelText('Application Deadline:'), { target: { value: '2024-04-30' } });
      fireEvent.submit(getByText('Submit'));
      // You can add assertions for successful form submission here
    });
  });

