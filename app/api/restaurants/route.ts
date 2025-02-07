import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const googleURL = "https://maps.googleapis.com/maps/api";

interface ResponseData {
    restaurants?: Array<string>
    error?: string
}

// /api/restaurants/:address/:radius
export async function GET(req: NextRequest) {


    const address = req.nextUrl?.searchParams?.get('address')
    const radius = req.nextUrl?.searchParams?.get('radius')
    if (!address || !radius) {
        return NextResponse.json({ error: "address or radius not provided" }, { status: 404 });

    }

    const apiKey = process.env.GOOGLE_API_KEY;
    console.log(address, radius);
    // Optionally validate the parameters (for safety and type-checking)
    console.log(apiKey)
    // Get the coords of the address
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    const geoResponse = await fetch(`${googleURL}/geocode/json?address=${address}&key=${apiKey}&result_type=street_address`)
    let geoData = await geoResponse.json();
    console.log(geoData)
    let latitude = geoData.results[0].geometry.location.lat;
    let longitude = geoData.results[0].geometry.location.lng;
    if (!latitude || !longitude) {
        return NextResponse.json({ error: "Unable to get the lats and long from address" }, { status: 404 });
    }


    const response = await fetch(
        `${googleURL}/place/nearbysearch/json?keyword=restaurant&location=${latitude}%2C${longitude}&radius=${radius}&type=restaurant&key=${apiKey}`
    );
    let restaurantsData = await response.json()

    const restaurantNames = restaurantsData.results.map((restaurant: { name: any; }) => {
        return restaurant.name;
    })
    console.log(restaurantNames)
    return NextResponse.json(restaurantNames);

}
