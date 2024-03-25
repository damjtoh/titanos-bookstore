import { afterEach, describe, expect, it } from "vitest";
import AddBookPage from "./page";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import bookService from "~/lib/__mocks__/book-service";

describe("AddBookPage", () => {
  afterEach(cleanup);
  afterEach(() => {
    bookService.create.mockReset();
  });
  it("should render the page title and basic controls", async () => {
    render(<AddBookPage />);
    // page title
    expect(
      screen.getByRole("heading", { level: 1, name: /Add new book/ }),
    ).toBeDefined();
    // input fields
    expect(screen.getByRole("textbox", { name: "Title" })).toBeDefined();
    expect(screen.getByRole("textbox", { name: "Author" })).toBeDefined();
    expect(screen.getByRole("textbox", { name: "ISBN" })).toBeDefined();
    expect(screen.getByRole("spinbutton", { name: "Price" })).toBeDefined();
    // submit button
    expect(screen.getByRole("button", { name: "Add book" })).toBeDefined();
  });
  it("should display error messages on submit bc empty form", async () => {
    const user = userEvent.setup();
    render(<AddBookPage />);
    const submit = screen.getByText("Add book");
    await user.click(submit);
    expect(screen.getByText(/Title is required/)).toBeDefined();
    expect(screen.getByText(/Author is required/)).toBeDefined();
    expect(screen.getByText(/ISBN is required/)).toBeDefined();
    expect(screen.getByText(/Price must be greater than \$0/)).toBeDefined();
  });
  it("should send data to the server when the form is submitted", async () => {
    const user = userEvent.setup();

    render(<AddBookPage />);
    // fill the form
    const title = screen.getByRole("textbox", { name: "Title" });
    const author = screen.getByRole("textbox", { name: "Author" });
    const isbn = screen.getByRole("textbox", { name: "ISBN" });
    const price = screen.getByRole("spinbutton", { name: "Price" });
    const submit = screen.getByRole("button", { name: "Add book" });
    await user.type(title, "Book 1");
    await user.type(author, "Author 1");
    await user.type(isbn, "123456");
    await user.type(price, "10.2");
    // submit form
    await user.click(submit);
    expect(
      bookService.create.calledWith({
        title: "Book 1",
        author: "Author 1",
        isbn: "123456",
        price: 10.2,
      }),
    ).toBeTruthy();
  });
});
