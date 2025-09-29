"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/features/supervisor/match-interns/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn, getDepartment } from "@/lib/utils";

export interface Intern {
  user_id: string;
  intern_id: string;
  firstname: string;
  lastname: string;
  department: number;
  status: string;
  supervisor: string | null;
}

export const columns: ColumnDef<Intern>[] = [
  {
    accessorKey: "name",
    accessorFn: (row) => `${row.firstname} ${row.lastname}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const { firstname, lastname } = row.original;

      return (
        <span>
          {firstname} {lastname}
        </span>
      );
    },
  },
  {
    accessorKey: "department",
    accessorFn: (row) => getDepartment(row.department),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue<string>("status");

      return (
        <Badge
          className={cn(
            "capitalize font-medium text-xs leading-4 py-0.5 px-2.5 rounded-[9999px]",
            status === "assigned"
              ? "bg-success-light text-success-dark"
              : "bg-error-light text-error-dark"
          )}
        >
          {status}
        </Badge>
      );
    },
    enableSorting: false,
    filterFn: (row, columnId, filterValue: string[]) => {
      if (!filterValue?.length) return true; // no filter

      return filterValue.includes(row.getValue(columnId));
    },
  },
];
