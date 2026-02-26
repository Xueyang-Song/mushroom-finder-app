"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Filters from "@/components/Filters";
import MushroomList from "@/components/MushroomList";
import SpotDetail from "@/components/SpotDetail";
import SafetyNotice from "@/components/SafetyNotice";

// Leaflet must be loaded client-side only
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

interface Spot {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  season: string;
  forest_type: string;
  area_type: string;
  data_source?: string;
  data_updated_at?: string;
}

interface WildfireArea {
  id: number;
  fire_name: string;
  fire_year: number;
  latitude: number;
  longitude: number;
  acres: number;
  data_source?: string;
}

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

export default function DashboardPage() {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [wildfireAreas, setWildfireAreas] = useState<WildfireArea[]>([]);
  const [mushrooms, setMushrooms] = useState<Mushroom[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);

  // Filter state
  const [season, setSeason] = useState("");
  const [forestType, setForestType] = useState("");
  const [areaType, setAreaType] = useState("");
  const [showWildfire, setShowWildfire] = useState(false);

  useEffect(() => {
    fetchSpots();
    fetchMushrooms();
    fetchWildfire();
  }, [season, forestType, areaType]);

  async function fetchSpots() {
    const params = new URLSearchParams();
    if (season) params.set("season", season);
    if (forestType) params.set("forest_type", forestType);
    if (areaType) params.set("area_type", areaType);

    const res = await fetch(`/api/spots?${params}`);
    const data = await res.json();
    if (Array.isArray(data)) setSpots(data);
  }

  async function fetchMushrooms() {
    const params = new URLSearchParams();
    if (season) params.set("season", season);
    if (forestType) params.set("forest_type", forestType);
    if (areaType) params.set("area_type", areaType);

    const res = await fetch(`/api/mushrooms?${params}`);
    const data = await res.json();
    if (Array.isArray(data)) setMushrooms(data);
  }

  async function fetchWildfire() {
    const res = await fetch("/api/wildfire");
    const data = await res.json();
    if (Array.isArray(data)) setWildfireAreas(data);
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <h1 className="text-2xl font-bold text-green-800">
        Explore Mushroom Hunting Spots
      </h1>

      <SafetyNotice />

      <Filters
        season={season}
        forestType={forestType}
        areaType={areaType}
        showWildfire={showWildfire}
        onSeasonChange={setSeason}
        onForestTypeChange={setForestType}
        onAreaTypeChange={setAreaType}
        onShowWildfireChange={setShowWildfire}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <MapView
            spots={spots}
            wildfireAreas={wildfireAreas}
            showWildfire={showWildfire}
            onSpotClick={setSelectedSpot}
          />
        </div>
        <div>
          {selectedSpot ? (
            <SpotDetail
              spot={selectedSpot}
              onClose={() => setSelectedSpot(null)}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
              <p className="text-sm">
                Click a spot on the map to see details and comments.
              </p>
            </div>
          )}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-green-800 mb-4">
          Edible Mushrooms in Washington
          {season && ` — ${season}`}
        </h2>
        <MushroomList mushrooms={mushrooms} />
      </div>

      {/* Donation section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h2 className="text-lg font-bold text-green-800 mb-2">
          Support Mushroom Finder
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Help us keep the data fresh and the app running. Every contribution
          counts.
        </p>
        <a
          href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
        >
          💚 Donate
        </a>
      </div>
    </main>
  );
}
