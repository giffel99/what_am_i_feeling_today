import { priceOptions } from "@/app/interfaces";
import { NextRequest, NextResponse } from "next/server";

const googleURL = "https://maps.googleapis.com/maps/api";

const priceMap: Record<priceOptions, number> = {
  Billigast: 0,
  Billigare: 1,
  Dyrare: 2,
  Dyrast: 3,
};

interface ResponseData {
  restaurants?: Array<string>;
  error?: string;
}

const headers = {
  "Access-Control-Allow-Origin": "*", // Change '*' to your frontend domain for production
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET(req: NextRequest) {
  // Add CORS headers
  if (req.method === "OPTIONS") {
    return new NextResponse(null, { status: 200, headers });
  }

  const address = req.nextUrl?.searchParams?.get("address");
  const radius = req.nextUrl?.searchParams?.get("radius");
  const minPriceString = req.nextUrl?.searchParams?.get(
    "minPrice"
  ) as priceOptions;
  const maxPriceString = req.nextUrl?.searchParams?.get(
    "maxPrice"
  ) as priceOptions;

  if (!address || !radius || !minPriceString || !maxPriceString) {
    return new NextResponse(
      JSON.stringify({ error: "address or radius not provided" }),
      { status: 404, headers }
    );
  }

  const minPriceNumber = priceMap[minPriceString];
  const maxPriceNumber = priceMap[maxPriceString];
  const apiKey = process.env.GOOGLE_API_KEY;

  try {
    // Get coordinates
    const geoResponse = await fetch(
      `${googleURL}/geocode/json?address=${address}&key=${apiKey}&result_type=street_address`
    );
    let geoData = await geoResponse.json();
    if (!geoData.results?.length) {
      return new NextResponse(
        JSON.stringify({ error: "Unable to get lat/lng from address" }),
        { status: 404, headers }
      );
    }

    let latitude = geoData.results[0].geometry.location.lat;
    let longitude = geoData.results[0].geometry.location.lng;

    // Fetch restaurants
    const response = await fetch(
      `${googleURL}/place/nearbysearch/json?keyword=restaurant&location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKey}&minprice=${minPriceNumber}&maxprice=${maxPriceNumber}`
    );
    let restaurantsData = await response.json();

    const restaurantNames = restaurantsData.results.map(
      (restaurant: { name: any }) => restaurant.name
    );

    return new NextResponse(JSON.stringify(restaurantNames), {
      status: 200,
      headers,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
      headers,
    });
  }
}
