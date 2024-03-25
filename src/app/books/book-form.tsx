"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { numberTransformer } from "~/lib/formatters";
import { type AddEditBook, AddEditBookSchema } from "./add/schemas";
import { useAction } from "next-safe-action/hooks";
import { addBook } from "./add/actions";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { editBook } from "./[id]/edit/actions";

const ERROR_MESSAGES: Record<string, string> = {
  DUPLICATE_ISBN: "A book with this ISBN already exists.",
  UNKNOWN_ERROR: "An unknown error occurred. Please try again later.",
};

type Props = {
  initialValues?: AddEditBook & { id: number };
};

const DEFAULT_VALUES = {
  title: "",
  author: "",
  isbn: "",
  price: 0,
};

const LABELS = {
  EDITING: {
    BUTTON: "Edit book",
    BUTTON_LOADING: "Editing book...",
  },
  ADDING: {
    BUTTON: "Add book",
    BUTTON_LOADING: "Adding book...",
  },
};

export default function BookForm({ initialValues }: Props) {
  const form = useForm<AddEditBook>({
    resolver: zodResolver(AddEditBookSchema),
    defaultValues: {
      ...DEFAULT_VALUES,
      ...initialValues,
    },
  });

  const isEditing = Boolean(initialValues);

  const labels = isEditing ? LABELS.EDITING : LABELS.ADDING;

  const { execute, status, result } = useAction(isEditing ? editBook : addBook);

  function onSubmit(values: AddEditBook) {
    if (initialValues) {
      execute({ id: initialValues.id, ...values });
    } else {
      execute(values);
    }
  }

  return (
    <div className="mt-6 flex flex-col space-y-4">
      {result.serverError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {ERROR_MESSAGES[result.serverError] ?? ERROR_MESSAGES.UNKNOWN_ERROR}
          </AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="The Night Circus" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Erin Morgenstern" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input placeholder="978-0307744432" {...field} />
                  </FormControl>
                  <FormDescription>
                    ISBN is a unique identifier for books.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="9.99"
                      value={numberTransformer.input(value)}
                      onChange={(e) => onChange(numberTransformer.output(e))}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            disabled={status === "executing"}
            variant="success"
            type="submit"
            className="mt-4 md:mt-0 md:self-end"
          >
            {status === "executing" ? (
              <>
                <LoaderCircle className="animate-spin" />
                {labels.BUTTON_LOADING}
              </>
            ) : (
              labels.BUTTON
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
