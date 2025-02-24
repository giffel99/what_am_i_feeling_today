import {
  IFilterParameters,
  priceOptions,
  priceOptions as PriceOptionsType,
} from "@/app/interfaces";
import React, { useState } from "react";

interface OptionsProps {
  sendInputData: (params: IFilterParameters) => void;
}

const Options = ({ sendInputData }: OptionsProps) => {
  const priceOptions = ["Billigast", "Billigare", "Dyrare", "Dyrast"];
  const [filterParameters, setFilterParameters] = useState<IFilterParameters>({
    radius: 1000,
    address: "",
    minPrice: "Billigast" as PriceOptionsType,
    maxPrice: "Billigare" as PriceOptionsType,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1]);

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange((prev) => {
      const newRange = [...prev] as [number, number];
      if (e.target.name === "minPrice") {
        newRange[0] = value;
        setFilterParameters((previous) => ({
          ...previous,
          minPrice: priceOptions[value] as PriceOptionsType,
        }));
      } else {
        newRange[1] = value;
        setFilterParameters((previous) => ({
          ...previous,
          maxPrice: priceOptions[value] as PriceOptionsType,
        }));
      }
      return newRange;
    });
  };

  return (
    <div className="card-content options-content text-center">
      <div>
        <h1 className="text-center">
          Hjälp mig hitta lämpliga restauranger nära dig.
        </h1>
        <hr className="my-4 border-2 border-black" />
        <p>Var är din utgångspunkt?</p>
        <label className="input input-bordered flex items-center mb-4 w-96 mx-auto">
          <input
            type="text"
            className="grow"
            placeholder="Ex. Ringvägen 42, göteborg"
            onChange={(e) =>
              setFilterParameters((previous) => ({
                ...previous,
                address: e.target.value,
              }))
            }
          />
          <p>🏘</p>
        </label>
        <p>Hur brett ska vi söka? (i meter) </p>
        <div className="flex items-center">
          <label className="input input-bordered flex items-center mx-auto mb-4 w-24">
            <input
              className="w-12"
              type="text"
              placeholder="1000"
              onChange={(e) =>
                setFilterParameters((previous) => ({
                  ...previous,
                  radius: Number(e.target.value),
                }))
              }
            />
            <p>🚙</p>
          </label>
        </div>
        <p>Kostnads intervall</p>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4">
            <input
              type="range"
              name="minPrice"
              min="0"
              max="3"
              value={priceRange[0]}
              onChange={handlePriceRangeChange}
              className="slider"
            />
            <input
              type="range"
              name="maxPrice"
              min="0"
              max="3"
              value={priceRange[1]}
              onChange={handlePriceRangeChange}
              className="slider"
            />
          </div>
          <p>
            {priceOptions[priceRange[0]]} - {priceOptions[priceRange[1]]}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center my-8">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => sendInputData(filterParameters)}
        >
          Hämta Data
        </button>
      </div>
    </div>
  );
};

export default Options;
