"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import type { Doctor as MapDoctor } from "@/components/DoctorMap";
import {
    MapPin, Star, Clock, Phone, Search, Navigation,
    CheckCircle2, ArrowLeft, Calendar, Globe, Stethoscope,
    X, RefreshCw, Loader2, AlertCircle, Wifi, WifiOff,
    Heart, Brain, Bone, Eye, Baby, Thermometer, Activity,
    SlidersHorizontal, Zap, Building2, ChevronRight,
} from "lucide-react";
import Link from "next/link";

// ── Dynamically import DoctorMap (Leaflet is browser-only) ──────────────────
const DoctorMap = dynamic(() => import("@/components/DoctorMap"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4"
            style={{ background: "linear-gradient(135deg,#0f172a 0%,#1a2744 100%)" }}>
            <div className="relative">
                <div className="absolute inset-0 w-14 h-14 rounded-full animate-ping"
                    style={{ background: "rgba(56,189,248,0.2)" }} />
                <div className="w-14 h-14 rounded-full flex items-center justify-center relative"
                    style={{ background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)" }}>
                    <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#38bdf8" }} />
                </div>
            </div>
            <p className="text-xs font-mono tracking-[0.25em] uppercase" style={{ color: "rgba(56,189,248,0.5)" }}>
                Loading map
            </p>
        </div>
    ),
});

// Extend MapDoctor with optional real fields your API returns
type Doctor = MapDoctor & {
    phone?: string;
    website?: string;
    openingHours?: string;
};

// ─── Fallback mock data (used when API is unreachable) ────────────────────────
const MOCK_DOCTORS: Doctor[] = [
    { id: 1, name: "Dr. Rajesh pawar", specialty: "General Practice", rating: 4.9, reviews: 312, distance: "0.4 km", distanceNum: 0.4, address: "Nashik", hospital: "Apollo Clinic", available: true, nextSlot: "Today, 11:30 AM", experience: "14 yrs", fee: "₹500", avatar: "AS", avatarBg: "linear-gradient(135deg,#c4b5fd,#6366f1)", tagBg: "#ede9fe", verified: true, languages: ["Hindi", "English"] },
    { id: 2, name: "Dr. Rohan Mehta", specialty: "Cardiology", rating: 4.8, reviews: 189, distance: "0.9 km", distanceNum: 0.9, address: "Vasant,Nashik", hospital: "Fortis Heart Centre", available: true, nextSlot: "Today, 2:00 PM", experience: "20 yrs", fee: "₹1,200", avatar: "RM", avatarBg: "linear-gradient(135deg,#fca5a5,#dc2626)", tagBg: "#fee2e2", verified: true, languages: ["English", "Marathi"] },
    { id: 3, name: "Dr. Priya patil", specialty: "Dermatology", rating: 4.7, reviews: 254, distance: "1.2 km", distanceNum: 1.2, address: "Green Park,Nashik", hospital: "Max Skin Clinic", available: false, nextSlot: "Tomorrow, 10:00 AM", experience: "10 yrs", fee: "₹800", avatar: "PN", avatarBg: "linear-gradient(135deg,#fdba74,#ea580c)", tagBg: "#ffedd5", verified: true, languages: ["Malayalam", "English", "Hindi"] },
    { id: 4, name: "Dr. Suresh pawar", specialty: "Neurology", rating: 4.9, reviews: 421, distance: "1.5 km", distanceNum: 1.5, address: "Ansari Nagar, Nashik", hospital: "AIIMS OPD Block", available: true, nextSlot: "Today, 4:30 PM", experience: "25 yrs", fee: "₹1,500", avatar: "SI", avatarBg: "linear-gradient(135deg,#6ee7b7,#059669)", tagBg: "#dcfce7", verified: true, languages: ["Tamil", "English"] },
    { id: 5, name: "Dr. Kavitha Reddy", specialty: "Gynecology", rating: 4.6, reviews: 178, distance: "1.8 km", distanceNum: 1.8, address: "HSR Layout, Nashik", hospital: "Narayana Women's Clinic", available: true, nextSlot: "Today, 6:00 PM", experience: "12 yrs", fee: "₹700", avatar: "KR", avatarBg: "linear-gradient(135deg,#d8b4fe,#9333ea)", tagBg: "#f3e8ff", verified: false, languages: ["Telugu", "Kannada", "English"] },
    { id: 6, name: "Dr. Aditya Singh", specialty: "Orthopedics", rating: 4.8, reviews: 305, distance: "2.1 km", distanceNum: 2.1, address: "Koramangala, Nashik", hospital: "Bone & Joint Clinic", available: false, nextSlot: "Tomorrow, 9:00 AM", experience: "18 yrs", fee: "₹1,000", avatar: "AS", avatarBg: "linear-gradient(135deg,#67e8f9,#0ea5e9)", tagBg: "#e0f2fe", verified: true, languages: ["Hindi", "English"] },
];

// ─── Specialty icon map ───────────────────────────────────────────────────────
const SPECIALTY_ICONS: Record<string, React.ReactNode> = {
    "Cardiology": <Heart className="w-3 h-3" />,
    "Neurology": <Brain className="w-3 h-3" />,
    "Orthopedics": <Bone className="w-3 h-3" />,
    "Ophthalmology": <Eye className="w-3 h-3" />,
    "Gynecology": <Baby className="w-3 h-3" />,
    "General Practice": <Thermometer className="w-3 h-3" />,
    "Dermatology": <Activity className="w-3 h-3" />,
    "Multi-Speciality Hospital": <Building2 className="w-3 h-3" />,
    "Internal Medicine": <Stethoscope className="w-3 h-3" />,
};

const SORT_OPTIONS = [
    { label: "Nearest", value: "distance", icon: <MapPin className="w-3 h-3" /> },
    { label: "Top Rated", value: "rating", icon: <Star className="w-3 h-3" /> },
    { label: "Available", value: "available", icon: <Zap className="w-3 h-3" /> },
];

const SPECIALTY_CHIPS = [
    "All", "General Practice", "Cardiology", "Dermatology",
    "Neurology", "Gynecology", "Orthopedics", "Internal Medicine", "Multi-Speciality Hospital",
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function NearMePage() {
    const [search, setSearch] = useState("");
    const [availableOnly, setAvailableOnly] = useState(false);
    const [sortBy, setSortBy] = useState("distance");
    const [specialty, setSpecialty] = useState("All");
    const [locationGranted, setLocationGranted] = useState<boolean | null>(null);
    const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
    const [selected, setSelected] = useState<Doctor | null>(null);
    const [showFilters, setShowFilters] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[]>(MOCK_DOCTORS);
    const [loading, setLoading] = useState(false);
    const [liveData, setLiveData] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cacheHit, setCacheHit] = useState(false);

    const cardRefs = useRef<Record<string | number, HTMLDivElement | null>>({});

    // ── Geolocation ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (!navigator.geolocation) { setLocationGranted(false); return; }
        navigator.geolocation.getCurrentPosition(
            pos => {
                setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
                setLocationGranted(true);
            },
            () => setLocationGranted(false),
            { timeout: 12000, enableHighAccuracy: true }
        );
    }, []);

    // ── Fetch via existing /api/nearby-doctors (server cache included) ───────
    const fetchDoctors = useCallback(async (lat: number, lng: number) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/nearby-doctors?lat=${lat}&lng=${lng}&radius=5000`);

            // Your API route sets X-Cache: HIT on cached responses
            setCacheHit(res.headers.get("X-Cache") === "HIT");

            if (!res.ok) throw new Error(`API error ${res.status}`);

            const data = await res.json();

            if (Array.isArray(data.doctors) && data.doctors.length > 0) {
                setDoctors(data.doctors as Doctor[]);
                setLiveData(true);
            } else {
                setDoctors(MOCK_DOCTORS);
                setLiveData(false);
                setError("No doctors found nearby — showing sample data.");
            }
        } catch (err: any) {
            console.error("[NearMe] fetch error:", err);
            setDoctors(MOCK_DOCTORS);
            setLiveData(false);
            setError("Couldn't reach live data — showing sample results.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (coords) fetchDoctors(coords.lat, coords.lng);
    }, [coords, fetchDoctors]);

    // ── Auto-scroll selected card ─────────────────────────────────────────────
    useEffect(() => {
        if (selected) cardRefs.current[selected.id]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [selected]);

    // ── Filter + sort ─────────────────────────────────────────────────────────
    const filtered = doctors
        .filter(d => {
            const q = search.toLowerCase();
            return (
                (!q ||
                    d.name.toLowerCase().includes(q) ||
                    d.specialty.toLowerCase().includes(q) ||
                    d.hospital.toLowerCase().includes(q) ||
                    d.address.toLowerCase().includes(q)
                ) &&
                (!availableOnly || d.available) &&
                (specialty === "All" || d.specialty === specialty)
            );
        })
        .sort((a, b) => {
            if (sortBy === "distance") return a.distanceNum - b.distanceNum;
            if (sortBy === "rating") return b.rating - a.rating;
            if (sortBy === "available") return Number(b.available) - Number(a.available);
            return 0;
        });

    const availCount = filtered.filter(d => d.available).length;
    const avgRating = filtered.length
        ? (filtered.reduce((s, d) => s + d.rating, 0) / filtered.length).toFixed(1)
        : "—";

    const dirUrl = (doc: Doctor) =>
        doc.lat != null && doc.lng != null
            ? `https://www.google.com/maps/dir/?api=1&destination=${doc.lat},${doc.lng}`
            : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(doc.hospital + " " + doc.address)}`;

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <div className="w-full" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>

            {/* ── HEADER ────────────────────────────────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
                <Link href="/dashboard"
                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-neutral-700 mb-7 group transition-colors">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                    Dashboard
                </Link>

                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-6">
                    <div>
                        {/* Live badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.18em] mb-4 transition-all"
                            style={liveData
                                ? { background: "#dbeafe", color: "#1d4ed8" }
                                : { background: "#f3f4f6", color: "#9ca3af" }}>
                            {liveData ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                            {liveData
                                ? (cacheHit ? "Live · Cached (2 min)" : "Live · SerpApi Google Maps")
                                : "Sample Data"}
                        </div>

                        <h1 className="text-[2.4rem] sm:text-[3.2rem] font-bold tracking-[-0.04em] leading-[0.9] mb-3"
                            style={{ color: "#0a0a0a" }}>
                            Doctors
                            <br />
                            <span className="bg-clip-text text-transparent"
                                style={{ backgroundImage: "linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%)" }}>
                                Near You
                            </span>
                        </h1>

                        <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#6b7280" }}>
                            {locationGranted === null
                                ? "Acquiring GPS signal…"
                                : locationGranted
                                    ? liveData
                                        ? `${doctors.length} healthcare facilities within 5 km`
                                        : "Grant location access for real nearby results"
                                    : "Location denied — showing sample data"}
                        </p>
                    </div>

                    {/* Stat tiles */}
                    <div className="flex gap-2.5 flex-shrink-0">
                        {[
                            { v: String(filtered.length), l: "Found", c: "#6366f1" },
                            { v: String(availCount), l: "Open Now", c: "#22c55e" },
                            { v: avgRating + " ★", l: "Avg Rating", c: "#f59e0b" },
                        ].map((s, i) => (
                            <motion.div key={s.l}
                                initial={{ opacity: 0, scale: 0.88 }}
                                animate={{ opacity: 1, scale: 1, transition: { delay: 0.1 + i * 0.07 } }}
                                className="flex flex-col items-center justify-center w-[72px] h-[72px] rounded-2xl"
                                style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)", boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
                                <p className="text-base font-bold tracking-tight" style={{ color: s.c }}>{s.v}</p>
                                <p className="text-[9px] font-semibold uppercase tracking-wide mt-0.5" style={{ color: "#9ca3af" }}>{s.l}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Status pills */}
                <div className="flex flex-wrap items-center gap-2 mb-8">
                    <StatusPill color={locationGranted ? "green" : locationGranted === false ? "amber" : "gray"}>
                        <Navigation className="w-3.5 h-3.5" />
                        {locationGranted === null ? "Detecting…" : locationGranted ? "GPS active" : "No GPS"}
                    </StatusPill>

                    {coords && (
                        <button
                            onClick={() => fetchDoctors(coords.lat, coords.lng)}
                            disabled={loading}
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all active:scale-95 disabled:opacity-50"
                            style={{ background: "#111", color: "#fff" }}>
                            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                            {loading ? "Fetching…" : "Refresh"}
                        </button>
                    )}

                    {error && (
                        <StatusPill color="amber">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate max-w-[210px]">{error}</span>
                        </StatusPill>
                    )}
                </div>
            </motion.div>

            {/* ── TWO-COLUMN LAYOUT ──────────────────────────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_448px] gap-6 items-start">

                {/* LEFT: MAP + DETAIL PANEL */}
                <div className="xl:sticky xl:top-6 flex flex-col gap-4">

                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.1 } }}
                        style={{
                            height: "clamp(280px, 45vw, 520px)",
                            borderRadius: "24px",
                            overflow: "hidden",
                            boxShadow: "0 4px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)",
                        }}>
                        <DoctorMap
                            userCoords={coords}
                            doctors={filtered}
                            selected={selected}
                            onSelect={(doc: Doctor) => setSelected(selected?.id === doc.id ? null : doc)}
                        />
                    </motion.div>

                    {/* Selected doctor detail panel */}
                    <AnimatePresence>
                        {selected && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.97 }}
                                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                style={{
                                    borderRadius: "24px",
                                    background: "linear-gradient(150deg,#0f172a 0%,#1e293b 100%)",
                                    boxShadow: "0 12px 48px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.05)",
                                    overflow: "hidden",
                                    position: "relative",
                                }}>
                                {/* Glow orb */}
                                <div style={{
                                    position: "absolute", top: 0, right: 0, width: 220, height: 220,
                                    background: "radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)",
                                    transform: "translate(30%,-30%)", pointerEvents: "none",
                                }} />

                                <div className="p-6 relative">
                                    <button onClick={() => setSelected(null)}
                                        className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                        style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.4)" }}>
                                        <X className="w-4 h-4" />
                                    </button>

                                    {/* Doctor identity */}
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-lg font-bold flex-shrink-0"
                                            style={{ background: selected.avatarBg, boxShadow: "0 4px 16px rgba(0,0,0,0.3)" }}>
                                            {selected.avatar}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-base font-bold text-white tracking-tight">{selected.name}</h3>
                                                {selected.verified && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                                            </div>
                                            <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
                                                {selected.specialty}
                                                {selected.experience && selected.experience !== "N/A" ? ` · ${selected.experience} exp` : ""}
                                            </p>
                                            <div className="flex items-center gap-1.5 mt-1.5">
                                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                <span className="text-sm font-bold text-white">{selected.rating}</span>
                                                {selected.reviews != null && selected.reviews > 0 && (
                                                    <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                                                        ({selected.reviews.toLocaleString()} reviews)
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Availability badge */}
                                    <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold"
                                        style={selected.available
                                            ? { background: "rgba(34,197,94,0.12)", color: "#4ade80", border: "1px solid rgba(34,197,94,0.2)" }
                                            : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.08)" }}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${selected.available ? "bg-green-400" : "bg-white/25"}`} />
                                        {selected.available ? `Open · ${selected.nextSlot}` : `Closed · Next: ${selected.nextSlot}`}
                                    </div>

                                    {/* Info rows */}
                                    <div className="space-y-2.5 mb-5">
                                        <DInfoRow icon={<MapPin className="w-3.5 h-3.5" />}
                                            text={[selected.hospital, selected.address && selected.address !== "Local Area" && selected.address !== "Nearby" ? selected.address : null].filter(Boolean).join(" · ")} />
                                        {(selected as any).phone && (
                                            <DInfoRow icon={<Phone className="w-3.5 h-3.5" />} text={(selected as any).phone} />
                                        )}
                                        {(selected as any).openingHours && (
                                            <DInfoRow icon={<Clock className="w-3.5 h-3.5" />} text={(selected as any).openingHours} />
                                        )}
                                        <DInfoRow icon={<Globe className="w-3.5 h-3.5" />}
                                            text={`Speaks: ${selected.languages?.join(", ") ?? "N/A"}`} />
                                        <DInfoRow icon={<Stethoscope className="w-3.5 h-3.5" />}
                                            text={`Fee: ${selected.fee}`} />
                                    </div>

                                    {/* CTA buttons */}
                                    <div className="flex gap-3">
                                        <a href={dirUrl(selected)} target="_blank" rel="noopener noreferrer"
                                            className="flex-1 py-3 rounded-2xl text-sm font-bold text-white text-center flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98]"
                                            style={{ background: "linear-gradient(135deg,#38bdf8,#6366f1)" }}>
                                            <Navigation className="w-4 h-4" />
                                            Directions
                                        </a>
                                        {(selected as any).website ? (
                                            <a href={(selected as any).website} target="_blank" rel="noopener noreferrer"
                                                className="px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all hover:opacity-80"
                                                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                                                <Globe className="w-4 h-4" />
                                                Website
                                            </a>
                                        ) : (
                                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${selected.name} ${selected.address}`)}`}
                                                target="_blank" rel="noopener noreferrer"
                                                className="px-5 py-3 rounded-2xl text-sm font-semibold flex items-center gap-2 transition-all hover:opacity-80"
                                                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)" }}>
                                                <MapPin className="w-4 h-4" />
                                                Google Maps
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* RIGHT: SEARCH + DOCTOR LIST */}
                <div className="flex flex-col gap-3.5">

                    {/* Search bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.15 } }}
                        className="flex gap-2.5">
                        <div className="flex flex-1 items-center gap-3 px-4 py-3.5 rounded-2xl"
                            style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <Search className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                            <input
                                type="text"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search name, specialty, hospital…"
                                className="flex-1 bg-transparent outline-none text-sm text-neutral-900 placeholder:text-neutral-400"
                            />
                            {search && (
                                <button onClick={() => setSearch("")} className="text-neutral-300 hover:text-neutral-500 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <button
                            onClick={() => setShowFilters(f => !f)}
                            className="flex items-center gap-2 px-4 py-3.5 rounded-2xl text-sm font-semibold transition-all"
                            style={showFilters
                                ? { background: "#111", color: "#fff" }
                                : { background: "#fff", color: "#374151", border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                            <SlidersHorizontal className="w-4 h-4" />
                            <span className="hidden sm:block">Filters</span>
                        </button>
                    </motion.div>

                    {/* Collapsible filter panel */}
                    <AnimatePresence>
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ overflow: "hidden" }}>
                                <div className="rounded-2xl p-5 space-y-4"
                                    style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.07)" }}>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-neutral-400 mb-3">Sort by</p>
                                        <div className="flex gap-2 flex-wrap">
                                            {SORT_OPTIONS.map(o => (
                                                <button key={o.value} onClick={() => setSortBy(o.value)}
                                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                                                    style={sortBy === o.value
                                                        ? { background: "#111", color: "#fff" }
                                                        : { background: "#f3f4f6", color: "#555" }}>
                                                    {o.icon}{o.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "#f3f4f6" }}>
                                        <div>
                                            <p className="text-sm font-semibold text-neutral-800">Available now only</p>
                                            <p className="text-xs text-neutral-400 mt-0.5">Show only open clinics</p>
                                        </div>
                                        <button onClick={() => setAvailableOnly(a => !a)}
                                            className="relative w-11 h-6 rounded-full transition-colors duration-200"
                                            style={{ background: availableOnly ? "#111" : "#d1d5db" }}>
                                            <span className="absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200"
                                                style={{ left: availableOnly ? "1.375rem" : "0.25rem" }} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Sort quick pills */}
                    {!showFilters && (
                        <div className="flex gap-2">
                            {SORT_OPTIONS.map(o => (
                                <button key={o.value} onClick={() => setSortBy(o.value)}
                                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all"
                                    style={sortBy === o.value
                                        ? { background: "#111", color: "#fff" }
                                        : { background: "#fff", color: "#555", border: "1px solid rgba(0,0,0,0.08)" }}>
                                    {o.icon}{o.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Specialty chips */}
                    <div className="flex gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: "none" }}>
                        {SPECIALTY_CHIPS.map(s => (
                            <button key={s} onClick={() => setSpecialty(s)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap flex-shrink-0 transition-all"
                                style={specialty === s
                                    ? { background: "linear-gradient(135deg,#0ea5e9,#6366f1)", color: "#fff" }
                                    : { background: "#fff", color: "#6b7280", border: "1px solid rgba(0,0,0,0.08)" }}>
                                {s !== "All" && SPECIALTY_ICONS[s]}
                                {s}
                            </button>
                        ))}
                    </div>

                    {/* Results count row */}
                    <div className="flex items-center justify-between px-0.5">
                        <p className="text-xs font-medium" style={{ color: "#9ca3af" }}>
                            {loading ? "Searching…" : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`}
                        </p>
                        <p className="text-xs font-semibold" style={{ color: liveData ? "#2563eb" : "#9ca3af" }}>
                            {liveData ? (cacheHit ? "● Cached" : "● Live · SerpApi") : "● Sample"}
                        </p>
                    </div>

                    {/* Loading skeletons */}
                    {loading && (
                        <div className="flex flex-col gap-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="rounded-2xl overflow-hidden"
                                    style={{ height: 116, background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
                                    <div className="h-full w-full"
                                        style={{
                                            background: "linear-gradient(90deg,#f5f5f4 25%,#ebebea 50%,#f5f5f4 75%)",
                                            backgroundSize: "300% 100%",
                                            animation: "shimmer 1.6s infinite",
                                        }} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Doctor cards */}
                    {!loading && (
                        <div className="flex flex-col gap-3">
                            <AnimatePresence mode="popLayout">
                                {filtered.length === 0 ? (
                                    <motion.div key="empty"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="flex flex-col items-center justify-center rounded-2xl py-16 px-6"
                                        style={{ background: "#fff", border: "1px solid rgba(0,0,0,0.06)" }}>
                                        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                                            style={{ background: "#f9fafb" }}>
                                            <Search className="w-6 h-6 text-neutral-300" />
                                        </div>
                                        <p className="font-semibold text-neutral-700">No results</p>
                                        <p className="text-sm text-neutral-400 mt-1 text-center">
                                            Try a different search or specialty filter
                                        </p>
                                    </motion.div>
                                ) : (
                                    filtered.map((doc, i) => {
                                        const sel = selected?.id === doc.id;
                                        const isClosest = i === 0 && sortBy === "distance";
                                        return (
                                            <motion.div
                                                key={doc.id}
                                                layout
                                                ref={el => { cardRefs.current[doc.id] = el; }}
                                                initial={{ opacity: 0, y: 14 }}
                                                animate={{ opacity: 1, y: 0, transition: { duration: 0.28, delay: Math.min(i * 0.035, 0.28) } }}
                                                exit={{ opacity: 0, scale: 0.97 }}
                                                onClick={() => setSelected(sel ? null : doc)}
                                                className="cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                                                style={{
                                                    borderRadius: "20px",
                                                    background: sel ? "linear-gradient(145deg,#0f172a,#1a2744)" : "#fff",
                                                    border: sel ? "1px solid rgba(99,102,241,0.35)" : "1px solid rgba(0,0,0,0.07)",
                                                    boxShadow: sel ? "0 8px 32px rgba(0,0,0,0.22)" : "0 2px 8px rgba(0,0,0,0.04)",
                                                }}>
                                                <div className="p-4">
                                                    <div className="flex items-center gap-3.5">

                                                        {/* Avatar with availability dot */}
                                                        <div className="relative flex-shrink-0">
                                                            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-sm"
                                                                style={{ background: doc.avatarBg, boxShadow: "0 3px 10px rgba(0,0,0,0.18)" }}>
                                                                {doc.avatar}
                                                            </div>
                                                            {doc.available && (
                                                                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                                                                    style={{ background: "#22c55e" }} />
                                                            )}
                                                        </div>

                                                        {/* Main info */}
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-1.5 flex-wrap mb-0.5">
                                                                <h3 className="font-bold text-sm tracking-tight truncate"
                                                                    style={{ color: sel ? "#fff" : "#111" }}>
                                                                    {doc.name}
                                                                </h3>
                                                                {doc.verified && (
                                                                    <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0"
                                                                        style={{ color: sel ? "#86efac" : "#22c55e" }} />
                                                                )}
                                                                {isClosest && (
                                                                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                                                        style={sel
                                                                            ? { background: "rgba(251,191,36,0.15)", color: "#fbbf24" }
                                                                            : { background: "#fef3c7", color: "#92400e" }}>
                                                                        Closest
                                                                    </span>
                                                                )}
                                                            </div>

                                                            <p className="text-[11px] truncate mb-1.5"
                                                                style={{ color: sel ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>
                                                                {doc.hospital}
                                                                {doc.address && doc.address !== "Local Area" && doc.address !== "Nearby"
                                                                    ? ` · ${doc.address}` : ""}
                                                            </p>

                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-md"
                                                                    style={sel
                                                                        ? { background: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.55)" }
                                                                        : { background: doc.tagBg, color: "#374151" }}>
                                                                    {SPECIALTY_ICONS[doc.specialty]}
                                                                    {doc.specialty}
                                                                </span>
                                                                {doc.experience && doc.experience !== "N/A" && (
                                                                    <span className="text-[10px]"
                                                                        style={{ color: sel ? "rgba(255,255,255,0.25)" : "#9ca3af" }}>
                                                                        {doc.experience}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Right column */}
                                                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                                                            <div className="flex items-center gap-1">
                                                                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                                                                <span className="text-sm font-bold"
                                                                    style={{ color: sel ? "#fff" : "#111" }}>
                                                                    {doc.rating}
                                                                </span>
                                                            </div>
                                                            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                                                                style={doc.available
                                                                    ? (sel ? { background: "rgba(34,197,94,0.14)", color: "#4ade80" } : { background: "#f0fdf4", color: "#15803d" })
                                                                    : (sel ? { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" } : { background: "#f9fafb", color: "#9ca3af" })}>
                                                                {doc.available ? "Open" : "Closed"}
                                                            </span>
                                                            <p className="text-[11px] font-medium"
                                                                style={{ color: sel ? "rgba(255,255,255,0.3)" : "#9ca3af" }}>
                                                                {doc.distance}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex items-center gap-2 mt-3.5 pt-3.5 text-xs border-t"
                                                        style={{ borderColor: sel ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)" }}>
                                                        <Calendar className="w-3.5 h-3.5 flex-shrink-0"
                                                            style={{ color: sel ? "rgba(255,255,255,0.25)" : "#9ca3af" }} />
                                                        <span style={{ color: sel ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>Next:</span>
                                                        <span className="font-semibold"
                                                            style={{ color: sel ? "rgba(255,255,255,0.85)" : "#111" }}>
                                                            {doc.nextSlot}
                                                        </span>
                                                        <span className="ml-auto font-bold"
                                                            style={{ color: sel ? "rgba(56,189,248,0.7)" : "#0ea5e9" }}>
                                                            {doc.fee}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ml-1"
                                                            style={sel
                                                                ? { background: "rgba(255,255,255,0.1)", color: "#fff" }
                                                                : { background: "#111", color: "#fff" }}>
                                                            View <ChevronRight className="w-3 h-3" />
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                )}
                            </AnimatePresence>

                            {/* OSM attribution (required by ODbL license) */}
                            {liveData && (
                                <p className="text-center text-[10px] py-2" style={{ color: "#9ca3af" }}>
                                    Data ©{" "}
                                    <a href="https://www.openstreetmap.org/copyright" target="_blank"
                                        rel="noopener noreferrer" className="underline hover:text-neutral-600">
                                        OpenStreetMap
                                    </a>{" "}
                                    contributors · ODbL
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    0%   { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
}

// ── Small helpers ─────────────────────────────────────────────────────────────

function StatusPill({ children, color }: { children: React.ReactNode; color: "green" | "amber" | "gray" }) {
    const styles = {
        green: { background: "#f0fdf4", color: "#166534", border: "1px solid #bbf7d0" },
        amber: { background: "#fffbeb", color: "#92400e", border: "1px solid #fde68a" },
        gray: { background: "#f9fafb", color: "#6b7280", border: "1px solid #e5e7eb" },
    };
    return (
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold"
            style={styles[color]}>
            {children}
        </span>
    );
}

function DInfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
    return (
        <div className="flex items-start gap-2.5">
            <span className="mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.28)" }}>{icon}</span>
            <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.52)" }}>{text}</p>
        </div>
    );
}