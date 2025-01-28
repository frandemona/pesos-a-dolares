"use client"
import { useQueryStates } from "nuqs"
import { ratesSearchParams } from "../searchParams"

export default function ConversionTypeButtons() {
    const [{ conversionType, selectedRate }, setRateParams] = useQueryStates(ratesSearchParams)
    return (
        <>
            <button
                className={`flex-1 p-2 rounded ${conversionType === 'ARS_TO_X' ? 'bg-blue-800 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}
                onClick={() => setRateParams({ conversionType: 'ARS_TO_X' })}
            >
                ARS → {selectedRate && (selectedRate === 'euro_oficial' || selectedRate === 'euro_blue') ? "EUR" : "USD"}
            </button>
            <button
                className={`flex-1 p-2 rounded ${conversionType === 'X_TO_ARS' ? 'bg-blue-800 text-white' : 'bg-slate-200 dark:bg-slate-800'}`}
                onClick={() => setRateParams({ conversionType: 'X_TO_ARS' })}
            >
                {selectedRate && (selectedRate === 'euro_oficial' || selectedRate === 'euro_blue') ? "EUR" : "USD"} → ARS
            </button>
        </>
    )
}