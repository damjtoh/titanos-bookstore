"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { type AddBook, AddBookSchema } from "./schemas";
import { addBook } from "./actions";
import { Form } from "~/components/ui/form";
import BookForm from "../book-form";

export default function BookAddForm() {
  const form = useForm<AddBook>({
    resolver: zodResolver(AddBookSchema),
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      price: 0,
    },
  });

  const { execute, status, result } = useAction(addBook);

  function onSubmit(values: AddBook) {
    execute(values);
  }
  return (
    <Form {...form}>
      <BookForm
        isSubmitting={status === "executing"}
        error={result?.serverError ?? null}
        onSubmit={onSubmit}
        buttonLabel="Add book"
        buttonLoadingLabel="Adding book..."
      />
    </Form>
  );
}
