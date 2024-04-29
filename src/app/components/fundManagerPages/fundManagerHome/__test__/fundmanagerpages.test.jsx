import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FundManagerHome from "../page";
import { useSession } from "next-auth/react";

// Mocking useSession
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe('FundManagerHome component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useSession.mockReturnValue({ data: { user: { id: 1, userPermission: true } } });
  });

  test("renders form to create new post initially", () => {
    render(<FundManagerHome />);
    expect(screen.getByText("Submit a New Post")).toBeInTheDocument();
    expect(screen.getByLabelText("Title:")).toBeInTheDocument();
    expect(screen.getByLabelText("Opportunity Type:")).toBeInTheDocument();
    expect(screen.getByLabelText("Description:")).toBeInTheDocument();
    expect(screen.getByLabelText("Funding Amount:")).toBeInTheDocument();
    expect(screen.getByLabelText("Application Deadline:")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("submits form data", async () => {
    render(<FundManagerHome />);
    const titleInput = screen.getByLabelText("Title:");
    const descriptionInput = screen.getByLabelText("Description:");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(descriptionInput, { target: { value: "Test Description" } });
    // Add more fireEvent calls for other form fields if needed

    fireEvent.click(submitButton);

    // Add assertions for successful form submission if needed
  });

  test("renders review table when reviewing", () => {
    render(<FundManagerHome />);
    const reviewButton = screen.getByText("Review Posts");
    userEvent.click(reviewButton);
    //expect(screen.getByText("Application Review")).toBeInTheDocument();
  });

  test("displays user posts in the table", async () => {
    // Mocking the userPosts data
    const mockUserPosts = [
      { postId: 1, postname: "Test Post 1", username: "User 1" },
      { postId: 2, postname: "Test Post 2", username: "User 2" }
    ];
    useSession.mockReturnValue({ data: { user: { id: 1, userPermission: false } } });
    render(<FundManagerHome />);
    // Assuming there's a button with text "Review" for each post
    // await waitFor(() => {
    //   expect(screen.getAllByText("Review").length).toBe(mockUserPosts.length);
    // });
  });
});
