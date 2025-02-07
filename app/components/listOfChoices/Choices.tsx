import React, { useState } from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import styles from './Choices.module.css'
interface ChoicesProps {
    restaurants: Array<string>;
    onDeleteClick: (index: number) => void;
    onAddItemClick: (name: string) => void;

}

const Choices = ({ restaurants, onDeleteClick, onAddItemClick }: ChoicesProps) => {

    const [newItem, setNewItem] = useState<string>("")

    return (
        <div className=" ">
            <table className="table table-zebra ">
                {/* head */}
                <thead>
                    <tr>
                        <th>Namn</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>

                    {restaurants.map(
                        (rest, index) => {
                            return <tr className={styles.myTr} key={index}>
                                <td>{rest}</td>
                                <td className="text-right"><button onClick={() => { onDeleteClick(index) }}> <DeleteOutlineIcon className="text-red-600" /> </button></td>
                            </tr>
                        })}
                    <tr className="sticky bottom-0 bg-white z-10">
                        <td className="p-0">
                            <input
                                className="p-3.5 w-full"
                                type="text"
                                placeholder="Lägg in egen address här"
                                value={newItem}  // Bind the input to the newItem state
                                onChange={(e) => setNewItem(e.target.value)}  // Update newItem as you type
                            />
                        </td>
                        <td className="text-right">
                            <button
                                onClick={() => {
                                    onAddItemClick(newItem);  // Call the onAddItemClick function with the new item
                                    setNewItem('');  // Reset the newItem state after clicking
                                }}
                            >
                                <AddIcon className="text-blue-600" />
                            </button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div >
    )
}

export default Choices
function UseState<T>(arg0: string): [any, any] {
    throw new Error('Function not implemented.');
}

