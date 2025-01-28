export default function LoadingRate({ selectedRate = false }: { selectedRate: boolean }) {
    return (<div
        className={`p-6 rounded-lg shadow-md animate-pulse ${selectedRate ? 'bg-blue-800' : 'bg-slate-900'
            } cursor-pointer`}
    >
        <h2 className="mb-2 h-6 w-48 rounded-md bg-slate-400 animate-pulse"></h2>
        <div className="flex justify-between">
            <p className="flex items-center gap-x-2">Compra: <span className="inline-block w-20 h-4 rounded-md bg-slate-400"></span></p>
            <p className="flex items-center gap-x-2">Venta: <span className="inline-block w-20 h-4 rounded-md bg-slate-400"></span></p>
        </div>
    </div>)
}