export const MAX_BOOKS_PER_PAGE = 10;
export const DEFAULT_SORT = "title-asc";
export const SORT_OPTIONS = [
  { label: "Title (A-Z)", value: "title-asc" },
  { label: "Title (Z-A)", value: "title-desc" },
  { label: "Author (A-Z)", value: "author-asc" },
  { label: "Author (Z-A)", value: "author-desc" },
  { label: "Price (Low to High)", value: "price-asc" },
  { label: "Price (High to Low)", value: "price-desc" },
];
export const SUCCESS_MESSAGES: Record<string, string> = {
  BOOK_ADDED: "Book added successfully.",
  BOOK_DELETED: "Book deleted successfully.",
  BOOK_UPDATED: "Book updated successfully.",
};

export type SuccessMessage = keyof typeof SUCCESS_MESSAGES;
