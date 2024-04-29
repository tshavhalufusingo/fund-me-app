
//import UserWaitingApproval from '../UserWaitingApproval'; // Corrected component name
import { render, screen } from "@testing-library/react";
import UserWaintingApproval from "../UserWaintingApproval";

// Mocking the fetch API to return dummy data
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          userId: 1,
          firstname: "John",
          lastname: "Doe",
          userEmail: "john@example.com",
          userRole: "Applicant",
          statusId: 1,
        },
        // Add more dummy data as needed
      ]),
  })
);

describe("UserWaintingApproval component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a table of users awaiting approval", async () => {
    render(<UserWaintingApproval />);

    // Check if the header is rendered
    expect(screen.getByText("Users awaiting approval")).toBeInTheDocument();

    // Wait for the data to be fetched and displayed
    const userId = await screen.findByText("1");
    expect(userId).toBeInTheDocument();
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Applicant")).toBeInTheDocument();
    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(screen.getByText("Review")).toBeInTheDocument();
  });

  // Add more test cases as needed for other scenarios like empty data, approved users, etc.
});
