import * as Parser from "./parser";

test("restructure data", () => {
  const dataFromBackend = [
    {
      code: "XX1",
      stat: {
        qcm: { data: { "Product 1": 0, "Product 2": 2 } },
        numeric: 697
      }
    }
  ];

  const newData = Parser.restructure(dataFromBackend);
  expect(newData).toEqual([
    {
      code: "XX1",
      qcm: [
        { name: "Product 1", count: 0 },
        { name: "Product 2", count: 2 }
      ],
      numeric: 697
    }
  ]);
});
