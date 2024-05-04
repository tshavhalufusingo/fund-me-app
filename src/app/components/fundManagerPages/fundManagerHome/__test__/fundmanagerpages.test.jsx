import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FundManagerHome from "../page";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("FundManagerHome component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form to submit new post when user has permission", async () => {
    const mockSession = { user: { id: 1, userPermission: true } };
    useSession.mockReturnValueOnce({ data: mockSession });

    render(<FundManagerHome />);

    // Ensure form elements are rendered
   // expect(screen.getByLabelText("Title:")).toBeInTheDocument();
    expect(screen.getByLabelText("Opportunity Type:")).toBeInTheDocument();
    expect(screen.getByLabelText("Description:")).toBeInTheDocument();
    expect(screen.getByLabelText("Funding Amount:")).toBeInTheDocument();
    expect(screen.getByLabelText("Application Deadline:")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("hides form when user doesn't have permission", async () => {
    const mockSession = { user: { id: 1, userPermission: false } };
    useSession.mockReturnValueOnce({ data: mockSession });

    render(<FundManagerHome />);

    await waitFor(() => expect(screen.queryByLabelText("Title:")).not.toBeInTheDocument());

    expect(screen.queryByLabelText("Opportunity Type:")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Description:")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Funding Amount:")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Application Deadline:")).not.toBeInTheDocument();
    expect(screen.queryByText("Submit")).not.toBeInTheDocument();
  });
  // it("submits form successfully and displays a success message", async () => {
  //   const mockSession = { user: { id: 1, userPermission: true } };
  //   useSession.mockReturnValueOnce({ data: mockSession });
  
  //   render(<FundManagerHome />);
  
  //   const titleInput = screen.getByLabelText("Title:");
  //   const descriptionInput = screen.getByLabelText("Description:");
  //   const fundingAmountInput = screen.getByLabelText("Funding Amount:");
  //   const deadlineInput = screen.getByLabelText("Application Deadline:");
  //   const submitButton = screen.getByText("Submit");
  
  //   fireEvent.change(titleInput, { target: { value: "Test Funding Opportunity" } });
  //   fireEvent.change(descriptionInput, { target: { value: "This is a test description for the funding opportunity." } });
  //   fireEvent.change(fundingAmountInput, { target: { value: 10000 } });
  //   fireEvent.change(deadlineInput, { target: { value: "2024-06-01" } });  // Adjust date format if needed
  
  //   fireEvent.click(submitButton);
  
  //   await waitFor(() => expect(screen.getByText("Submit a New Post")).toBeInTheDocument());
  // });
  



});
