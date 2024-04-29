// __tests__/AdminHome.test.js
import React from "react";
import { render } from "@testing-library/react";
import AdminHome from "../page"; 

describe("AdminHome component", () => {
  it("renders UserWaintingApproval component", () => {
    const { getByTestId } = render(<AdminHome />);
  });
});
