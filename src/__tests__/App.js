import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ToggleColorModeProv from "../context/ThemeContext";
import App from "../App";

describe("App", () => {
  test("renders App component", () => {
    render(
      <ToggleColorModeProv>
        <App />
      </ToggleColorModeProv>
    );
    expect(
      screen.getByText("Already registered? Please login")
    ).toBeInTheDocument();
  });
});
