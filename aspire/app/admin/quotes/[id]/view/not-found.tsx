import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
    return (
        <main>
            <div className="mt-4 flex h-full flex-col items-center justify-center gap-2">
                <FaceFrownIcon className="w-10 text-gray-400" />
                <h2 className="text-xl font-semibold">404 Not Found</h2>
                <p>Could not find the requested quote.</p>
                <Link
                    href="/admin/quotes/"
                    className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
                >
                    Go Back
                </Link>
            </div>
        </main>
    );
}