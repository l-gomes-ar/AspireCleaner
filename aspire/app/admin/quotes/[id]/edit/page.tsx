import { fetchQuoteById } from "@/app/lib/data";
import UpdateQuoteForm from "@/app/ui/admin/edit-quote";
import { notFound } from "next/navigation";

export default async function Page(props: { params: Promise<{id: string}> }) {
    const params = await props.params;
    const id = params.id;
    const quoteResult = await fetchQuoteById(id);
    const quote = quoteResult[0];

    if (!quote) notFound();

    return (
        <UpdateQuoteForm quote={quote} />
    );
};