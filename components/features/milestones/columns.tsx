"use client";

import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "./data-table-column-header";
import {
  format,
  isThisMonth,
  isThisWeek,
  isThisYear,
  isToday,
  parseISO,
} from "date-fns";

export type Status = "inProgress" | "overdue" | "completed";
type FilterDateOptions = "today" | "week" | "month" | "year";

export type Project = {
  id: string;
  name: string;
  date: string;
  assigner: string;
  status: Status;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Projects",
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date given" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      const dateString = format(date, "yyyy-MM-dd");

      return <span>{dateString}</span>;
    },
    sortingFn: "datetime",
    filterFn: (row, columnId, filterValue) => {
      const date = new Date(row.getValue(columnId));

      switch (filterValue) {
        case "today":
          return isToday(date);
        case "week":
          return isThisWeek(date);
        case "month":
          return isThisMonth(date);
        case "year":
          return isThisYear(date);
        default:
          return false;
      }
    },
  },
  {
    accessorKey: "assigner",
    header: "Assigned by",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: Status = row.getValue("status");

      return (
        <Badge
          className={cn(
            "capitalize font-medium text-xs leading-4 py-0.5 px-2.5 rounded-[9999px]",
            status === "inProgress" && "bg-warning-light text-warning-dark",
            status === "overdue" && "bg-error-light text-error-dark",
            status === "completed" && "bg-success-light text-success-dark"
          )}
        >
          {status === "inProgress" ? "In Progress" : status}
        </Badge>
      );
    },
    // filterFn: "arrIncludesSome",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
