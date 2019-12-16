import React from "react";
import { render } from "@testing-library/react";
import Moyenne from "./Moyenne";

test("renders <Moyenne>", () => {
  const stat = { numeric: 697 };

  const { getByText } = render(<Moyenne stat={stat} />);

  expect(getByText(/697/)).toBeInTheDocument();
});
