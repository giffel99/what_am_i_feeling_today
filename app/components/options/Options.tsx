import { IFilterParameters, priceOptions } from '@/app/interfaces'
import React, { useState } from 'react'

interface OptionsProps {
    sendInputData: (params: IFilterParameters) => void,

}

const Options = ({ sendInputData }: OptionsProps) => {


    const priceOptions = ['Billigast', "Billigare", "Dyrare", "Dyrast"];
    const [filterParameters, setFilterParameters] = useState<IFilterParameters>({
        radius: 1000,
        address: "",
        minPrice: "Billigast",
        maxPrice: "Billigare"
    })
    return (
        <div >
            <div className='text-left  h-64 '>
                <p>Var är din utgångspunkt?</p>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Fyll i address här" onChange={(e) => setFilterParameters((previous) => ({ ...previous, address: e.target.value }))} />
                    <p>🏘</p>
                </label>
                <p>Hur brett ska vi söka? </p>
                <div className="flex items-center">
                    <label className="input input-bordered flex items-center w-24">
                        <input className="w-12" type="text" placeholder="1000" onChange={(e) => setFilterParameters((previous) => ({ ...previous, radius: Number(e.target.value) }))} />
                        <p>🚙</p>
                    </label>
                    <p className="ml-2 text-right">(meter)</p>
                </div>
                <p>Hur billigt får det vara?</p>
                <div className="grid grid-cols-2  ">
                    <select className="select select-bordered  max-w-xs" onChange={(e) => setFilterParameters((previous) => ({ ...previous, minPrice: e.target.value as priceOptions }))} >
                        <option disabled value="DEFAULT">Välj prisklass</option>
                        {priceOptions.map((option, index) => { return <option key={index}>{option}</option> })}
                    </select>

                    <select className="select select-bordered  max-w-xs" onChange={(e) => setFilterParameters((previous) => ({ ...previous, maxPrice: e.target.value as priceOptions }))} >
                        <option disabled value="DEFAULT">Välj prisklass</option>
                        {priceOptions.map((option, index) => { return <option key={index}>{option}</option> })}
                    </select>
                </div>
            </div><div className="flex flex-col items-center my-8  ">
                <button className=" bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded " onClick={() => sendInputData(filterParameters)}>
                    Hämta Data
                </button>
            </div >


        </div>

    )
}

export default Options
