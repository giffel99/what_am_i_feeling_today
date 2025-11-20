"use client";
import React, { useState } from "react";
interface WheelProps {
  restaurants: Array<string>;
}

const Wheel = ({ restaurants }: WheelProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const numberOfSpins = 8;
  const startSpin = async () => {
    const chosenIndex = Math.floor(Math.random() * restaurants.length);
    let spinCountDown = numberOfSpins * restaurants.length + chosenIndex;

    setIsSpinning(true);

    await new Promise<void>((resolve) => {
      const intervalId = setInterval(() => {
        setHighlightedIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % restaurants.length;
          return newIndex;
        });

        if (spinCountDown === 0) {
          clearInterval(intervalId);
          resolve();
        }

        spinCountDown--;
      }, 100);
    });
  };

  return (
    <div className="card-content spin-content text-center">
      <h1 className="text-center">Låt Fru Fortuna bestämma vart ni ska äta!</h1>
      <hr className="my-4 border-2 border-black" />

      <div className="  mx-auto w-72 py-8 text-center ">
        <div className="grid grid-rows-5 h-64  ">
          <div className="row-span-1 bg-green-100 flex place-items-center justify-center">
            <p>
              {
                restaurants[
                  (highlightedIndex - 2 + restaurants.length) %
                    restaurants.length
                ]
              }
            </p>
          </div>
          <div className="row-span-1 bg-green-200 flex place-items-center justify-center">
            <p>
              {
                restaurants[
                  (highlightedIndex - 1 + restaurants.length) %
                    restaurants.length
                ]
              }
            </p>
          </div>

          <div className="row-span-1 bg-green-400 flex place-items-center justify-center">
            <p> {restaurants[highlightedIndex]} </p>
          </div>

          <div className="row-span-1 bg-green-200 flex place-items-center justify-center">
            <p>
              {
                restaurants[
                  (highlightedIndex + 1 + restaurants.length) %
                    restaurants.length
                ]
              }
            </p>
          </div>
          <div className="row-span-1 bg-green-100 flex place-items-center justify-center">
            <p>
              {
                restaurants[
                  (highlightedIndex + 2 + restaurants.length) %
                    restaurants.length
                ]
              }
            </p>
          </div>
        </div>
      </div>
      <div className="m-auto">
        <button
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold  px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-auto w-42 py-2 mx-auto"
          onClick={() => startSpin()}
        >
          Snurra hjulet!
        </button>
        <p>Inte nöjd? Snurra igen!!</p>
      </div>
    </div>
  );
};
export default Wheel;
