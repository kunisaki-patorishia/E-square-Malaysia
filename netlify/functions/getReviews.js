// ✅ Netlify Function: getReviews.js
export async function handler(event, context) {
  const placeId = "ChIJYR1qatVs2jERI1P3bOyQa4Q"; // your business Place ID
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // set in Netlify environment variables

  if (!apiKey) {
    console.error("❌ Missing Google Maps API key.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Google Maps API key is missing" }),
    };
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}`;

  try {
    // Native fetch works in Node 18+ on Netlify
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== "OK") {
      return {
        statusCode: 500,
        body: JSON.stringify({
          status: data.status,
          error: data.error_message || "Google API error",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: data.status,
        name: data.result?.name || "",
        rating: data.result?.rating || 0,
        totalReviews: data.result?.user_ratings_total || 0,
        reviews: data.result?.reviews || [],
      }),
    };
  } catch (error) {
    console.error("❌ Error fetching reviews:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
