import Link from "next/link";
import SafetyNotice from "@/components/SafetyNotice";

export default function Home() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          🍄 Mushroom Finder
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the best edible mushrooms in Washington state. Filter by
          season, forest type, and public land. Find morel hotspots based on
          wildfire history.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-green-100">
          <h2 className="font-bold text-lg text-green-700 mb-2">
            🗺️ Interactive Map
          </h2>
          <p className="text-sm text-gray-600">
            Explore approximate hunting zones on a map with filters for season,
            forest type, and public land access.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-red-100">
          <h2 className="font-bold text-lg text-red-700 mb-2">
            🔥 Morel Discovery
          </h2>
          <p className="text-sm text-gray-600">
            Find morel mushroom areas based on previous wildfire burn zones.
            Wildfire data sourced from NIFC.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
          <h2 className="font-bold text-lg text-blue-700 mb-2">
            💬 Community
          </h2>
          <p className="text-sm text-gray-600">
            Create an account, share your hunting experiences, and leave
            comments on spots.
          </p>
        </div>
      </div>

      <div className="text-center mb-10">
        <Link
          href="/dashboard"
          className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
        >
          Start Exploring
        </Link>
      </div>

      <SafetyNotice />
    </main>
  );
}
