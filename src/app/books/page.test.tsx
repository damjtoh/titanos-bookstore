import { beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import BooksPage from "./page";
import bookService from "~/lib/__mocks__/book-service";
import { afterEach } from "node:test";

const mockBooks = [
  {
    id: 1,
    title: "Book 1",
    author: "Author 1",
    isbn: "123456",
    price: 10.2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

describe("BooksPage", () => {
  afterEach(() => {
    bookService.list.mockReset();
  });
  beforeEach(() => {
    bookService.list.mockResolvedValue({
      total: 0,
      results: [],
    });
  });
  it("should render the page title and basic controls", async () => {
    const Result = await BooksPage({ searchParams: {} });
    render(Result);
    // page title
    expect(
      screen.getByRole("heading", { level: 1, name: /Books inventory/ }),
    ).toBeDefined();
    // add button
    expect(screen.getByRole("link", { name: /Add book/ })).toBeDefined();
    // search input
    expect(screen.getByPlaceholderText(/Search/)).toBeDefined();
    // sort select
    expect(screen.getByRole("combobox", { name: /Sort by/ })).toBeDefined();
  });
  it("should display the no books message", async () => {
    const Result = await BooksPage({ searchParams: {} });
    render(Result);

    expect(
      screen.findByText(/No books found, try another search./),
    ).toBeDefined();
    // also should not display the pagination
    expect(screen.queryByRole("button", { name: /Next/ })).toBeNull();
    expect(screen.queryByRole("button", { name: /Prev/ })).toBeNull();
  });
  it("should display a single book and it's values", async () => {
    bookService.list.mockResolvedValue({
      total: mockBooks.length,
      results: mockBooks,
    });
    const Result = await BooksPage({ searchParams: {} });
    render(Result);

    expect(screen.getByText("1 books found")).toBeDefined();
    // book title
    expect(
      screen.getByRole("heading", { level: 1, name: mockBooks[0]?.title }),
    ).toBeDefined();
    // book author
    expect(screen.findByText(mockBooks[0]!.author)).toBeDefined();
    // book isbn
    expect(screen.findByText(mockBooks[0]!.isbn)).toBeDefined();
    // book price
    expect(screen.findByText("10.20")).toBeDefined();
    // pagination controls
    const prevButton = screen
      .getByRole("button", { name: /Prev/ })
      .closest("button");
    expect(prevButton).toHaveProperty("disabled", true);
    const nextButton = screen
      .getByRole("button", { name: /Next/ })
      .closest("button");
    expect(nextButton).toHaveProperty("disabled", true);
  });
});
