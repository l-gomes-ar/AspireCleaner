import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex flex-row justify-center bg-gray-100">
            <div className="flex flex-row justify-evenly w-[500px] text-xl">
                <Link href={"/admin"} className="hover:bg-cyan-100 p-4">
                    Home
                </Link>
                <Link href={"/admin/quotes/generate"} className="hover:bg-cyan-100 p-4">
                    Generate Quote
                </Link>
                <Link href={"/admin/quotes/view"} className="hover:bg-cyan-100 p-4">
                    View Quotes
                </Link>
            </div>
        </nav>
    );
};