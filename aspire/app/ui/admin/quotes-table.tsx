import { fetchQuotes } from "@/app/lib/data";
import { formatDateToLocal, formatCurrency } from "@/app/lib/utils";
import { DeleteQuote, ViewDetails, UpdateQuote } from "./buttons";

export default async function QuotesTable() {
    const quotes = await fetchQuotes();

    return (
        <div className="max-w-[90vw] m-auto bg-gray-100 p-4 mt-4 rounded-sm">
            <div className="md:hidden">
                {quotes?.map((quote) => (
                <div
                    key={quote.id}
                    className="mb-2 w-full rounded-md bg-white p-4"
                >
                    <div className="border-b pb-4">
                        <div>
                            <div className="mb-2 flex flex-row w-full justify-between flex-wrap items-end">
                                <p>{quote.name}</p>
                                <p className="text-sm text-gray-500">{formatDateToLocal(quote.date.toString())}</p>
                            </div>
                            <div className="mb-2 flex flex-row w-full justify-between flex-wrap">   
                                <p className="text-sm text-gray-500 mb-2">{quote.email}</p>
                                <p className="text-sm text-gray-500">{quote.phone_number}</p>
                            </div>

                        </div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                    <div>
                        <p className="text-xl font-medium">
                        {formatCurrency(quote.quote)}
                        </p>
                    </div>
                    <div className="flex justify-end gap-2">
                        <ViewDetails id={quote.id} />
                        <UpdateQuote id={quote.id} />
                        <DeleteQuote id={quote.id} />
                    </div>
                    </div>
                </div>
                ))}
          </div>
            
            <table className="hidden min-w-full text-gray-900 md:table text-left">
                <thead className="rounded-lg text-sm">
                <tr>
                    <th scope="col" className="px-4 py-5 font-medium">
                        Name
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Email
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Phone Number
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Amount
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                        Date Generated
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                        <span className="sr-only">View Details</span>
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white">
                {quotes?.map((quote) => (
                    <tr
                        key={quote.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                            <p>{quote.name}</p>
                        </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                        {quote.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                        {quote.phone_number}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                        {formatCurrency(quote.quote)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                        {formatDateToLocal(quote.date.toString())}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                            <ViewDetails id={quote.id} />
                            <UpdateQuote id={quote.id} />
                            <DeleteQuote id={quote.id} />
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
          </table>
        </div>
    );
};