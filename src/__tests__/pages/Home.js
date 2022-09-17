import React from "react";
import axios from "axios";
import {
  screen,
  render,
  cleanup,
  fireEvent,
  act,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ToggleColorModeProv from "../../context/ThemeContext";
import Home from "../../pages/Home";

jest.mock("axios");
afterEach(cleanup);
const mockedResponse = {
  data: { email: "vivi@gmail.com", name: "vivi", password: "" },
  status: 200,
};

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

  test("replace register with login form when register ok", async () => {
    const route = "/";
    const mockedAxios = axios;

    //mockedAxios.post.mockResolvedValueOnce(mockedResponse);
    act(() => {
      mockedAxios.post.mockResolvedValue(mockedResponse);
      render(
        <MemoryRouter initialEntries={[route]}>
          <Home />
        </MemoryRouter>
      );
    });

    expect(axios.post).not.toHaveBeenCalled();
    expect(screen.queryByText("LOGIN")).not.toBeInTheDocument();
    act(() => {
      fireEvent.click(screen.getByText("REGISTER"));
    });

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      "https://the-movieapp.herokuapp.com/auth/register",
      { email: "", name: "", password: "" }
    );

    expect(await screen.findByText("LOGIN")).toBeInTheDocument();
  });
});
