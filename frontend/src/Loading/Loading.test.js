import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";

test("renders learn react link", () => {
  const { getByText } = render(<Loading />);
  const linkElement = getByText(/Loading/i); // not ideal, need business value
  expect(linkElement).toBeInTheDocument();
});
