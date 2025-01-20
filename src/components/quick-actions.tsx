export default function QuickActions() {
    return (
        <div className="block px-4 py-3 rounded-md bg-primary mt-6">
            <div className="flex items-center justify-center gap-6">
                <Action />
                <Action />
                <Action />
            </div>
        </div>
    )
}

const Action = () => {
    return(
        <button className="bg-gray-400 p-2 px-5 rounded-md">
            <h4>Topup</h4>

        </button>
    )
}