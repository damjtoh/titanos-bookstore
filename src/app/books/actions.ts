"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ROUTES } from "~/lib/constants";
import { action } from "~/lib/safe-action";
import bookService from "~/server/book-service";

export const deleteBook = action(z.number(), async (bookId) => {
  await bookService.deleteById(bookId);
  revalidatePath(ROUTES.BOOKS_LIST);
  return { success: true };
});
