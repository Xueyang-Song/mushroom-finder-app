import { render, screen, fireEvent } from "@testing-library/react";
import Filters from "@/components/Filters";

describe("Filters", () => {
  const defaultProps = {
    season: "",
    forestType: "",
    areaType: "",
    showWildfire: false,
    onSeasonChange: jest.fn(),
    onForestTypeChange: jest.fn(),
    onAreaTypeChange: jest.fn(),
    onShowWildfireChange: jest.fn(),
  };

  it("renders all filter dropdowns", () => {
    render(<Filters {...defaultProps} />);
    expect(screen.getByText("All Seasons")).toBeInTheDocument();
    expect(screen.getByText("All Forest Types")).toBeInTheDocument();
    expect(screen.getByText("All Public Areas")).toBeInTheDocument();
  });

  it("renders wildfire toggle", () => {
    render(<Filters {...defaultProps} />);
    expect(
      screen.getByText(/Show Morel \/ Wildfire Areas/i)
    ).toBeInTheDocument();
  });

  it("calls onSeasonChange when season is selected", () => {
    const onSeasonChange = jest.fn();
    render(<Filters {...defaultProps} onSeasonChange={onSeasonChange} />);

    const seasonSelect = screen.getByDisplayValue("All Seasons");
    fireEvent.change(seasonSelect, { target: { value: "fall" } });

    expect(onSeasonChange).toHaveBeenCalledWith("fall");
  });

  it("calls onShowWildfireChange when toggled", () => {
    const onShowWildfireChange = jest.fn();
    render(
      <Filters {...defaultProps} onShowWildfireChange={onShowWildfireChange} />
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(onShowWildfireChange).toHaveBeenCalledWith(true);
  });

  it("shows season options", () => {
    render(<Filters {...defaultProps} />);
    expect(screen.getByText("Spring")).toBeInTheDocument();
    expect(screen.getByText("Summer")).toBeInTheDocument();
    expect(screen.getByText("Fall")).toBeInTheDocument();
    expect(screen.getByText("Winter")).toBeInTheDocument();
  });
});
