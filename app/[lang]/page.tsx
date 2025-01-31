import ConversionTypeButtons from '../components/conversionTypeButtons'
import InputButton from '../components/inputButton'
import Rate from '../components/rate'
import { ExchangeRate, locales, Locales } from '../models'
import ConvertedAmount from '../components/convertedAmount'
import { Suspense } from 'react'
import LoadingConversionTypeButtons from '../components/loading/conversionType'
import LoadingRate from '../components/loading/rate'
import LoadingInputButton from '../components/loading/inputButton'
import { getDictionary } from '../dictionaries'
import Link from 'next/link'
import { flags } from '../flags'

export const revalidate = 300

const fetchRates = async () => {
    try {
        console.log("Fetching dolar price")
        const response = await fetch('https://api.bluelytics.com.ar/v2/latest', { cache: 'force-cache', next: { tags: ["rates"], revalidate: 300 } });
        const data = await response.json();

        const formattedRates: ExchangeRate[] = [
            {
                type: "dolar_oficial",
                buy: data.oficial.value_buy,
                sell: data.oficial.value_sell
            },
            {
                type: 'dolar_blue',
                buy: data.blue.value_buy,
                sell: data.blue.value_sell
            },
            {
                type: 'euro_oficial',
                buy: data.oficial_euro.value_buy,
                sell: data.oficial_euro.value_sell
            },
            {
                type: 'euro_blue',
                buy: data.blue_euro.value_buy,
                sell: data.blue_euro.value_sell
            }
        ];

        const rates: ExchangeRate[] = formattedRates;
        return rates;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        // Consider adding error state handling here
        return [];
    }
};

export default async function Home({
    params,
}: {
    params: Promise<{ lang: Locales }>
}) {
    const rates = await fetchRates();
    const lang = (await params).lang;
    const dict = await getDictionary(lang as "en" | "es")

    return (
        <div className="relative min-h-screen p-8">
            <nav className='absolute right-4 top-2 text-3xl'>
                <span className='hidden'>Change Language</span>
                <ul>
                    {locales.map(local => (
                        <li key={local}>
                            {local === lang ? <></> : <Link rel="alternate" href={`/${local}`} hrefLang={local} lang={local}>{flags[local]}</Link>}
                        </li>
                    ))}
                </ul>
            </nav>

            <h1 className="text-4xl font-bold text-center mb-8">{dict.index.argentine_pesos} {dict.index.to} <span aria-label='💵' className='text-green-500'>{dict.index.dollars}</span>/<span aria-label='💶' className='text-blue-500'>{dict.index.euros}</span></h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Suspense fallback={[true, false, false, false].map((v, i) => <LoadingRate key={i} selectedRate={v} />)}>
                    {rates.map((rate) => (
                        <Rate key={rate.type} rate={rate} name={dict.index[rate.type]} dict={dict} />
                    ))}
                </Suspense>
            </div>

            <div className="dark:bg-slate-900 bg-slate-100 p-6 rounded-lg shadow-md max-w-md mx-auto">
                <div className="flex gap-4 mb-4">
                    <Suspense fallback={<LoadingConversionTypeButtons />}>
                        <ConversionTypeButtons />
                    </Suspense>
                </div>

                <Suspense fallback={<LoadingInputButton />}>
                    <InputButton dict={dict} />
                </Suspense>

                <Suspense fallback={null}>
                    <ConvertedAmount rates={rates} lang={lang} />
                </Suspense>
            </div>
        </div>
    );
}