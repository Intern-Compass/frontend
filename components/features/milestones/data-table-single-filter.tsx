import * as React from "react";
import { Column } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableSingleFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableSingleFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableSingleFilterProps<TData, TValue>) {
  const selectedValue = column?.getFilterValue() as string;

  return (
    <div className="relative flex items-center gap-2">
      <Select
        value={selectedValue ?? ""}
        onValueChange={(value) => column?.setFilterValue(value)}
      >
        <SelectTrigger className="w-[190px] text-sm font-medium leading-5">
          <SelectValue placeholder={`${title}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              <div className="flex items-center gap-2">
                {option.icon && (
                  <option.icon className="text-muted-foreground size-4" />
                )}
                <span>{option.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedValue && (
        <Badge
          variant="secondary"
          className="absolute top-1/2 -translate-y-1/2 right-9 rounded-sm px-2 font-normal cursor-pointer"
          onClick={() => column?.setFilterValue(undefined)}
        >
          Clear
        </Badge>
      )}
    </div>
  );
}
