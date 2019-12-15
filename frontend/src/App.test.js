import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Loading/i); // not ideal, need business value
  expect(linkElement).toBeInTheDocument();
});
