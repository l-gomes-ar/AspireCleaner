import { PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteQuote } from "@/app/lib/actions"

export function UpdateQuote({ id }: { id: string }) {
  return (
    <Link
      href={`/admin/quotes/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100 hover:cursor-pointer"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function ViewDetails({ id }: {id: string}) {
    return (
        <Link
            href={`/admin/quotes/${id}/view`}
            className="rounded-md border p-2 hover:bg-gray-100 hover:cursor-pointer"
        >
            <MagnifyingGlassIcon className="w-5" />
        </Link>
    );
}

export function DeleteQuote({ id }: { id: string }) {
  const deleteQuoteWithId = deleteQuote.bind(null, id);
  return (
    <>
    <form action={deleteQuoteWithId}>
      <button type="submit" className="text-white bg-red-500 rounded-md border p-2 hover:bg-red-800 hover:cursor-pointer">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
    </>
  );
}
