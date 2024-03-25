"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { Form } from "~/components/ui/form";
import { type EditBook, EditBookSchema, type AddBook } from "../../add/schemas";
import BookForm from "../../book-form";
import { editBook } from "./actions";

type Props = {
  book: EditBook;
};

export default function BookEditForm({ book }: Props) {
  const form = useForm<EditBook>({
    resolver: zodResolver(EditBookSchema),
    defaultValues: book,
  });

  const { execute, status, result } = useAction(editBook);

  function onSubmit(values: AddBook) {
    execute({ ...values, id: book.id });
  }

  return (
    <Form {...form}>
      <BookForm
        isSubmitting={status === "executing"}
        error={result?.serverError ?? null}
        onSubmit={onSubmit}
        buttonLabel="Save changes"
        buttonLoadingLabel="Saving changes..."
      />
    </Form>
  );
}
