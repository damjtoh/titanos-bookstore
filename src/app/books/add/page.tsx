import PageTitle from "~/components/ui/page-title";
import { ROUTES } from "~/lib/constants";
import BookAddForm from "./book-add-form";

export default function AddBookPage() {
  return (
    <>
      <PageTitle backUrl={ROUTES.BOOKS_LIST}>Add new book</PageTitle>
      <BookAddForm />
    </>
  );
}
