import { render, screen, waitFor } from "@testing-library/react";
import UserWaintingApproval from "../userWaintingApproval";

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
        {
          userId: 2,
          firstname: "Jane",
          lastname: "Doe",
          userEmail: "jane@example.com",
          userRole: "FundManager",
          statusId: 2,
        },
      ]),
  })
);

describe("UserWaintingApproval component", () => {
  it("renders correct information based on fetched data", async () => {
    render(<UserWaintingApproval />);

    // Wait for the data to be fetched and displayed
    await waitFor(() => {
      expect(screen.getByText("Users awaiting approval")).toBeInTheDocument();
      //expect(screen.getByText("Contact Us")).toBeInTheDocument();
      expect(screen.getByText("All system users")).toBeInTheDocument();
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Jane")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();
      expect(screen.getByText("jane@example.com")).toBeInTheDocument();
      expect(screen.getByText("Applicant")).toBeInTheDocument();
      expect(screen.getByText("Fund Manager")).toBeInTheDocument();
      expect(screen.getByText("Pending")).toBeInTheDocument();
      expect(screen.getByText("Approved")).toBeInTheDocument();
    });
  });
});

it("displays a message when there are no unapproved users", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });
  
    render(<UserWaintingApproval />);
  
    await waitFor(() => {
      expect(screen.getByText("no account is waiting for approval")).toBeInTheDocument();
    });
  });
  
  it("displays a message when there are no approved users", async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve([]),
    });
  
    render(<UserWaintingApproval />);
  
    await waitFor(() => {
      expect(screen.getByText("no one is approved to use the system yet")).toBeInTheDocument();
    });
  });
  
  // Add more test cases for error handling, button clicks, link navigation, etc.
  
