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
    expect(await screen.queryByText("REGISTER")).not.toBeInTheDocument();
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
});
