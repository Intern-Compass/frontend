"use client";

import { Table } from "@tanstack/react-table";
import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { statuses, dates } from "@/components/features/intern/milestones/data";
import { DataTableFacetedFilter } from "@/components/features/intern/milestones/data-table-faceted-filter";
import { DataTableSingleFilter } from "@/components/features/intern/milestones/data-table-single-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <div className="relative flex-1 flex items-center py-4">
          <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2" />

          <Input
            placeholder="Search by projects"
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="p-3 pl-9 text-foreground leading-6 placeholder:text-muted-foreground/60"
          />
        </div>
        {table.getColumn("status") && (
          <DataTableSingleFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("date") && (
          <DataTableSingleFilter
            column={table.getColumn("date")}
            title="Date"
            options={dates}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Clear all
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}
