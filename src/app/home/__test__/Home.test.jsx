import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Page from "../page";

// Mock next-auth/react to simulate user data
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("Page Component", () => {


  it("should render 'Please login' message when user is not logged in", () => {
    // Mock session data for a non-logged-in user
    useSession.mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    const { getByText } = render(<Page />);

    // Ensure that the 'Please login' message is rendered
    expect(getByText("Please login")).toBeInTheDocument();
  });
});
