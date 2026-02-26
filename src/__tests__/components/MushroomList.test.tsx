import { render, screen } from "@testing-library/react";
import MushroomList from "@/components/MushroomList";

const mockMushrooms = [
  {
    id: 1,
    name: "Chanterelle",
    scientific_name: "Cantharellus formosus",
    description: "Golden mushroom with false gills.",
    seasons: ["fall", "summer"],
    forest_types: ["conifer", "mixed"],
    public_areas: ["national_forest"],
    is_morel: false,
  },
  {
    id: 2,
    name: "Morel",
    scientific_name: "Morchella spp.",
    description: "Honeycomb cap mushroom found in burn areas.",
    seasons: ["spring"],
    forest_types: ["conifer"],
    public_areas: ["national_forest"],
    is_morel: true,
  },
];

describe("MushroomList", () => {
  it("shows empty message when no mushrooms match", () => {
    render(<MushroomList mushrooms={[]} />);
    expect(
      screen.getByText(/No mushrooms match your current filters/i)
    ).toBeInTheDocument();
  });

  it("renders mushroom names", () => {
    render(<MushroomList mushrooms={mockMushrooms} />);
    expect(screen.getByText(/Chanterelle/)).toBeInTheDocument();
    expect(screen.getByText(/Morel/)).toBeInTheDocument();
  });

  it("renders scientific names", () => {
    render(<MushroomList mushrooms={mockMushrooms} />);
    expect(screen.getByText("Cantharellus formosus")).toBeInTheDocument();
    expect(screen.getByText("Morchella spp.")).toBeInTheDocument();
  });

  it("renders season tags", () => {
    render(<MushroomList mushrooms={mockMushrooms} />);
    expect(screen.getByText("fall")).toBeInTheDocument();
    expect(screen.getByText("spring")).toBeInTheDocument();
  });

  it("renders descriptions", () => {
    render(<MushroomList mushrooms={mockMushrooms} />);
    expect(
      screen.getByText(/Golden mushroom with false gills/i)
    ).toBeInTheDocument();
  });
});
