
import { createSearchParamsCache, parseAsString, parseAsStringLiteral } from 'nuqs/server'

const acceptedConversionTypes = ['ARS_TO_X', 'X_TO_ARS'] as const
export const acceptedRates = ['dolar_oficial', 'dolar_blue', 'euro_oficial', 'euro_blue'] as const

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const ratesSearchParams = {
    amount: parseAsString.withDefault(''),
    conversionType: parseAsStringLiteral(acceptedConversionTypes).withDefault('ARS_TO_X'),
    selectedRate: parseAsStringLiteral(acceptedRates).withDefault('dolar_oficial')
}

export const searchParamsCache = createSearchParamsCache(ratesSearchParams)