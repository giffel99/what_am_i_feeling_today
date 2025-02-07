import { priceOptions } from '@/app/interfaces';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest, NextResponse } from 'next/server';

const googleURL = "https://maps.googleapis.com/maps/api";

const priceMap: Record<priceOptions, number> = {
    Billigast: 0,
    Billigare: 1,
    Dyrare: 2,
    Dyrast: 3,
};

interface ResponseData {
    restaurants?: Array<string>
    error?: string
}

// /api/restaurants/:address/:radius
export async function GET(req: NextRequest) {

    const address = req.nextUrl?.searchParams?.get('address')
    const radius = req.nextUrl?.searchParams?.get('radius')
    const minPriceString = req.nextUrl?.searchParams?.get('minPrice') as priceOptions;
    const maxPriceString = req.nextUrl?.searchParams?.get('maxPrice') as priceOptions;
    if (!address || !radius || !minPriceString || !maxPriceString) {
        return NextResponse.json({ error: "address or radius not provided" }, { status: 404 });
    }

    // Convert the strings to number for google API
    const minPriceNumber = priceMap[minPriceString];
    const maxPriceNumber = priceMap[maxPriceString];

    const apiKey = process.env.GOOGLE_API_KEY;
    // Optionally validate the parameters (for safety and type-checking)
    // Get the coords of the address
    // https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=YOUR_API_KEY
    const geoResponse = await fetch(`${googleURL}/geocode/json?address=${address}&key=${apiKey}&result_type=street_address`)
    let geoData = await geoResponse.json();
    let latitude = geoData.results[0].geometry.location.lat;
    let longitude = geoData.results[0].geometry.location.lng;
    if (!latitude || !longitude) {
        return NextResponse.json({ error: "Unable to get the lats and long from address" }, { status: 404 });
    }
    // Mamma, Pappa, Emma, Josse, lukas, Sven, Lovisa 
    const response = await fetch(
        `${googleURL}/place/nearbysearch/json?keyword=restaurant&location=${latitude}%2C${longitude}&radius=${radius}&type=restaurant&key=${apiKey}&minprice=${minPriceNumber}&maxprice=${maxPriceNumber}`
    );
    let restaurantsData = await response.json()

    const restaurantNames = restaurantsData.results.map((restaurant: { name: any; }) => {
        return restaurant.name;
    })
    return NextResponse.json(restaurantNames);

}
