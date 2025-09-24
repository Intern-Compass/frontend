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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignSupervisor,
  getAllInterns,
  getAllUnmatchedInterns,
  unassignSupervisor,
} from "@/lib/api/admin";
import { toast } from "sonner";
import { Intern } from "../intern/columns";

export const ActionsCell = ({ supervisor_id }: { supervisor_id: string }) => {
  const queryClient = useQueryClient();

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

  const handleAssignSupervisor = (supervisor_id: string, intern_id: string) => {
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
          queryClient.invalidateQueries({ queryKey: ["displayMatches"] });
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
          queryClient.invalidateQueries({ queryKey: ["displayMatches"] });
        },
      }
    );
  };

  const assignedInterns = (unmatchedInterns ?? []).map((intern: Intern) => (
    <DropdownMenuItem
      key={intern.user_id}
      onClick={() => handleAssignSupervisor(supervisor_id, intern.intern_id)}
    >
      {intern.firstname} {intern.lastname}
    </DropdownMenuItem>
  ));

  const unassignedInterns = (interns ?? [])
    .filter((intern: Intern) => intern.supervisor === supervisor_id)
    .map((intern: Intern) => (
      <DropdownMenuItem
        key={intern.user_id}
        onClick={() => handleUnassignSupervisor(intern.intern_id)}
      >
        {intern.firstname} {intern.lastname}
      </DropdownMenuItem>
    ));

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
              {assignedInterns.length > 0 ? (
                assignedInterns
              ) : (
                <DropdownMenuItem disabled className="py-3 px-6">
                  No unassigned interns.
                </DropdownMenuItem>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Unassign interns</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent className="max-h-64 overflow-y-auto">
              {unassignedInterns.length > 0 ? (
                unassignedInterns
              ) : (
                <DropdownMenuItem disabled className="py-3 px-6">
                  No unassigned interns.
                </DropdownMenuItem>
              )}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
