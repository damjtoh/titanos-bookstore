import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AddBookSchema } from "~/app/books/add/schemas";
import bookService from "~/server/book-service";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(request: Request, params: Params) {
  const {
    params: { id: _id },
  } = params;
  const id = Number(_id);
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }
  try {
    await bookService.deleteById(id);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }
    throw error;
  }
  return new Response(null, {
    status: 204,
  });
}

export async function PUT(request: Request, params: Params) {
  const {
    params: { id: _id },
  } = params;

  const id = Number(_id);
  if (isNaN(id)) {
    return Response.json({ error: "Invalid ID" }, { status: 400 });
  }
  const body: unknown = await request.json();
  const book = AddBookSchema.safeParse(body);
  if (!book.success) {
    return Response.json({ errors: book.error.errors }, { status: 400 });
  }
  try {
    const updatedBook = await bookService.updateById(id, book.data);
    return Response.json(updatedBook);
  } catch (error) {
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return Response.json({ error: "Book not found" }, { status: 404 });
    }
    throw error;
  }
}
