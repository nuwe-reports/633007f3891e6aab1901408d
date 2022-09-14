import React from "react";
import { screen, render, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Footer from "../../components/Footer";

afterEach(cleanup);

describe("Footer", () => {
  test("should render Footer on Homepage", () => {
    const route = "/";
    render(
      <MemoryRouter initialEntries={[route]}>
        <Footer />
      </MemoryRouter>
    );

    expect(
      screen.getByText("© Viviana Yanez 2022 | Made with ♥︎")
    ).toBeInTheDocument();
  });
});

test("should render Footer on Character page", () => {
  const route = "/chars";
  render(
    <MemoryRouter initialEntries={[route]}>
      <Footer />
    </MemoryRouter>
  );

  expect(
    screen.getByText("© Viviana Yanez 2022 | Made with ♥︎")
  ).toBeInTheDocument();
});

test("should render Footer on Details page", () => {
  const route = "/chars/5";
  render(
    <MemoryRouter initialEntries={[route]}>
      <Footer />
    </MemoryRouter>
  );

  expect(
    screen.getByText("© Viviana Yanez 2022 | Made with ♥︎")
  ).toBeInTheDocument();
});

test("Footer renders link to repo", () => {
  render(<Footer />);
  expect(document.querySelector("a").getAttribute("href")).toBe(
    "https://github.com/vivitt/rick_morty_app"
  );
});
