"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/features/supervisor/match-interns/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { ActionsCell } from "./actions-cell";

export interface Supervisor {
  user_id: string;
  supervisor_id: string;
  firstname: string;
  lastname: string;
  department: number;
  intern_count: number;
}

export const columns: ColumnDef<Supervisor>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
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
    filterFn: (row, columnId, filterValue) => {
      const { firstname, lastname } = row.original;
      const fullName = `${firstname} ${lastname}`.toLowerCase();
      return fullName.includes(String(filterValue).toLowerCase());
    },
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    filterFn: "arrIncludes",
  },
  {
    accessorKey: "intern_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Intern count" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsCell supervisor_id={row.original.supervisor_id} />
    ),
  },
];
