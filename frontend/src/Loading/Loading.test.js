import React from "react";
import { render } from "@testing-library/react";
import Loading from "./Loading";

test("renders <Loading>", () => {
  const { getByText } = render(<Loading />);

  expect(getByText(/Chargement/i)).toBeInTheDocument();
});
