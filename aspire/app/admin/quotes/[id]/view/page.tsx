import { fetchQuoteById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";

export default async function Page(props: { params: Promise<{id: string}> }) {
    const params = await props.params;
    const id = params.id;
    const quoteResult = await fetchQuoteById(id);

    const quote = quoteResult[0];

    if (!quote) {
        notFound();
    }
    
    return (
        <main className="text-center">
            <h2 className="mt-4 text-2xl font-bold">Quote Details</h2>
            <div className="bg-gray-100 rounded-lg p-6 w-[90vw] mx-auto my-4 space-y-4">
                <div className="bg-white p-4 rounded-lg text-start space-y-4">
                    <p className="text-md font-semibold">Personal Details</p>
                    <ul className="px-4 space-y-2 md:space-y-0">
                        <li>
                            <div className="md:flex md:flex-row md:flex-start">
                                <p>Name:</p>
                                <p className="font-semibold md:ml-2">{quote.name}</p>
                            </div>
                        </li>

                        {(quote.email) ? (
                            <li>
                                <div className="md:flex md:flex-row md:flex-start">
                                    <p>Email:</p>
                                    <p className="font-semibold md:ml-2">{quote.email}</p>
                                </div>
                            </li>
                        ) : <></>}

                        {(quote.phone_number) ? (
                            <li>
                                <div className="md:flex md:flex-row md:flex-start">
                                    <p>Phone Number:</p>
                                    <p className="font-semibold md:ml-2">{quote.phone_number}</p>
                                </div>
                            </li>
                        ) : <></>}

                        {(quote.address) ? (
                            <li>
                                <div className="md:flex md:flex-row md:flex-start">
                                    <p>Address:</p>
                                    <p className="font-semibold md:ml-2">{quote.address}</p>
                                </div>
                            </li>
                        ) : <></>}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg text-start">
                    <p className="text-md font-semibold mb-4">Quote Price</p>
                    <p className="px-4 font-bold text-xl">{formatCurrency(quote.quote)}</p>
                    <p className="px-4 text-sm text-gray-500">Quoted on {formatDateToLocal(quote.date.toString())}</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-start space-y-4">
                    <p className="text-md font-semibold">
                        Additional Notes                    
                    </p>
                    {(quote.notes) ? (
                        <p className="px-4">{quote.notes}</p>
                    ) : (
                        <p className="px-4">None</p>       
                    )}
                </div>
                <div className="bg-white p-4 rounded-lg text-start space-y-4">
                    <p className="text-md font-semibold">
                        Type of Service                    
                    </p>
                    <p className="px-4 capitalize">{quote.type_of_service.replace(/([A-Z])/g, ' $1')}</p>
                </div>
                <div className="bg-white p-4 rounded-lg text-start space-y-4">
                    <p className="text-md font-semibold">
                        Pets
                    </p>
                    {(quote.pets) ? 
                    (<p className="px-4">Yes</p>) : <p className="px-4">No</p>}
                </div>
                <div className="bg-white p-4 rounded-lg text-start space-y-4">
                    <p className="text-md font-semibold">
                        Rooms Configuration
                    </p>
                    <ul className="px-4">
                        {quote.bedrooms > 0 && (<li>Bedrooms: {quote.bedrooms}</li>)}
                        {quote.bathrooms > 0 && (<li>Bathrooms: {quote.bathrooms}</li>)}
                        {quote.powder_rooms > 0 && (<li>Powder Rooms: {quote.powder_rooms}</li>)}
                        {quote.living_rooms > 0 && (<li>Living Rooms: {quote.living_rooms}</li>)}
                        {quote.kitchen > 0 && (<li>Kitchen: {quote.kitchen}</li>)}
                        {quote.laundry_rooms > 0 && (<li>Laundry Rooms: {quote.laundry_rooms}</li>)}
                    </ul>
                </div>
                <div className="bg-white p-4 rounded-lg text-start space-y-4">
                    <p className="text-md font-semibold">
                        Additional Rooms                    
                    </p>
                    {(quote.office || quote.gym_room || quote.cinema) ? (
                        <ul className="px-4">
                            {(quote.office) ? (<li>Office: {quote.office}</li>) : (<></>)}
                            {(quote.gym_room) ? (<li>Gym Room: {quote.gym_room}</li>) : (<></>)}
                            {(quote.cinema) ? (<li>Cinema: {quote.cinema}</li>) : (<></>)}
                        </ul>) : (
                        <p className="px-4">None</p>
                    )}
                </div>
                <div className="bg-white p-4 rounded-lg text-start space-y-4">
                    <p className="text-md font-semibold">
                        Additional Services                    
                    </p>
                    {(quote.blinders || quote.oven || quote.fridge) ? (
                        <ul className="px-4">
                            {(quote.blinders) ? (<li>Blinders</li>) : (<></>)}
                            {(quote.oven) ? (<li>Oven</li>) : (<></>)}
                            {(quote.fridge) ? (<li>Fridge</li>) : (<></>)}
                        </ul>) : (
                        <p className="px-4">None</p>
                    )}
                </div>
            </div>
        </main>
    );
};