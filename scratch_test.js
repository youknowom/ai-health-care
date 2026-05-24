const dotenv = require('dotenv');
dotenv.config();

const SERPAPI_ENDPOINT = "https://serpapi.com/search.json";

function buildMapsUrl(lat, lng, query) {
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

async function test() {
    const url = buildMapsUrl(40.7455096, -74.0083012, "doctor");
    console.log("URL:", url.replace(/api_key=.*$/, "api_key=***"));
    const res = await fetch(url);
    const data = await res.json();
    console.log("Local results length:", data.local_results?.length);
    if (data.local_results?.length > 0) {
        console.log("First result title:", data.local_results[0].title);
    } else {
        console.log("Full response:", data);
    }
}

test().catch(console.error);
