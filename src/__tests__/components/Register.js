import React from "react";
import axios from "axios";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Home from "../../pages/Home";

jest.mock("axios");
afterEach(cleanup);

describe("Register", () => {
  test("hide register form when axios response ok", async () => {
    const route = "/";
    const mockedAxios = axios;

    const mockedResponse = {
      status: 200,
    };

    render(
      <MemoryRouter initialEntries={[route]}>
        <Home />
      </MemoryRouter>
    );

    mockedAxios.post.mockResolvedValueOnce(mockedResponse);

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
    expect(await screen.findByText("LOGIN")).toBeInTheDocument();
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
});
