import React from "react";
import axios from "axios";
import { screen, render, cleanup, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ToggleColorModeProv from "../../context/ThemeContext";
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

  test("Register user succesfully", async () => {
    const route = "/";
    const mockdata = {
      response: { data: { name: "vivi", email: "vivi@gmail.com" } },
      status: 200,
    };
    axios.post.mockResolvedValueOnce(() =>
      Promise.resolve({
        mockdata,
      })
    );

    render(
      <ToggleColorModeProv>
        <Home />
      </ToggleColorModeProv>
    );
    fireEvent.click(screen.getByText("REGISTER"));
    expect(await screen.queryByText("LOGIN")).toBeInTheDocument();
  });
});
