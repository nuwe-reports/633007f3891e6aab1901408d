import React from "react";
import {
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Router } from "react-router-dom";

import { createMemoryHistory } from "history";
import ToggleColorModeProv from "../../context/ThemeContext";
import Appbar from "../../components/Appbar";

import Home from "../../pages/Home";

jest.mock("axios");
Storage.prototype.getItem = jest.fn();
Storage.prototype.setItem = jest.fn();
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
    expect(screen.getByTestId("logo-img")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-btn")).toBeInTheDocument();
  });

  test("should render Appbar on Character page", async () => {
    const route = "rick_morty_app/chars";

    render(
      <MemoryRouter initialEntries={[route]}>
        <ToggleColorModeProv>
          <Appbar />
        </ToggleColorModeProv>
      </MemoryRouter>
    );

    expect(localStorage.getItem).toHaveBeenCalled();

    expect(screen.getByTestId("logo-img")).toBeInTheDocument();
    expect(await screen.findByText("Logout")).toBeInTheDocument();
  });

  test("should navigate home on logout", async () => {
    const history = createMemoryHistory({
      initialEntries: ["/rick_morty_app/chars"],
    });
    axios.get.mockResolvedValueOnce({ status: 200 });

    render(
      <Router location={history.location} navigator={history}>
        <ToggleColorModeProv>
          <Appbar
            setLogoutError={() => null}
            setFavs={() => null}
            setIsLoading={() => null}
          />
        </ToggleColorModeProv>
      </Router>
    );
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(await screen.findByText("Logout")).toBeInTheDocument();
    expect(screen.getByTestId("logout")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Logout"));
    await waitFor(() => expect(history.location.pathname).toBe("/"));
  });

  test("should render Appbar on Details page and navigate '/' on logout", async () => {
    axios.get.mockResolvedValueOnce({ status: 200 });
    const history = createMemoryHistory({ initialEntries: ["/chars/8"] });

    render(
      <Router location={history.location} navigator={history}>
        <ToggleColorModeProv>
          <Appbar
            setLogoutError={(setLogoutError) => setLogoutError}
            setFavs={(setFavs) => setFavs}
            setIsLoading={(setIsLoading) => setIsLoading}
          />
        </ToggleColorModeProv>
      </Router>
    );
    expect(localStorage.getItem).toHaveBeenCalled();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByTestId("logout")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Logout"));
    await waitFor(() => expect(history.location.pathname).toBe("/"));
  });

  test("should handle logout error", async () => {
    const mockedError = {
      response: {
        status: 500,
      },
    };
    axios.get.mockRejectedValueOnce({ mockedError });

    const history = createMemoryHistory({ initialEntries: ["/chars/8"] });
    window.localStorage.setItem("user", "vivi@gmail.com");
    render(
      <Router location={history.location} navigator={history}>
        <ToggleColorModeProv>
          <Appbar
            setLogoutError={(setLogoutError) => setLogoutError}
            setFavs={(setFavs) => setFavs}
            setIsLoading={(setIsLoading) => setIsLoading}
          />
        </ToggleColorModeProv>
      </Router>
    );

    fireEvent.click(screen.getByText("Logout"));
    await waitFor(() => expect(history.location.pathname).toBe("/chars/8"));
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
    expect(screen.getByTestId("light-mode")).toBeInTheDocument();

    expect(screen.getByText("Already registered? Please login")).toHaveStyle(
      `color: #fffff`
    );

    fireEvent.click(screen.getByTestId("light-mode"));
    expect(screen.getByTestId("dark-mode")).toBeInTheDocument();
    expect(screen.getByText("Already registered? Please login")).toHaveStyle(
      `color: "#4D4D4C"`
    );
  });
});
