export default function Page() {
    return (
        <main>
            <div className="h-[100vh] flex flex-col justify-center items-center ">
                <h2 className="font-bold text-sm md:text-xl">
                    This is the Admin Home Page.
                </h2>
                <p className="font-bold text-sm md:text-xl py-4">
                    Stay tuned for updates!
                </p>
                <p className="text-gray-500 font-semibold text-sm">For quotes click on "New Quote" or "Quotes"</p>
            </div>
        </main>
    );
};