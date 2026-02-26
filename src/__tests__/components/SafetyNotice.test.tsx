import { render, screen } from "@testing-library/react";
import SafetyNotice from "@/components/SafetyNotice";

describe("SafetyNotice", () => {
  it("renders the safety warning heading", () => {
    render(<SafetyNotice />);
    expect(screen.getByText(/Safety Notice/i)).toBeInTheDocument();
  });

  it("warns about mushroom identification", () => {
    render(<SafetyNotice />);
    expect(
      screen.getByText(/Never eat a wild mushroom/i)
    ).toBeInTheDocument();
  });

  it("mentions verifying foraging legality", () => {
    render(<SafetyNotice />);
    expect(
      screen.getByText(/foraging is permitted/i)
    ).toBeInTheDocument();
  });
});
