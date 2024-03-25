import { type NextRequest } from "next/server";
import { AddBookSchema } from "~/app/books/add/schemas";
import { decodeURLSearchParamsToState } from "~/app/books/utils";
import bookService from "~/server/book-service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const filters = decodeURLSearchParamsToState(searchParams);
  return Response.json(await bookService.list(filters));
}

export async function POST(request: Request) {
  const body: unknown = await request.json();
  const book = AddBookSchema.safeParse(body);
  if (!book.success) {
    return Response.json({ errors: book.error.errors }, { status: 400 });
  }
  const createdBook = await bookService.create(book.data);
  return Response.json(createdBook, { status: 201 });
}
