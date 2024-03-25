"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "~/lib/constants";
import { action } from "~/lib/safe-action";
import bookService from "~/server/book-service";
import { ServerError } from "~/lib/server-errors";
import { EditBookSchema } from "../../add/schemas";

export const editBook = action(EditBookSchema, async ({ id, ...book }) => {
  try {
    await bookService.updateById(id, book);
  } catch (e) {
    console.error(e);
    throw new ServerError("UNKNOWN_ERROR");
  }
  revalidatePath(ROUTES.BOOKS_LIST);
  redirect(`${ROUTES.BOOKS_LIST}?success=BOOK_UPDATED`);
});
