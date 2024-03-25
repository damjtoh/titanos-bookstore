import PageTitle from "~/components/ui/page-title";
import { ROUTES } from "~/lib/constants";
import bookService from "~/server/book-service";
import { notFound } from "next/navigation";
import BookEditForm from "./book-edit-form";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditBookPage({ params }: Props) {
  const id = parseInt(params.id);
  if (isNaN(id)) return notFound();
  const book = await bookService.getById(id);
  if (!book) return notFound();
  return (
    <>
      <PageTitle backUrl={ROUTES.BOOKS_LIST}>Edit book</PageTitle>
      <BookEditForm book={book} />
    </>
  );
}
