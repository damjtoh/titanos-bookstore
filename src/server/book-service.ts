import { type Filters } from "~/app/books/schemas";
import { db } from "./db";
import type { Prisma } from "@prisma/client";
import { transformSortToDatabase } from "~/app/books/utils";

async function list(filters: Filters) {
  const { page = 1, search = "", sort } = filters;
  const where: Prisma.BookWhereInput = {
    OR: [
      { title: { contains: search, mode: "insensitive" } },
      { isbn: { contains: search, mode: "insensitive" } },
      { author: { contains: search, mode: "insensitive" } },
    ],
  };
  const orderBy = transformSortToDatabase(sort);
  const total = await db.book.count({ where });
  const results = await db.book.findMany({
    where,
    skip: (page - 1) * 10,
    take: 6,
    orderBy,
  });
  return { total, results };
}

async function getById(id: number) {
  return db.book.findUnique({ where: { id } });
}

async function deleteById(id: number) {
  return db.book.delete({ where: { id } });
}

async function create(book: Prisma.BookCreateInput) {
  return db.book.create({ data: book });
}

async function updateById(id: number, book: Prisma.BookUpdateInput) {
  return db.book.update({ where: { id }, data: book });
}

const bookService = {
  getById,
  create,
  list,
  deleteById,
  updateById,
};

export default bookService;
