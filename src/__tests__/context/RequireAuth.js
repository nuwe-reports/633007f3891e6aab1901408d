import React from "react";
import {
  fireEvent,
  render,
  screen,
  cleanup,
  waitFor,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import ToggleColorModeProv from "../../context/ThemeContext";
import App from "../../App";
import axios from "axios";
import RequireAuth from "../../context/RequireAuth";
import { MemoryRouter, Router } from "react-router-dom";

jest.mock("axios");
afterEach(cleanup);

describe("RequireAuth", () => {
  test("should require auth to access /chars", async () => {
    const history = createMemoryHistory({ initialEntries: ["/chars"] });
    window.localStorage.setItem("user", "");
    render(
      <Router location={history.location} navigator={history}>
        <RequireAuth></RequireAuth>
      </Router>
    );
    window.localStorage.getItem("user");
    await waitFor(() => expect(history.location.pathname).toBe("/"));
  });
  test("should require auth to access /chars", async () => {
    const history = createMemoryHistory({ initialEntries: ["/chars"] });
    window.localStorage.setItem("user", "vivi@gmail.com");
    render(
      <Router location={history.location} navigator={history}>
        <RequireAuth></RequireAuth>
      </Router>
    );
    window.localStorage.getItem("user");
    await waitFor(() => expect(history.location.pathname).toBe("/chars"));
  });
});
