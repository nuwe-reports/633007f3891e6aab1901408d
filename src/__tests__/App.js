import React from "react";
import { render, screen } from "@testing-library/react";

import ToggleColorModeProv from "../context/ThemeContext";
import App from "../App";

describe("App", () => {
  let location;
  const mockLocation = new URL("http://localhost:3000/rick_morty_app/");

  beforeEach(() => {
    location = window.location;
    mockLocation.replace = jest.fn();
    delete window.location;
    window.location = mockLocation;
  });

  afterEach(() => {
    window.location = location;
  });
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
