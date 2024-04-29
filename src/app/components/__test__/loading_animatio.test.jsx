// __tests__/Loading.test.js
import React from "react";
import { render } from "@testing-library/react";
import Loading from "../Loading";

describe("Loading component", () => {
  it("renders loading text", () => {
    const { getByText } = render(<Loading />);
    const loadingText = getByText(/Loading.../i);
    expect(loadingText).toBeInTheDocument();
  });

  it("renders with correct class", () => {
    const { container } = render(<Loading />);
    const loadingContainer = container.querySelector(".loading-container");
    expect(loadingContainer).toBeInTheDocument();
  });
});
