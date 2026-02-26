import { render, screen } from "@testing-library/react";
import DataSourceBadge from "@/components/DataSourceBadge";

describe("DataSourceBadge", () => {
  it("renders nothing when no source provided", () => {
    const { container } = render(<DataSourceBadge />);
    expect(container.firstChild).toBeNull();
  });

  it("renders source name", () => {
    render(<DataSourceBadge source="NIFC Open Data" />);
    expect(screen.getByText(/NIFC Open Data/i)).toBeInTheDocument();
  });

  it("renders source with date", () => {
    render(
      <DataSourceBadge
        source="USFS Open Data"
        updatedAt="2025-10-15T12:00:00Z"
      />
    );
    expect(screen.getByText(/USFS Open Data/i)).toBeInTheDocument();
    // Date may render as 10/15 or 10/14 depending on timezone
    expect(screen.getByText(/10\/1[45]\/2025/)).toBeInTheDocument();
  });
});
