import React from "react";
import { screen, render, cleanup } from "@testing-library/react";

import Loader from "../../components/Loader";

afterEach(cleanup);

describe("Loader", () => {
  test("should render Loader", () => {
    render(<Loader />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });
});
