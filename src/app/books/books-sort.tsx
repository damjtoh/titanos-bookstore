import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type Sort } from "./schemas";
import { SORT_OPTIONS } from "./constants";

type Props = {
  value: Sort;
  onChange: (value: Sort) => void;
};

export default function BooksSort({ value, onChange }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <label>Sort by: </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((option) => (
            <SelectItem value={option.value} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
