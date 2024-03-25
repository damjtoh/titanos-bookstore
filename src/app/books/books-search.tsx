import { Trash2 } from "lucide-react";
import { useRef } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

type Props = {
  initialValue?: string;
  onSearch: (search: string) => void;
};

export default function BooksSearch({ initialValue = "", onSearch }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSearch = () => {
    const query = inputRef.current?.value;
    if (query) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    if (!inputRef.current) return;
    inputRef.current.value = "";
    onSearch("");
  };

  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        ref={inputRef}
        defaultValue={initialValue}
        type="email"
        placeholder="Search by title, author or ISBN"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <Button type="button" onClick={handleSearch}>
        Search
      </Button>
      {initialValue && (
        <Button type="button" variant="destructive" onClick={handleClear}>
          <Trash2 />
        </Button>
      )}
    </div>
  );
}
