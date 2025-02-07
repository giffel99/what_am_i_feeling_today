export type priceOptions = "Billigast" | "Billigare" | "Dyrare" | "Dyrast";

export interface IRestaurantRequest {
    radius: string,
    latitude: string,
    longitude: string,
    type: string,
}
export interface IFilterParameters {
    radius: number, // 1000 meter
    address: string, // Kemivägen... 
    priceRange: priceOptions
}