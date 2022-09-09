import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "../App";

describe("App", () => {
  test("renders App component", () => {
    render(<App />);
    expect(screen.getByText("login")).toBeInTheDocument();
  });
});
