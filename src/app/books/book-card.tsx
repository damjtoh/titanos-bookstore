"use client";

import { type Book } from "@prisma/client";
import { PencilLine, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ROUTES } from "~/lib/constants";
import { formatPrice } from "~/lib/formatters";

type Props = {
  book: Book;
  onDeleteClick: (book: Book) => void;
};

export default function BookCard({ book, onDeleteClick }: Props) {
  return (
    <div key={book.id} className="rounded-lg border shadow-sm">
      <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-4">
        <Image
          alt="Book cover"
          className="aspect-tall dark:border-gray-850 mx-auto rounded-lg border object-cover"
          height="150"
          src="/book-cover.webp"
          width="100"
        />
        <div className="grid gap-2 md:col-span-3">
          <div className="flex items-center gap-4">
            <div className="flex w-full justify-between">
              <div className="grid gap-1">
                <h1 className="text-2xl font-semibold leading-none">
                  {book.title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                  {book.author}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button asChild className="size-9 p-2" size="sm">
                  <Link
                    href={ROUTES.EDIT_BOOK.replace(":id", book.id.toString())}
                  >
                    <PencilLine />
                  </Link>
                </Button>

                <Button
                  className="size-9 p-2"
                  variant="destructive"
                  size="sm"
                  onClick={() => onDeleteClick(book)}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">ISBN</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {book.isbn}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <h2 className="text-xl font-semibold">Price</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {formatPrice(book.price)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
