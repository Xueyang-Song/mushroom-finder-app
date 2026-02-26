"use client";

interface FiltersProps {
  season: string;
  forestType: string;
  areaType: string;
  showWildfire: boolean;
  onSeasonChange: (v: string) => void;
  onForestTypeChange: (v: string) => void;
  onAreaTypeChange: (v: string) => void;
  onShowWildfireChange: (v: boolean) => void;
}

export default function Filters({
  season,
  forestType,
  areaType,
  showWildfire,
  onSeasonChange,
  onForestTypeChange,
  onAreaTypeChange,
  onShowWildfireChange,
}: FiltersProps) {
  const selectClass =
    "px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500";

  return (
    <div className="flex flex-wrap gap-3 items-center bg-white p-4 rounded-lg shadow-sm">
      <select
        value={season}
        onChange={(e) => onSeasonChange(e.target.value)}
        className={selectClass}
      >
        <option value="">All Seasons</option>
        <option value="spring">Spring</option>
        <option value="summer">Summer</option>
        <option value="fall">Fall</option>
        <option value="winter">Winter</option>
      </select>

      <select
        value={forestType}
        onChange={(e) => onForestTypeChange(e.target.value)}
        className={selectClass}
      >
        <option value="">All Forest Types</option>
        <option value="conifer">Conifer</option>
        <option value="deciduous">Deciduous</option>
        <option value="mixed">Mixed</option>
      </select>

      <select
        value={areaType}
        onChange={(e) => onAreaTypeChange(e.target.value)}
        className={selectClass}
      >
        <option value="">All Public Areas</option>
        <option value="national_forest">National Forest</option>
        <option value="state_park">State Park</option>
        <option value="state_forest">State Forest</option>
        <option value="blm">BLM Land</option>
      </select>

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={showWildfire}
          onChange={(e) => onShowWildfireChange(e.target.checked)}
          className="rounded border-gray-300 text-red-500 focus:ring-red-400"
        />
        🔥 Show Morel / Wildfire Areas
      </label>
    </div>
  );
}
