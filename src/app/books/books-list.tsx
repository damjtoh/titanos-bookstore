"use client";

import BooksSearch from "./books-search";
import BooksListPagination from "./books-list-pagination";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { encodeStateToURLSearchParams } from "./utils";
import BooksSort from "./books-sort";
import { type Sort, type Filters, type ListBooksResult } from "./schemas";
import BookDeleteDialog from "./book-delete-dialog";
import { type Book } from "@prisma/client";
import BookCard from "./book-card";

type Props = {
  booksList: ListBooksResult;
  filters: Filters;
};

export default function BooksList({
  booksList,
  filters: initialFilters,
}: Props) {
  const [filters, setState] = useState<Filters>(initialFilters);
  const [isPending, startTransition] = useTransition();
  const [bookToBeDeleted, setBookToBeDeleted] = useState<Book | null>(null);
  const router = useRouter();

  const handleFilterChange = (filters: Partial<Filters>) => {
    const nextFilters = { ...initialFilters, ...filters };
    const params = encodeStateToURLSearchParams(nextFilters);
    startTransition(() => {
      setState(nextFilters);
      router.push("?" + params.toString());
    });
  };

  const handlePageChange = (page: number) => {
    handleFilterChange({ page });
  };

  const handleSearch = (search: string) => {
    handleFilterChange({ search, page: 1 });
  };

  const handleSortChange = (sort: Sort) => {
    handleFilterChange({ sort, page: 1 });
  };

  return (
    <>
      <BookDeleteDialog
        open={Boolean(bookToBeDeleted)}
        onOpenChange={() => setBookToBeDeleted(null)}
        book={bookToBeDeleted}
      />
      <div className="flex w-full flex-col justify-between space-y-4 md:flex-row md:space-y-0">
        <BooksSearch onSearch={handleSearch} initialValue={filters.search} />
        <BooksSort onChange={handleSortChange} value={filters.sort} />
      </div>
      {booksList.total === 0 ? (
        <div className="flex h-96 items-center justify-center">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            No books found, try another search.
          </p>
        </div>
      ) : (
        <>
          <span className="self-start text-lg font-semibold">
            {booksList.total} books found
          </span>
          <div
            data-pending={isPending ? "" : undefined}
            className="md:gap-8x grid w-full items-start gap-4 has-[[data-pending]]:animate-pulse md:grid-cols-2"
          >
            {booksList.results.map((book) => (
              <BookCard
                book={book}
                key={book.id}
                onDeleteClick={setBookToBeDeleted}
              />
            ))}
          </div>
          <BooksListPagination
            count={booksList.total}
            onPageChange={handlePageChange}
            currentPage={filters.page}
          />
        </>
      )}
    </>
  );
}
