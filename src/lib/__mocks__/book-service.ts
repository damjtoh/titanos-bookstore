/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { beforeEach } from "vitest";
import { mockReset, mockDeep } from "vitest-mock-extended";
import { type BookService } from "~/server/book-service";

beforeEach(() => {
  mockReset(bookService);
});

const bookService = mockDeep<BookService>();
export default bookService;
