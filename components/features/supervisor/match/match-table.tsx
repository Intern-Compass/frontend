"use client";

import { useState } from "react";
import { Search, Bell, Eye, Check, CircleAlert } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { displayMatches, matchInternToSupervisor } from "@/lib/api/supervisor";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Intern {
  firstname: string;
  lastname: string;
}

interface Supervisor {
  firstname: string;
  lastname: string;
}

interface Match {
  department: string;
  supervisor: Supervisor;
  interns: Intern[];
}

export const MatchTable = () => {
  const queryClient = useQueryClient();

  const {
    isPending,
    isError,
    data: matches,
    error,
  } = useQuery({
    queryKey: ["displayMatches"],
    queryFn: displayMatches,
  });

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
          toast(
            <div className="flex items-start gap-3 font-sans">
              <CircleAlert className="text-error-base" />

              <div className="flex flex-col gap-2.5 text-sm leading-5">
                <span className="text-foreground font-medium">
                  Something went wrong.
                </span>
                <span className="text-foreground/75 font-normal">
                  Please try again later.
                </span>
              </div>
            </div>,
            {
              classNames: {
                toast: "!bg-error-light",
              },
              position: "top-center",
            }
          );
        }
      },
    });
  };

  if (isPending) {
    return <p>Loading...</p>;
  }

  const matchEntries = Object.entries(matches);

  const formattedMatchEntries: Match[] = matchEntries.map((entry) => {
    const department = entry[0];
    const mapping = entry[1] as [Supervisor, Intern[]][];

    const [supervisor, interns] = mapping[0];

    return {
      department,
      interns: interns.map(({ firstname, lastname }) => ({
        firstname,
        lastname,
      })),
      supervisor: {
        firstname: supervisor.firstname,
        lastname: supervisor.lastname,
      },
    };
  });
  console.log(formattedMatchEntries);

  return (
    <div className=" bg-card rounded-2xl">
      {/* Main Content */}
      <main className="px-6 py-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Match Interns
            </h1>
            <Button onClick={performMatching}>Match interns</Button>
          </div>
          <p className="text-gray-600">
            Review generated matches and approve them to proceed.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Intern</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Department</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {formattedMatchEntries.map((match, i) => (
                <TableRow key={i}>
                  {match.interns.map((intern: Intern, j) => (
                    <>
                      <TableCell className="font-medium text-muted-foreground">
                        {intern.firstname} {intern.lastname}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {match.supervisor.firstname} {match.supervisor.lastname}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {match.department}
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};
