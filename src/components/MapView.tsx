"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icons in Next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const fireIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "fire-marker",
});

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

interface MapViewProps {
  spots: Spot[];
  wildfireAreas: WildfireArea[];
  showWildfire: boolean;
  onSpotClick?: (spot: Spot) => void;
}

export default function MapView({
  spots,
  wildfireAreas,
  showWildfire,
  onSpotClick,
}: MapViewProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Loading map...</p>
      </div>
    );
  }

  // Center on Washington state
  const center: [number, number] = [47.4, -120.7];

  return (
    <MapContainer
      center={center}
      zoom={7}
      className="w-full h-[500px] rounded-lg z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Hunting spots */}
      {spots.map((spot) => (
        <Marker
          key={`spot-${spot.id}`}
          position={[spot.latitude, spot.longitude]}
          icon={defaultIcon}
          eventHandlers={{
            click: () => onSpotClick?.(spot),
          }}
        >
          <Popup>
            <div className="text-sm">
              <h3 className="font-bold">{spot.name}</h3>
              <p className="text-gray-600">{spot.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                {spot.season} · {spot.forest_type} · {spot.area_type}
              </p>
              {spot.data_source && (
                <p className="text-xs text-blue-500 mt-1">
                  Source: {spot.data_source}
                </p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Wildfire areas for morel discovery */}
      {showWildfire &&
        wildfireAreas.map((area) => (
          <Circle
            key={`fire-${area.id}`}
            center={[area.latitude, area.longitude]}
            radius={Math.sqrt(area.acres) * 40}
            pathOptions={{
              color: "#ef4444",
              fillColor: "#fca5a5",
              fillOpacity: 0.3,
            }}
          >
            <Popup>
              <div className="text-sm">
                <h3 className="font-bold text-red-700">
                  🔥 {area.fire_name}
                </h3>
                <p>
                  Year: {area.fire_year} · {area.acres.toLocaleString()} acres
                </p>
                <p className="text-green-700 font-medium mt-1">
                  Potential morel habitat (spring following fire)
                </p>
                {area.data_source && (
                  <p className="text-xs text-blue-500 mt-1">
                    Source: {area.data_source}
                  </p>
                )}
              </div>
            </Popup>
          </Circle>
        ))}
    </MapContainer>
  );
}
