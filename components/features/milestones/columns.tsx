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

export type Status = "upcoming" | "overdue" | "completed";

export type Project = {
  id: string;
  name: string;
  date: Date;
  assigner: string;
  status: Status;
};

export const projects: Project[] = [
  {
    id: "728ed52f",
    name: "UX Report",
    date: new Date("2025-02-02"),
    assigner: "Blessing Musa",
    status: "upcoming",
  },
  {
    id: "728ed52f",
    name: "My Lagos App Design",
    date: new Date("2025-01-19"),
    assigner: "Blessing Musa",
    status: "overdue",
  },
  {
    id: "728ed52f",
    name: "MyMTN App Redesign",
    date: new Date("2025-01-20"),
    assigner: "Blessing Musa",
    status: "upcoming",
  },
  {
    id: "728ed52f",
    name: "UX Report",
    date: new Date("2025-01-21"),
    assigner: "Blessing Musa",
    status: "completed",
  },
  {
    id: "728ed52f",
    name: "UX Report",
    date: new Date("2025-01-22"),
    assigner: "Blessing Musa",
    status: "completed",
  },
  {
    id: "728ed52f",
    name: "MyMTN App Report",
    date: new Date("2025-01-23"),
    assigner: "Blessing Musa",
    status: "overdue",
  },
];

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
      const dateString = date.toISOString().split("T")[0];

      return <span>{dateString}</span>;
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
            status === "upcoming" && "bg-warning-light text-warning-dark",
            status === "overdue" && "bg-error-light text-error-dark",
            status === "completed" && "bg-success-light text-success-dark"
          )}
        >
          {status}
        </Badge>
      );
    },
    filterFn: "arrIncludesSome",
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
