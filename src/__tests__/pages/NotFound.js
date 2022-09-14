import React from "react";

import { screen, render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import NotFound from "../../pages/NotFound";

afterEach(cleanup);

describe("NotFound", () => {
  test("should render not found when location = /something", () => {
    const route = "/something";
    render(
      <MemoryRouter initialEntries={[route]}>
        <NotFound />
      </MemoryRouter>
    );
    expect(document.querySelector("img").getAttribute("alt")).toBe(
      "Rick and Morty throw the portal"
    );
    expect(screen.getByTestId("not-found-img")).toBeInTheDocument();
    expect(screen.getByText("Page not found")).toBeInTheDocument();
  });
});
