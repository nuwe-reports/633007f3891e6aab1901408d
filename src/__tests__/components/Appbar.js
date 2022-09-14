import React from "react";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { Router, MemoryRouter } from "react-router-dom";
import { createMemoryHistory } from "history";
import ToggleColorModeProv from "../../context/ThemeContext";
import Appbar from "../../components/Appbar";
import App from "../../App";
import Home from "../../pages/Home";
import Details from "../../pages/Details";
afterEach(cleanup);

describe("Appbar", () => {
  test("should render Appbar on Homepage", () => {
    const route = "/";
    render(
      <MemoryRouter initialEntries={[route]}>
        <ToggleColorModeProv>
          <Appbar />
        </ToggleColorModeProv>
      </MemoryRouter>
    );
    expect(screen.queryByTestId("logo-img")).toBeInTheDocument();
  });

  test("should render Appbar on Character page", () => {
    const route = "/chars";

    render(
      <ToggleColorModeProv>
        <App />
      </ToggleColorModeProv>
    );

    expect(screen.queryByTestId("logo-img")).toBeInTheDocument();
    expect(screen.queryAllByTestId("logout")).toHaveLength(2);
  });

  test("should navigate home on logout", () => {
    const route = "/chars";
    render(
      <MemoryRouter initialEntries={[route]}>
        <ToggleColorModeProv>
          <Appbar />
          <Home />
        </ToggleColorModeProv>
      </MemoryRouter>
    );
    expect(screen.queryByTestId("logout")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("logout"));
    expect(
      screen.getByText("Already registered? Please login")
    ).toBeInTheDocument();
  });

  test("should render Appbar on Details page", () => {
    const route = "/chars/8";

    const history = createMemoryHistory({ initialEntries: ["/chars/8"] });

    render(
      <Router location={history.location} navigator={history}>
        <ToggleColorModeProv>
          <Appbar />
        </ToggleColorModeProv>
      </Router>
    );

    expect(screen.queryByTestId("logo-img")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("logo-img"));
  });

  test("should toggle theme mode", () => {
    const route = "/";
    render(
      <MemoryRouter initialEntries={[route]}>
        <ToggleColorModeProv>
          <Appbar />
          <Home></Home>
        </ToggleColorModeProv>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("dark-mode"));
    expect(screen.queryByTestId("light-mode")).toBeInTheDocument();
    expect(screen.getByTestId("app-bar")).toHaveStyle(
      `background-color: #0f0c29`
    );
    expect(screen.getByTestId("app")).toHaveStyle(`background-color: #24243e`);

    fireEvent.click(screen.getByTestId("light-mode"));
    expect(screen.queryAllByTestId("dark-mode")).toBeInTheDocument();
    expect(screen.getByTestId("app-bar")).toHaveStyle(
      `background-color: #FFFFFF`
    );
  });
});
