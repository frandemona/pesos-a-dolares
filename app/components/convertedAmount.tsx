"use client"

import { useQueryStates } from "nuqs"
import { ratesSearchParams } from "../searchParams"
import { NumericFormat } from "react-number-format"
import { ExchangeRate } from "../models"
import { useMemo } from "react"



export default function ConvertedAmount({ rates }: { rates: ExchangeRate[] }) {
    const [{ amount, conversionType, selectedRate },] = useQueryStates(ratesSearchParams)

    const convertedAmount = useMemo(() => {
        const rate = rates.find(rate => rate.type === selectedRate)
        if (!rate) return "";

        const numberAmount = Number(amount);
        if (isNaN(numberAmount)) return "";

        const absNumberAmount = Math.abs(numberAmount);
        if (conversionType === 'ARS_TO_X') {
            const result = absNumberAmount / rate.sell;
            return result.toFixed(2)
        }
        const result = absNumberAmount * rate.sell;
        return result.toFixed(2)
    }, [amount, conversionType, rates, selectedRate]);

    return (
        <>{convertedAmount && <div className="text-center text-xl font-semibold">
            <span>{<NumericFormat prefix={conversionType !== 'ARS_TO_X' ? 'AR$' : selectedRate === "euro_blue" || selectedRate === "euro_oficial" ? "€" : "U$D"} value={convertedAmount} thousandSeparator="," decimalSeparator="." displayType="text" />}</span>
        </div>}
        </>
    )
}