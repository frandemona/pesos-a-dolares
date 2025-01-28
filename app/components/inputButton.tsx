'use client'

import { useQueryStates } from "nuqs"
import { ratesSearchParams } from "../searchParams"

export default function InputButton() {
    const [{ amount, conversionType }, setRateParams] = useQueryStates(ratesSearchParams)

    return (
        <input
            type="number"
            value={amount}
            onChange={(e) => setRateParams({ amount: e.target.value })}
            placeholder={conversionType === 'ARS_TO_X' ? 'Amount in ARS' : 'Amount in USD'}
            className="w-full p-2 border rounded mb-4 bg-slate-200 dark:bg-slate-800"
        />
    )
}