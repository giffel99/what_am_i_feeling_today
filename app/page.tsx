'use client'
import Wheel from './components/wheel/Wheel'
import { useState } from 'react';
import Footer from './components/footer/Footer'
import Options from './components/options/Options'
import { IFilterParameters } from './interfaces'
import Choices from './components/listOfChoices/Choices'

export default function Home() {

  const mockRestaruants = ['pizza', 'pie', 'burger']
  const [restaurants, setRestaurants] = useState<Array<string>>(mockRestaruants);

  const fetchRestaurants = async (filterParams: IFilterParameters) => {
    filterParams.address.trim();
    const result = await getNearbyRestaurants(filterParams);
    setRestaurants(result)
  }

  const removeItemFromRestaurants = (index: number) => {
    setRestaurants((previous) => {
      return previous.filter((_, i) => { return i != index });
    })
  }


  async function getNearbyRestaurants(filterParams: IFilterParameters): Promise<Array<string>> {

    const result = await fetch('http://localhost:3000/api/restaurants?' + new URLSearchParams({
      address: filterParams.address.trim(),
      radius: String(filterParams.radius),
      minPrice: filterParams.minPrice,
      maxPrice: filterParams.maxPrice
    }).toString()).then((response) => {
      if (!response.ok) {
        console.log("I was unable to find data")
        return [];
      }
      else {
        return response.json();
      }
    })
    const data: Array<string> = await result;
    return data;

  }

  return (
    <main className="">
      <div className="p-4  mainContent  ">
        {/* title cards */}
        <h1 className="text-xl">Svårt att bestämma vad du ska äta idag?</h1>
        <h3>Varför inte låta turen bestämma?</h3>
        {/* container for the three cards */}
        <div className="grid grid-cols-3 mt-8 mx-24 gap-20 text-center cardContent  ">
          {/* Options card */}
          <div className="card bg-base-200 shadow-xl cardContent p-4">
            <Options sendInputData={fetchRestaurants} />
          </div>
          {/* Wheel card */}
          <div className="card bg-base-200 shadow-xl cardContent p-4">
            <Wheel restaurants={restaurants} />
          </div>
          {/* List card */}
          <div className="card bg-base-200 shadow-xl cardContent overflow-y-scroll px-4 pt-4">
            <Choices restaurants={restaurants} onDeleteClick={removeItemFromRestaurants} onAddItemClick={(newItemName) => {
              setRestaurants((previous) => [...previous, newItemName]); // Correct array update
            }} />
          </div>
        </div>

      </div>
      {/* Footer */}
      <Footer ></Footer>

    </main >

  )
}
