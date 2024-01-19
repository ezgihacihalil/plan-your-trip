import { formatDate } from "../utils";

describe("formatDate", () => {
  it("formats the date correctly", () => {
    const date = "2022-01-01T00:00:00Z";
    const result = formatDate(date);

    expect(result?.original).toBe(date);

    const expectedFormattedDate = new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      weekday: "short",
    });
    expect(result?.formatted).toBe(expectedFormattedDate);
  });

  it("returns null when the input is not a valid date", () => {
    const date = "not a valid date";
    const result = formatDate(date);

    expect(result).toBeNull();
  });
});
