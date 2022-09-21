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

describe("Home", () => {
  test("should render Homepage", () => {
    const route = "/";
    render(
      <MemoryRouter initialEntries={[route]}>
        <Home />
      </MemoryRouter>
    );
    expect(document.querySelector("img").getAttribute("alt")).toBe(
      "Rick holding Morty's eyes opened"
    );
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();

    fireEvent.click(screen.getByText("here"));
    expect(screen.queryByPlaceholderText("Name")).not.toBeInTheDocument();
  });

  test("should replace register with login form when register ok", async () => {
    const route = "/";
    const mockedAxios = axios;
    const mockedResponse = {
      data: { email: "vivi@gmail.com", name: "vivi" },
      status: 200,
    };

    mockedAxios.post.mockResolvedValueOnce(mockedResponse);
    render(
      <MemoryRouter initialEntries={[route]}>
        <Home />
      </MemoryRouter>
    );

    expect(axios.post).not.toHaveBeenCalled();
    expect(screen.queryByText("LOGIN")).not.toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "vivi" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "vivi@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("REGISTER"));

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "https://the-movieapp.herokuapp.com/auth/register",
      {
        name: "vivi",
        email: "vivi@gmail.com",
        password: "123456",
      }
    );
    expect(await screen.findByText("LOGIN")).toBeInTheDocument();
  });
  test("should toggle show password", async () => {
    const route = "/";

    render(
      <MemoryRouter initialEntries={[route]}>
        <Home />
      </MemoryRouter>
    );

    //test register form
    expect(screen.getByTestId("show-pass")).toBeInTheDocument();

    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    fireEvent.click(screen.getByTestId("show-pass"));
    expect(screen.getAllByRole("textbox")).toHaveLength(3);
    fireEvent.click(screen.getByTestId("show-pass"));
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    //test login form
    fireEvent.click(screen.getByText("here"));
    expect(screen.getAllByRole("textbox")).toHaveLength(1);
    fireEvent.click(screen.getByTestId("show-pass"));
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
  });

  test("should show empty field error mssgs on register form", async () => {
    const route = "/";
    const mockedAxios = axios;

    const mockedError = {
      response: {
        data: {
          fields: ["name", "email", "password"],
          messages: [
            "Please enter your name",
            "Please enter an email",
            "Please enter a password",
          ],
        },
        status: 400,
      },
    };

    render(
      <MemoryRouter initialEntries={[route]}>
        <Home />
      </MemoryRouter>
    );

    mockedAxios.post.mockRejectedValueOnce(mockedError);

    fireEvent.click(screen.getByText("REGISTER"));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "https://the-movieapp.herokuapp.com/auth/register",
      {
        name: "",
        email: "",
        password: "",
      }
    );
    expect(await screen.findByText("Please enter your name"));
    expect(await screen.findByText("Please enter an email"));
    expect(await screen.findByText("Please enter a password"));
  });

  test("should show duplicated email error mssg on register form", async () => {
    const route = "/";
    const mockedAxios = axios;

    const mockedError = {
      response: {
        data: {
          messages: "An account with that email already exists.",
        },
        status: 409,
      },
    };

    render(
      <MemoryRouter initialEntries={[route]}>
        <Home />
      </MemoryRouter>
    );

    mockedAxios.post.mockRejectedValueOnce(mockedError);
    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "vivi" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "vivi@gmail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "123456" },
    });
    fireEvent.click(screen.getByText("REGISTER"));
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "https://the-movieapp.herokuapp.com/auth/register",
      {
        name: "vivi",
        email: "vivi@gmail.com",
        password: "123456",
      }
    );
    expect(
      await screen.findByText("An account with that email already exists.")
    );
  });

  test("should show error mssg when other error", async () => {
    const route = "/";
    const mockedAxios = axios;

    const mockedError = {
      response: {
        status: 500,
      },
    };

    render(
      <MemoryRouter initialEntries={[route]}>
        <Home />
      </MemoryRouter>
    );

    mockedAxios.post.mockRejectedValueOnce(mockedError);

    fireEvent.click(screen.getByText("REGISTER"));

    expect(
      await screen.findByText("An unexpected error happened, please try again.")
    ).toBeInTheDocument();
  });

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
    fireEvent.click(screen.getByText("LOGIN"));
    expect(axios.post).toHaveBeenCalledTimes(1);

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
});
