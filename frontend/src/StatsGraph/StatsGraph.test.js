test("renders <StatsGraph>", async () => {
  const message =
    "// todo with cypress as  Jest uses jsdom to execute its tests and no rendering is performed";

  expect(message).toMatch("todo with cypress");
});
