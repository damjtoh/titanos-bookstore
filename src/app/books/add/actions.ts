"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "~/lib/constants";
import { action } from "~/lib/safe-action";
import bookService from "~/server/book-service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ServerError } from "~/lib/server-errors";
import { AddBookSchema } from "./schemas";

export const addBook = action(AddBookSchema, async (book) => {
  try {
    await bookService.create(book);
  } catch (e) {
    console.error(e);
    // Unique constraint violation
    if (e instanceof PrismaClientKnownRequestError && e.code === "P2002")
      throw new ServerError("DUPLICATE_ISBN");
    else throw new ServerError("UNKNOWN_ERROR");
  }
  revalidatePath(ROUTES.BOOKS_LIST);
  redirect(`${ROUTES.BOOKS_LIST}?success=BOOK_ADDED`);
});
