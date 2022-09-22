import React from "react";
import axios from "axios";
import {
  screen,
  render,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

import Home from "../../pages/Home";

jest.mock("axios");
afterEach(cleanup);

describe("Login", () => {
  test("should navigate /characters on successful login", async () => {
    const route = "/";
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const mockedAxios = axios;
    const mockedResponse = {
      data: { email: "vivi@gmail.com", name: "vivi" },
      status: 200,
    };

    mockedAxios.post.mockResolvedValueOnce(mockedResponse);
    render(
      <Router location={history.location} navigator={history}>
        <Home />
      </Router>
    );
    fireEvent.click(screen.getByText("here"));
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "vivi@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });

    fireEvent.click(screen.getByText("LOGIN"));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "https://the-movieapp.herokuapp.com/auth/login",
      {
        email: "vivi@gmail.com",
        password: "123456",
      }
    );

    await waitFor(() => expect(history.location.pathname).toBe("/chars"));
  });

  test("should show error mssg when login unauthorized error", async () => {
    const route = "/";
    const mockedAxios = axios;

    const mockedError = {
      response: {
        status: 401,
        data: { message: "Incorrect username or password.", success: false },
      },
    };

    render(
      <MemoryRouter initialEntries={[route]}>
        <Home />
      </MemoryRouter>
    );

    mockedAxios.post.mockRejectedValueOnce(mockedError);
    fireEvent.click(screen.getByText("here"));
    fireEvent.click(screen.getByText("LOGIN"));

    expect(
      await screen.findByText("Incorrect username or password.")
    ).toBeInTheDocument();
  });

  test("should show register form when click on link", async () => {
    const route = "/";

    render(
      <MemoryRouter initialEntries={[route]}>
        <Home />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("here"));

    expect(screen.getByText("LOGIN")).toBeInTheDocument();
    fireEvent.click(screen.getByText("here"));
    expect(screen.getByText("REGISTER")).toBeInTheDocument();
  });
});
