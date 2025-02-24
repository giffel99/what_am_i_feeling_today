"use client";
import Wheel from "./components/wheel/Wheel";
import { useState } from "react";
import Footer from "./components/footer/Footer";
import Options from "./components/options/Options";
import { IFilterParameters } from "./interfaces";
import Choices from "./components/listOfChoices/Choices";
import DrawIcon from "@mui/icons-material/Draw";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CasinoIcon from "@mui/icons-material/Casino";
import Navigation from "./components/navigation/Navigation";
export default function Home() {
  const mockRestaruants = ["pizza", "pie", "burger"];
  const [restaurants, setRestaurants] =
    useState<Array<string>>(mockRestaruants);

  const fetchRestaurants = async (filterParams: IFilterParameters) => {
    filterParams.address.trim();
    const result = await getNearbyRestaurants(filterParams);
    setRestaurants(result);
  };

  const removeItemFromRestaurants = (index: number): void => {
    setRestaurants((previous) => {
      return previous.filter((_, i) => {
        return i != index;
      });
    });
  };

  async function getNearbyRestaurants(
    filterParams: IFilterParameters
  ): Promise<Array<string>> {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/restaurants?` +
        new URLSearchParams({
          address: filterParams.address.trim(),
          radius: String(filterParams.radius),
          minPrice: filterParams.minPrice,
          maxPrice: filterParams.maxPrice,
        }).toString()
    ).then((response) => {
      if (!response.ok) {
        console.log("I was unable to find data");
        return [];
      } else {
        return response.json();
      }
    });
    const data: Array<string> = await result;
    return data;
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="mainContent">
      <div id="options-page" className="setup-page">
        <h1 className="text-3xl text-center pt-4">
          Svårt att bestämma vad du ska äta idag?
        </h1>
        <h3 className="text-center text-xl">
          Varför inte låta turen bestämma?
        </h3>
        <Options sendInputData={fetchRestaurants} />

        <Navigation highlightedName="options-page" onClick={scrollToSection} />
      </div>
      <Footer />

      <div id="list-page" className="list-page">
        <h1 className="text-3xl text-center pt-4">
          Svårt att bestämma vad du ska äta idag?
        </h1>
        <h3 className="text-center text-xl">
          Varför inte låta turen bestämma?
        </h3>
        {/* Content */}
        <Choices
          restaurants={restaurants}
          onDeleteClick={removeItemFromRestaurants}
          onAddItemClick={(name: string) => {
            setRestaurants((previous) => {
              return [...previous, name];
            });
          }}
        />
        <Navigation highlightedName="list-page" onClick={scrollToSection} />
      </div>
      <Footer />

      <div id="spin-page" className="spin-page">
        <h1 className="text-3xl text-center pt-4">
          Svårt att bestämma vad du ska äta idag?
        </h1>
        <h3 className="text-center text-xl">
          Varför inte låta turen bestämma?
        </h3>
        {/* Content */}
        <Wheel restaurants={restaurants} />
        <Navigation highlightedName="spin-page" onClick={scrollToSection} />
      </div>
      <Footer />
    </main>
  );
}
