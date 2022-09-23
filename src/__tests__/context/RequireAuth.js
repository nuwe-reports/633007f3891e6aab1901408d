import React from "react";
import { render, cleanup, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";

import RequireAuth from "../../context/RequireAuth";
import { Router } from "react-router-dom";

jest.mock("axios");
afterEach(cleanup);

describe("RequireAuth", () => {
  test("should not navigate chars when no user", async () => {
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
  test("should navigate /chars when user", async () => {
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
