"use client";

interface Mushroom {
  id: number;
  name: string;
  scientific_name: string;
  description: string;
  seasons: string[];
  forest_types: string[];
  public_areas: string[];
  is_morel: boolean;
}

interface MushroomListProps {
  mushrooms: Mushroom[];
}

export default function MushroomList({ mushrooms }: MushroomListProps) {
  if (mushrooms.length === 0) {
    return (
      <p className="text-gray-500 text-sm py-4">
        No mushrooms match your current filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mushrooms.map((m) => (
        <div
          key={m.id}
          className={`p-4 rounded-lg border ${
            m.is_morel
              ? "border-red-200 bg-red-50"
              : "border-green-200 bg-green-50"
          }`}
        >
          <h3 className="font-bold text-lg">
            {m.is_morel ? "🔥 " : "🍄 "}
            {m.name}
          </h3>
          <p className="text-xs text-gray-500 italic">{m.scientific_name}</p>
          <p className="text-sm text-gray-700 mt-2">{m.description}</p>
          <div className="flex flex-wrap gap-1 mt-3">
            {m.seasons.map((s) => (
              <span
                key={s}
                className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded"
              >
                {s}
              </span>
            ))}
            {m.forest_types.map((f) => (
              <span
                key={f}
                className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
