import Link from "next/link";

import { Button } from "~/components/ui/button";
import bookService from "~/server/book-service";
import BooksList from "./books-list";
import { decodeURLSearchParamsToState } from "./utils";
import { ROUTES } from "~/lib/constants";
import BookSuccessMessage from "./book-success-message";
import PageTitle from "~/components/ui/page-title";
import { Plus } from "lucide-react";

type Props = {
  searchParams: Record<string, string>;
};

export default async function HomePage({ searchParams }: Props) {
  const filters = decodeURLSearchParamsToState(
    new URLSearchParams(searchParams),
  );
  const booksList = await bookService.list(filters);
  return (
    <main className="flex flex-col items-center space-y-4">
      <BookSuccessMessage />
      <div className="flex w-full items-center justify-between">
        <PageTitle>Books inventory</PageTitle>
        <Button asChild size="lg" variant="success">
          <Link href={ROUTES.ADD_BOOK}>
            <Plus />
            <span className="ml-2 hidden md:inline">Add book</span>
          </Link>
        </Button>
      </div>
      <BooksList booksList={booksList} filters={filters} />
    </main>
  );
}
