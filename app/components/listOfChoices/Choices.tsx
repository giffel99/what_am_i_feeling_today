import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import styles from "./Choices.module.css";

interface ChoicesProps {
  restaurants: Array<string>;
  onDeleteClick: (index: number) => void;
  onAddItemClick: (name: string) => void;
}

const Choices = ({
  restaurants,
  onDeleteClick,
  onAddItemClick,
}: ChoicesProps) => {
  const [newItem, setNewItem] = useState<string>("");

  return (
    <div className="card-content list-content text-center">
      <h1 className="text-center">Ställen vi hittade </h1>
      <hr className="my-4 border-2 border-black" />
      <div className={`overflow-y-auto ${styles.restaurantList}`}>
        <table className="table table-zebra w-full">
          {/* head */}
          <tbody>
            {restaurants.map((rest, index) => (
              <tr className={styles.myTr} key={index}>
                <td>{rest}</td>
                <td className="text-right">
                  <button
                    onClick={() => {
                      onDeleteClick(index);
                    }}
                  >
                    <DeleteOutlineIcon className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))}

            <tr className={styles.myTr} key={restaurants.length + 1}>
              <td className="p-0">
                <input
                  key={restaurants.length + 1}
                  className={`p-3.5 w-full ${styles.myInput}`}
                  type="text"
                  placeholder="Lägg in egen address här"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                />
              </td>
              <td className="text-right">
                <button
                  onClick={() => {
                    onAddItemClick(newItem);
                    setNewItem("");
                  }}
                >
                  <AddIcon className="text-blue-600" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Choices;
