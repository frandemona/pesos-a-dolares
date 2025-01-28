import { acceptedRates } from "./searchParams";


export interface ExchangeRate {
    name: string;
    type: (typeof acceptedRates)[number];
    buy: number;
    sell: number;
}