import { NextRequest, NextResponse } from "next/server";

// ── Simple in-memory cache (2-minute TTL) ─────────────────────────────────────
const cache = new Map<string, { data: any; ts: number }>();
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes

const SERPAPI_ENDPOINT = "https://serpapi.com/search.json";

// ── Haversine distance in km ──────────────────────────────────────────────────
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Deterministic helpers ────────────────────────────────────────────────────
const GRADIENTS = [
    "linear-gradient(135deg,#c4b5fd 0%,#6366f1 100%)",
    "linear-gradient(135deg,#fca5a5 0%,#dc2626 100%)",
    "linear-gradient(135deg,#fdba74 0%,#ea580c 100%)",
    "linear-gradient(135deg,#6ee7b7 0%,#059669 100%)",
    "linear-gradient(135deg,#d8b4fe 0%,#9333ea 100%)",
    "linear-gradient(135deg,#67e8f9 0%,#0ea5e9 100%)",
    "linear-gradient(135deg,#fde68a 0%,#d97706 100%)",
    "linear-gradient(135deg,#a5f3fc 0%,#0891b2 100%)",
];
const TAG_BGS = ["#ede9fe", "#fee2e2", "#ffedd5", "#dcfce7", "#f3e8ff", "#e0f2fe", "#fef3c7", "#cffafe"];
const RATINGS = [4.2, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0];

function seededPick<T>(arr: T[], seed: number): T {
    return arr[Math.abs(seed) % arr.length];
}

function getSpecialty(title: string, types: string[] = []): string {
    const haystack = `${title} ${types.join(" ")}`.toLowerCase();

    if (haystack.includes("cardio")) return "Cardiology";
    if (haystack.includes("dermat")) return "Dermatology";
    if (haystack.includes("neuro")) return "Neurology";
    if (haystack.includes("ortho")) return "Orthopedics";
    if (haystack.includes("pedia") || haystack.includes("child")) return "Pediatrics";
    if (haystack.includes("gyne") || haystack.includes("women")) return "Gynecology";
    if (haystack.includes("eye") || haystack.includes("ophthalm")) return "Ophthalmology";
    if (haystack.includes("dent")) return "Dentistry";
    if (haystack.includes("hospital")) return "Multi-Speciality Hospital";
    if (haystack.includes("clinic")) return "General Practice";

    return "General Practice";
}

function getAvatarInitials(name: string): string {
    const words = name.trim().split(/\s+/);
    if (words.length >= 2) return (words[0][0] + words[words.length - 1][0]).toUpperCase();
    return name.slice(0, 2).toUpperCase();
}

function buildMapsUrl(lat: number, lng: number, query: string): string {
    const ll = `@${lat},${lng},14z`;
    const params = new URLSearchParams({
        engine: "google_maps",
        type: "search",
        q: query,
        ll,
        google_domain: "google.com",
        hl: "en",
    });

    const apiKey = process.env.SERPAPI_API_KEY ?? process.env.SERPAPI_KEY;
    if (!apiKey) {
        throw new Error("Missing SERPAPI_API_KEY environment variable");
    }

    params.set("api_key", apiKey);
    return `${SERPAPI_ENDPOINT}?${params.toString()}`;
}

// ── Main ──────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get("lat") ?? "");
    const lng = parseFloat(searchParams.get("lng") ?? "");
    const radius = parseInt(searchParams.get("radius") ?? "5000");

    if (isNaN(lat) || isNaN(lng)) {
        return NextResponse.json({ error: "lat and lng are required" }, { status: 400 });
    }

    // ── Check cache ───────────────────────────────────────────────────────────
    const cacheKey = `${lat.toFixed(3)},${lng.toFixed(3)},${radius}`;
    const cached = cache.get(cacheKey);
    if (cached && Date.now() - cached.ts < CACHE_TTL) {
        return NextResponse.json(cached.data, {
            headers: { "X-Cache": "HIT" },
        });
    }

    try {
        const res = await fetch(buildMapsUrl(lat, lng, "doctor"), {
            signal: AbortSignal.timeout(20_000),
        });

        if (!res.ok) throw new Error(`SerpApi responded with ${res.status}`);

        const data = await res.json();
        const localResults: any[] = Array.isArray(data.local_results) ? data.local_results : [];

        const doctors = localResults
            .filter((place) => place?.title && place?.gps_coordinates?.latitude != null && place?.gps_coordinates?.longitude != null)
            .slice(0, 20)
            .map((place, index) => {
                const placeLat = Number(place.gps_coordinates.latitude);
                const placeLng = Number(place.gps_coordinates.longitude);
                const distKm = Math.round(haversine(lat, lng, placeLat, placeLng) * 10) / 10;
                const seed = place.data_cid ?? place.place_id ?? place.data_id ?? index + 1;
                const typeList: string[] = Array.isArray(place.types) ? place.types : [];
                const title = place.title ?? "Nearby Medical Centre";
                const openState = typeof place.open_state === "string" ? place.open_state : place.hours;
                const rating = typeof place.rating === "number" ? place.rating : seededPick(RATINGS, index + 3);
                const reviews = typeof place.reviews === "number" ? place.reviews : ((String(seed).length * 37) % 200) + 10;

                return {
                    id: place.place_id ?? place.data_id ?? seed,
                    name: title,
                    specialty: getSpecialty(title, typeList),
                    rating,
                    reviews,
                    distance: `${distKm} km`,
                    distanceNum: distKm,
                    address: place.address ?? "Nearby area",
                    hospital: title,
                    available: typeof openState === "string" ? openState.toLowerCase().includes("open") : true,
                    nextSlot: typeof openState === "string" && openState.toLowerCase().includes("open")
                        ? "Open now"
                        : place.hours ?? "Check hours",
                    experience: "N/A",
                    fee: "Call for pricing",
                    avatar: getAvatarInitials(title),
                    avatarBg: seededPick(GRADIENTS, index),
                    tagBg: seededPick(TAG_BGS, index),
                    verified: true,
                    languages: ["English"],
                    phone: place.phone,
                    website: place.website,
                    openingHours: place.hours ?? openState,
                    lat: placeLat,
                    lng: placeLng,
                };
            })
            .sort((a, b) => a.distanceNum - b.distanceNum);

        const result = { doctors, total: doctors.length, source: "serpapi-google-maps" };

        // ── Store in cache ────────────────────────────────────────────────────
        cache.set(cacheKey, { data: result, ts: Date.now() });

        return NextResponse.json(result);
    } catch (err: any) {
        console.error("SerpApi Google Maps error:", err?.message ?? err);
        return NextResponse.json(
            { error: "Failed to fetch nearby doctors from SerpApi Google Maps", details: err?.message },
            { status: 500 }
        );
    }
}