import { AddBookSchema } from "~/app/books/add/schemas";
import bookService from "~/server/book-service";

type Params = {
  id: string;
};

export async function DELETE(request: Request, params: Params) {
  const { id: _id } = params;
  const id = Number(_id);
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }
  await bookService.deleteById(id);
  return Response.json({ id });
}

export async function PUT(request: Request, params: Params) {
  const { id: _id } = params;
  const id = Number(_id);
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }
  const body: unknown = await request.json();
  const book = AddBookSchema.safeParse(body);
  if (!book.success) {
    return Response.json({ errors: book.error.errors }, { status: 400 });
  }
  const updatedBook = await bookService.updateById(id, book.data);
  return Response.json(updatedBook);
}
