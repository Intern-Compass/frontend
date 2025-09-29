"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/features/supervisor/match-interns/data-table-column-header";

import { ActionsCell } from "./actions-cell";
import { getDepartment } from "@/lib/utils";

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
    accessorKey: "intern_count",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Intern count" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionsCell
        supervisorDepartment={row.original.department}
        supervisorId={row.original.supervisor_id}
      />
    ),
  },
];
