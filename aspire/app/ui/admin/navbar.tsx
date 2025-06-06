import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex flex-row justify-center bg-gray-100">
            <div className="flex flex-row justify-center w-[500px] text-xl">
                <Link href={"/admin/quotes/generate"} className="hover:bg-cyan-100 p-4">
                    New Quote
                </Link>
                <Link href={"/admin/quotes/"} className="hover:bg-cyan-100 p-4">
                    Quotes
                </Link>
            </div>
        </nav>
    );
};