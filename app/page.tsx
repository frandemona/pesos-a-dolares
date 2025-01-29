import ConversionTypeButtons from './components/conversionTypeButtons'
import InputButton from './components/inputButton'
import Rate from './components/rate'
import { ExchangeRate } from './models'
import ConvertedAmount from './components/convertedAmount'
import { Suspense } from 'react'
import LoadingConversionTypeButtons from './components/loading/conversionType'
import LoadingRate from './components/loading/rate'
import LoadingInputButton from './components/loading/inputButton'

export const revalidate = 300

const fetchRates = async () => {
  try {
    console.log("Fetching dolar price")
    const response = await fetch('https://api.bluelytics.com.ar/v2/latest', { cache: 'force-cache', next: { tags: ["rates"], revalidate: 300 } });
    const data = await response.json();

    const formattedRates: ExchangeRate[] = [
      {
        name: 'Dólar Oficial',
        type: "dolar_oficial",
        buy: data.oficial.value_buy,
        sell: data.oficial.value_sell
      },
      {
        name: 'Dólar Blue',
        type: 'dolar_blue',
        buy: data.blue.value_buy,
        sell: data.blue.value_sell
      },
      {
        name: 'Euro Oficial',
        type: 'euro_oficial',
        buy: data.oficial_euro.value_buy,
        sell: data.oficial_euro.value_sell
      },
      {
        name: 'Euro Blue',
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

export default async function Home() {
  const rates = await fetchRates();

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Peso Argentinos a <span aria-label='💵' className='text-green-500'>Dolares</span>/<span aria-label='💶' className='text-blue-500'>Euros</span></h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Suspense fallback={[true, false, false, false].map((v, i) => <LoadingRate key={i} selectedRate={v} />)}>
          {rates.map((rate) => (
            <Rate key={rate.type} rate={rate} />
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
          <InputButton />
        </Suspense>

        <Suspense fallback={null}>
          <ConvertedAmount rates={rates} />
        </Suspense>
      </div>
    </div>
  );
}