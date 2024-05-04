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

});
