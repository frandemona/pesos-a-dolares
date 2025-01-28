"use client"

import { useQueryStates } from "nuqs"
import { ExchangeRate } from "../models"
import { ratesSearchParams } from "../searchParams"

export default function Rate({ rate }: { rate: ExchangeRate }) {
    const [{ selectedRate }, setRateParams] = useQueryStates(ratesSearchParams)

    return (<div
        className={`p-6 rounded-lg shadow-md ${selectedRate === rate.type ? ('dolar_oficial' === rate.type || 'dolar_blue' === rate.type ? 'bg-green-800' : 'bg-blue-800') : 'bg-slate-900'
            } cursor-pointer`}
        onClick={() => setRateParams({ selectedRate: rate.type })}
    >
        <h2 className="text-xl font-semibold mb-2">{rate.name}</h2>
        <div className="flex justify-between">
            <p>Compra: ${rate.buy.toFixed(2)}</p>
            <p>Venta: ${rate.sell.toFixed(2)}</p>
        </div>
    </div>)
}