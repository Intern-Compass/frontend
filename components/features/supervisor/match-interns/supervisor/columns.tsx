"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/features/supervisor/match-interns/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignSupervisor,
  getAllInterns,
  getAllUnmatchedInterns,
  unassignSupervisor,
} from "@/lib/api/admin";

import type { Intern } from "../intern/columns";
import { toast } from "sonner";

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
    cell: ({ row }) => {
      const queryClient = useQueryClient();

      const supervisor_id = row.original.supervisor_id;

      const { data: interns } = useQuery({
        queryKey: ["allInterns"],
        queryFn: getAllInterns,
      });

      const { data: unmatchedInterns } = useQuery({
        queryKey: ["allMatchedInterns"],
        queryFn: getAllUnmatchedInterns,
      });

      const assignSupervisorMutation = useMutation({
        mutationFn: assignSupervisor,
      });

      const unassignSupervisorMutation = useMutation({
        mutationFn: unassignSupervisor,
      });

      const handleAssignSupervisor = (
        supervisor_id: string,
        intern_id: string
      ) => {
        assignSupervisorMutation.mutate(
          { supervisor_id, intern_id },
          {
            onSuccess: () => {
              toast.success("Intern assigned successfully.");

              queryClient.invalidateQueries({
                queryKey: ["allMatchedInterns"],
              });
              queryClient.invalidateQueries({ queryKey: ["allInterns"] });
              queryClient.invalidateQueries({ queryKey: ["allSupervisors"] });
            },
          }
        );
      };

      const handleUnassignSupervisor = (intern_id: string) => {
        unassignSupervisorMutation.mutate(
          { intern_id },
          {
            onSuccess: () => {
              toast.success("Intern unassigned successfully.");

              queryClient.invalidateQueries({
                queryKey: ["allMatchedInterns"],
              });
              queryClient.invalidateQueries({ queryKey: ["allInterns"] });
              queryClient.invalidateQueries({ queryKey: ["allSupervisors"] });
            },
          }
        );
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="start">
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Assign interns</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="max-h-64 overflow-y-auto">
                  {(unmatchedInterns ?? []).map((intern: Intern) => (
                    <DropdownMenuItem
                      key={intern.user_id}
                      onClick={() =>
                        handleAssignSupervisor(supervisor_id, intern.intern_id)
                      }
                    >
                      {intern.firstname} {intern.lastname}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Unassign interns</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="max-h-64 overflow-y-auto">
                  {interns
                    .filter(
                      (intern: Intern) => intern.supervisor === supervisor_id
                    )
                    .map((intern: Intern) => (
                      <DropdownMenuItem
                        key={intern.user_id}
                        onClick={() =>
                          handleUnassignSupervisor(intern.intern_id)
                        }
                      >
                        {intern.firstname} {intern.lastname}
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
