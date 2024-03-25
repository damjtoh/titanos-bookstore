import { type Book } from "@prisma/client";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { deleteBook } from "./actions";
import { useAction } from "next-safe-action/hooks";
import { LoaderCircle } from "lucide-react";
import { ROUTES } from "~/lib/constants";
import { useRouter } from "next/navigation";

type Props = {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export default function BookDeleteDialog({ book, open, onOpenChange }: Props) {
  const router = useRouter();
  const { execute, status } = useAction(deleteBook, {
    onSuccess: (data) => {
      console.log("data: ", data);
      if (data.success) {
        router.replace(`${ROUTES.BOOKS_LIST}?success=BOOK_DELETED`);
        router.refresh();
        onOpenChange(false);
      }
    },
  });

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      {book && (
        <DialogContent className="space-y-4">
          <DialogHeader className="space-y-4">
            <DialogTitle>
              Are you absolutely sure you want to delete the book: "{book.title}
              "?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              book <strong>&quot;{book.title}&quot;</strong>.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={status === "executing"}
              variant="destructive"
              onClick={() => execute(book.id)}
            >
              {status === "executing" ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Deleting book...
                </>
              ) : (
                "Delete book"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
