export default function LoadingInputButton() {
    return (
        <input
            type="number"
            defaultValue=""
            placeholder={'Amount in ARS'}
            className="w-full p-2 border rounded mb-4 bg-slate-200 dark:bg-slate-800"
        />
    )
}