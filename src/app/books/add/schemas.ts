import { z } from "zod";

export const AddEditBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  isbn: z.string().min(1, "ISBN is required"),
  price: z.number().gt(0, "Price must be greater than $0"),
});

export type AddEditBook = z.infer<typeof AddEditBookSchema>;
