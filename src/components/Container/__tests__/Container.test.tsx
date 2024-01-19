import {
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Container from "../index";
import { locationData } from "../../../fixtures/locations";
import { dateData } from "../../../fixtures/dates";
import { productData } from "../../../fixtures/products";

import userEvent from "@testing-library/user-event";

const findDateButton = (dayOfWeek: string, dayOfMonth: string) => {
  return Array.from(document.querySelectorAll(".dateButton")).find((button) => {
    const dayOfWeekElement = button.querySelector(".dayOfWeek");
    const dayOfMonthElement = button.querySelector(".dayOfMonth");
    return (
      dayOfWeekElement?.textContent === dayOfWeek &&
      dayOfMonthElement?.textContent === dayOfMonth
    );
  });
};

describe("Container", () => {
  beforeAll(() => {
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterAll(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  it("displays the products when the filters are selected", async () => {
    global.fetch = jest.fn((url) => {
      console.log(url);
      switch (url) {
        case "http://localhost:3001/locations":
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(locationData),
          });
        case "http://localhost:3001/available_dates":
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(dateData),
          });
        case "http://localhost:3001/products?date=2021-07-31&city_id=66746":
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(productData),
          });
        default:
          return Promise.reject(new Error("Unknown URL"));
      }
    });

    const { getByLabelText, getByText, queryByText } = render(<Container />);

    await waitForElementToBeRemoved(() => queryByText("Loading..."));

    userEvent.selectOptions(getByLabelText("Country"), ["France"]);
    userEvent.selectOptions(getByLabelText("City"), ["66746"]);
    const dateButton = findDateButton("Sat", "31");

    if (dateButton) {
      userEvent.click(dateButton);
    }

    await waitFor(() =>
      expect(
        getByText("Catacombs of Paris: Skip The Line + Audio Guide")
      ).toBeInTheDocument()
    );
    await waitFor(() =>
      expect(
        getByText("Palace of Versailles: Palace Entrance + Audio Guide")
      ).toBeInTheDocument()
    );

    await waitFor(() =>
      expect(getByText("Disneyland Paris: Skip The Line")).toBeInTheDocument()
    );
  });
  it("displays an error message when the fetch call fails", async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Failed to fetch data"))
    );

    const { getByText, queryByText } = render(<Container />);

    await waitForElementToBeRemoved(() => queryByText("Loading..."));

    expect(getByText("Error")).toBeInTheDocument();
  });
});
