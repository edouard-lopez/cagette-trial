import { render, waitForElement } from "@testing-library/react";
import React from "react";
import App from "./App";
import axios from "axios";
jest.mock("axios");

test("renders <App> shows <Loading/>", async () => {
  axios.get.mockResolvedValue({ data: [] });

  const { getByText } = render(<App />);

  expect(getByText(/Chargement/i)).toBeInTheDocument();
});

test("renders <App> shows <Loading/>", async () => {
  axios.get.mockResolvedValue({ data: [] });

  const { getByText } = render(<App />);

  const hero = await waitForElement(() => getByText("Cagette"));
  expect(hero).toBeInTheDocument();
});

test("renders <App> contains <CagetteHero/>", async () => {
  axios.get.mockResolvedValue({
    data: [
      {
        code: "XX1",
        stat: {
          qcm: { data: { "Product 1": 0, "Product 2": 2 } },
          numeric: 697
        }
      }
    ]
  });

  const { getByText } = render(<App />);

  await waitForElement(() => getByText(/Questionnaire/));
  expect(getByText(/Questionnaire/)).toBeInTheDocument();
  expect(getByText(/XX1/)).toBeInTheDocument();
});
