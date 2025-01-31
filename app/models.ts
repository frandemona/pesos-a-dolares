import { getDictionary } from "./dictionaries";
import { acceptedRates } from "./searchParams";

export const locales = ['en', 'es'] as const


export interface ExchangeRate {
    type: (typeof acceptedRates)[number];
    buy: number;
    sell: number;
}

export type Locales = typeof locales[number]

export type GetDictionary = Awaited<ReturnType<typeof getDictionary>>