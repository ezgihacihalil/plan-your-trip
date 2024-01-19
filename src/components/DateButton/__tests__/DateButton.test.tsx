import { render, fireEvent } from "@testing-library/react";
import DateButton from "../index";

describe("DateButton", () => {
  const dateData = {
    formatted: "Mon 1",
    isSelected: false,
    handleDateClick: jest.fn(),
    shouldDisableDate: false,
  };

  it("renders without crashing", () => {
    const { getByText } = render(<DateButton {...dateData} />);
    expect(getByText("Mon")).toBeInTheDocument();
    expect(getByText("1")).toBeInTheDocument();
  });

  it("calls handleDateClick when clicked", () => {
    const { getByText } = render(<DateButton {...dateData} />);
    fireEvent.click(getByText("1"));
    expect(dateData.handleDateClick).toHaveBeenCalled();
  });

  it("applies the selected class when isSelected is true", () => {
    const { container } = render(
      <DateButton {...dateData} isSelected={true} />
    );
    const button = container.querySelector("button");
    expect(button).toHaveClass("selected");
  });

  it("disables the button when shouldDisableDate is true", () => {
    const { getByText } = render(
      <DateButton {...dateData} shouldDisableDate={true} />
    );
    const button = getByText("1").closest("button");
    expect(button).toBeDisabled();
  });
});
