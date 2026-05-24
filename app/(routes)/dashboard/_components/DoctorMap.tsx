//ai health doctor
"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";

// Fix Leaflet default icon paths (Next.js static asset issue)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// ── Custom icons ─────────────────────────────────────────────────────────────
const userIcon = L.divIcon({
  className: "",
  html: `<div style="
        width:18px;height:18px;border-radius:50%;
        background:radial-gradient(circle at 35% 35%,#60a5fa,#2563eb);
        border:3px solid #fff;
        box-shadow:0 0 0 4px rgba(37,99,235,0.25),0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const doctorIcon = (selected: boolean) =>
  L.divIcon({
    className: "",
    html: `<div style="
            width:${selected ? 36 : 28}px;
            height:${selected ? 36 : 28}px;
            border-radius:50%;
            background:${selected ? "linear-gradient(135deg,#38bdf8,#2563eb)" : "linear-gradient(135deg,#e0f2fe,#7dd3fc)"};
            border:${selected ? "3px solid #fff" : "2px solid #bae6fd"};
            box-shadow:${
              selected
                ? "0 0 0 4px rgba(37,99,235,0.3),0 4px 16px rgba(37,99,235,0.4)"
                : "0 2px 6px rgba(0,0,0,0.18)"
            };
            display:flex;align-items:center;justify-content:center;
            transition:all 0.2s;
        ">
            <svg width="${selected ? 16 : 13}" height="${selected ? 16 : 13}" viewBox="0 0 24 24" fill="none"
                stroke="${selected ? "#fff" : "#0ea5e9"}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.15 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012.06 1.23h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.13a16 16 0 006.78 6.78l1.17-1.17a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
            </svg>
        </div>`,
    iconSize: [selected ? 36 : 28, selected ? 36 : 28],
    iconAnchor: [selected ? 18 : 14, selected ? 18 : 14],
  });

// ── Map controller: fly to selected doctor ────────────────────────────────────
function MapController({ selected }: { selected: Doctor | null }) {
  const map = useMap();
  useEffect(() => {
    if (selected?.lat != null && selected?.lng != null) {
      map.flyTo([selected.lat, selected.lng], 15, { duration: 0.8 });
    }
  }, [selected, map]);
  return null;
}

// ── Types (local) ─────────────────────────────────────────────────────────────
type Doctor = {
  id: string | number;
  name: string;
  specialty: string;
  hospital: string;
  address: string;
  lat?: number;
  lng?: number;
  available: boolean;
  distance: string;
  rating: number;
};

type Props = {
  userCoords: { lat: number; lng: number } | null;
  doctors: Doctor[];
  selected: Doctor | null;
  onSelect: (doc: Doctor) => void;
};

export default function DoctorMap({
  userCoords,
  doctors,
  selected,
  onSelect,
}: Props) {
  const center: [number, number] = userCoords
    ? [userCoords.lat, userCoords.lng]
    : [19.076, 72.8777]; // Mumbai fallback

  return (
    <MapContainer
      center={center}
      zoom={14}
      style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location marker */}
      {userCoords && (
        <Marker position={[userCoords.lat, userCoords.lng]} icon={userIcon}>
          <Popup>
            <span style={{ fontWeight: 600, fontSize: 13 }}>You are here</span>
          </Popup>
        </Marker>
      )}

      {/* Doctor markers */}
      {doctors
        .filter((d) => d.lat != null && d.lng != null)
        .map((doc) => (
          <Marker
            key={doc.id}
            position={[doc.lat!, doc.lng!]}
            icon={doctorIcon(selected?.id === doc.id)}
            eventHandlers={{ click: () => onSelect(doc) }}
            zIndexOffset={selected?.id === doc.id ? 1000 : 0}
          >
            <Popup>
              <div style={{ minWidth: 160 }}>
                <p style={{ fontWeight: 700, fontSize: 13, margin: "0 0 2px" }}>
                  {doc.name}
                </p>
                <p style={{ fontSize: 11, color: "#555", margin: 0 }}>
                  {doc.specialty}
                </p>
                <p style={{ fontSize: 11, color: "#888", margin: "2px 0 0" }}>
                  {doc.distance} away
                </p>
              </div>
            </Popup>
          </Marker>
        ))}

      <MapController selected={selected} />
    </MapContainer>
  );
}
