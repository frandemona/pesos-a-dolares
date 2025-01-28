export default function LoadingConversionTypeButtons() {
    return (
        <>
            <button
                className={`flex-1 p-2 rounded bg-blue-800 text-white`}
            >
                ARS → USD
            </button>
            <button
                className={`flex-1 p-2 rounded bg-slate-200 dark:bg-slate-800`}
            >
                USD → ARS
            </button>
        </>)
}