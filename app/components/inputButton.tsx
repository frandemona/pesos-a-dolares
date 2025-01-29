'use client'

import { useQueryStates } from "nuqs"
import { ratesSearchParams } from "../searchParams"

export default function InputButton() {
    const [{ amount, selectedRate, conversionType }, setRateParams] = useQueryStates(ratesSearchParams)

    return (
        <>
            <input
                type="number"
                value={amount}
                min="0"
                inputMode="decimal"
                onChange={(e) => setRateParams({ amount: e.target.value })}
                placeholder={conversionType === 'ARS_TO_X' ? 'Amount in ARS' : `Amount in ${(selectedRate === "euro_blue" || selectedRate === "euro_oficial") ? "EUR" : 'USD'}`}
                className="w-full p-2 border rounded mb-4 bg-slate-200 dark:bg-slate-800"
                list="defaultNumbers"
            />

            <datalist id="defaultNumbers">
                <option value="10"></option>
                <option value="100"></option>
                <option value="1000"></option>
                <option value="10000"></option>
                <option value="100000"></option>
            </datalist>
        </>
    )
}