"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "@/components/features/supervisor/match-interns/data-table-view-options";

import {
  departmentOptions,
  priorities,
  statuses,
} from "@/components/features/supervisor/match-interns/data";

import { DataTableFacetedFilter } from "@/components/features/supervisor/match-interns/data-table-faceted-filter";
import { matchInternToSupervisor } from "@/lib/api/supervisor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { errorToast } from "@/lib/toast";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: matchInternToSupervisor,
  });

  const performMatching = () => {
    mutation.mutate(undefined, {
      onSuccess: () => {
        toast.success("Interns matched successfully.");

        queryClient.invalidateQueries({ queryKey: ["displayMatches"] });
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          errorToast("Something went wrong.", "Please try again later.");
        }
      },
    });
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter interns..."
          value={(table.getColumn("intern")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("intern")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("department") && (
          <DataTableFacetedFilter
            column={table.getColumn("department")}
            title="Department"
            options={departmentOptions}
          />
        )}
        {/* {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )} */}
        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => table.resetColumnFilters()}
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
        <Button size="sm" onClick={performMatching} className="cursor-pointer">
          Approve matches
        </Button>
      </div>
    </div>
  );
}
