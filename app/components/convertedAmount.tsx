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
        if (!rate) return;

        const numberAmount = Number(amount);
        if (isNaN(numberAmount)) return;

        if (conversionType === 'ARS_TO_X') {
            const result = numberAmount / rate.sell;
            return result.toFixed(2)
        }
        const result = numberAmount * rate.sell;
        return result.toFixed(2)
    }, [amount, conversionType, rates, selectedRate]);

    return (
        <>{convertedAmount && <div className="text-center text-xl font-semibold">
            {conversionType === 'ARS_TO_X'
                ? <span>${<NumericFormat value={convertedAmount} allowLeadingZeros thousandSeparator="," displayType="text" />} {selectedRate === "euro_blue" || selectedRate === "euro_oficial" ? "EUR" : "USD"}</span>
                : <span>${<NumericFormat value={convertedAmount} allowLeadingZeros thousandSeparator="," displayType="text" />} ARS</span>}
        </div>}
        </>
    )
}