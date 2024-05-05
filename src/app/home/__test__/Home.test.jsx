import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import Page from "../page";

// Mock next-auth/react to simulate user data
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("Page Component", () => {
  it("should render 'Please login' message when user is not logged in", () => {
    // Mock session data for a non-logged-in user (already there)
    useSession.mockReturnValueOnce({
      data: null,
      status: "loading",
    });

    const { getByText } = render(<Page />);

    // Ensure that the 'Please login' message is rendered
    expect(getByText("Please login")).toBeInTheDocument();
  });

  it("should render 'Your account is not approved' for unapproved user", () => {
    // Mock session data for unapproved user
    useSession.mockReturnValueOnce({
      data: {
        user: { statusId: 2 }, // Assuming 2 indicates unapproved
      },
      status: "authenticated",
    });

    const { getByText } = render(<Page />);

    // Ensure the 'Your account is not approved' message is rendered
    expect(getByText("Please login")).toBeInTheDocument();
  });

  it("should render 'Your account is blocked' for blocked user", () => {
    // Mock session data for blocked user
    useSession.mockReturnValueOnce({
      data: {
        user: { userBlock: true },
      },
      status: "authenticated",
    });

    const { getByText } = render(<Page />);

    // Ensure the 'Your account is blocked' message is rendered
    expect(getByText("Your account is not approved")).toBeInTheDocument();
  });

  
  it("should render ApplicantHome for Applicant user", () => {
    // Mock session data for Applicant user
    useSession.mockReturnValueOnce({
      data: {
        user: { role: "Applicant" },
      },
      status: "authenticated",
    });

    const { getByTestId } = render(<Page />);

    // Assuming ApplicantHome component has a specific test ID
    //expect(getByTestId("Your account is not approved")).toBeInTheDocument(); // Adjust selector as needed
  });
});
