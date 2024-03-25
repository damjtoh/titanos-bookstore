"use client";
import { useFormContext } from "react-hook-form";
import {
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
import { type AddBook } from "./add/schemas";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";

const ERROR_MESSAGES: Record<string, string> = {
  DUPLICATE_ISBN: "A book with this ISBN already exists.",
  UNKNOWN_ERROR: "An unknown error occurred. Please try again later.",
};

type Props = {
  isSubmitting: boolean;
  error: string | null;
  onSubmit: (values: AddBook) => void;
  buttonLabel: string;
  buttonLoadingLabel: string;
};

export default function BookForm({
  isSubmitting,
  error,
  onSubmit,
  buttonLabel,
  buttonLoadingLabel,
}: Props) {
  const form = useFormContext<AddBook>();
  return (
    <div className="mt-6 flex flex-col space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {ERROR_MESSAGES[error] ?? ERROR_MESSAGES.UNKNOWN_ERROR}
          </AlertDescription>
        </Alert>
      )}

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
          disabled={isSubmitting}
          variant="success"
          type="submit"
          className="mt-4 md:mt-0 md:self-end"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="animate-spin" />
              {buttonLoadingLabel}
            </>
          ) : (
            buttonLabel
          )}
        </Button>
      </form>
    </div>
  );
}
