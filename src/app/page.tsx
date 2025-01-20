import Link from "next/link";

export default function Home() {
    return(
        <div className="min-h-screen">
            <div className="h-full flex items-center flex-col justify-center gap-5">
                <div className="relative">
                    <span className="absolute -right-5 -top-7 text-5xl">😉</span>
                    <h1 className="text-center font-bold text-4xl z-10">
                        <span className="text-gray-700 font"><h1>Welcome to</h1></span>
                        <span className="text-blue-600">Budget Buddy</span>
                    </h1>
                </div>
                <p className="text-gray-500 font-semibold">A friendly tool for managing your budget</p>
                <Link
                    href="/login"
                    className="h-12 rounded-md px-10 text-md bg-blue-600 text-white shadow hover:bg-blue-600/90 inline-flex items-center justify-center font-medium "
                >Get started</Link>
            </div>
        </div>
    )
}