"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { displayMatches, performMatching } from "@/lib/api/admin";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { errorToast } from "@/lib/toast";
import { Badge } from "@/components/ui/badge";
import { getDepartment } from "@/lib/utils";
import { MatchTableSkeleton } from "./match-table-skeleton";

interface Intern {
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  similarity: string;
  skills: string[];
}

interface Supervisor {
  firstname: string;
  lastname: string;
  email: string;
  department: number;
  phone_number: string;
  skills: string[];
}

interface Match {
  department: string;
  supervisor: Supervisor;
  interns: Intern[];
}

export const MatchTable = () => {
  const queryClient = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["displayMatches"],
    queryFn: displayMatches,
    initialData: {},
  });

  const mutation = useMutation({
    mutationFn: performMatching,
  });

  const matchInternToSupervisor = () => {
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

  const formattedData: [string, [Supervisor, Intern[]][]][] =
    Object.entries(data);

  return (
    <section>
      {formattedData.length ? (
        <header className="flex justify-between items-center gap-4">
          <h2 className="font-medium text-2xl mb-4">Preview Matches</h2>
          <Button
            size="sm"
            onClick={matchInternToSupervisor}
            className="cursor-pointer"
          >
            Approve matches
          </Button>
        </header>
      ) : null}

      {isPending ? (
        <MatchTableSkeleton />
      ) : (
        formattedData.map(([_, mappings], i) => {
          const departmentId = mappings[0][0].department;

          return (
            <section key={`section-${i}`} className="my-10">
              <h3 className="font-medium text-lg mb-5">
                {getDepartment(departmentId)}
              </h3>

              <Accordion type="single" collapsible className="w-full mb-5">
                {mappings.map(([supervisor, interns]) => {
                  return (
                    <AccordionItem
                      key={`${supervisor.firstname} ${supervisor.lastname}`}
                      value={`${supervisor.firstname} ${supervisor.lastname}`}
                    >
                      <AccordionTrigger>
                        <div className="w-full flex justify-between gap-4">
                          <span>
                            {supervisor.firstname} {supervisor.lastname}
                          </span>
                          <div className="w-full max-w-100 flex flex-wrap items-center gap-3.5">
                            {supervisor.skills.map((skill) => (
                              <Badge
                                key={skill}
                                className="bg-gray-100 text-gray-800"
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-4 text-balance">
                        <div className="overflow-hidden rounded-md border">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="max-w-[200px] text-left">
                                  Intern
                                </TableHead>
                                <TableHead className="max-w-[200px] text-left">
                                  Email
                                </TableHead>
                                <TableHead className="max-w-[200px] text-left">
                                  Phone number
                                </TableHead>
                                <TableHead className="max-w-[200px] text-left">
                                  Similarity
                                </TableHead>
                                <TableHead className="max-w-[200px] text-left">
                                  Skills
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {interns.map((intern, i) => {
                                return (
                                  <TableRow key={i}>
                                    <TableCell className="max-w-[200px] h-12 text-left truncate">
                                      {intern.firstname} {intern.lastname}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] h-12 text-left truncate">
                                      {intern.email}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] h-12 text-left truncate">
                                      {intern.phone_number}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] h-12 text-left truncate">
                                      {intern.similarity}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] h-12 text-left">
                                      <div className="space-x-2 flex flex-wrap gap-2">
                                        {intern.skills.map((skill, i) => (
                                          <Badge
                                            key={i}
                                            className="bg-gray-100 text-gray-800"
                                          >
                                            {skill}
                                          </Badge>
                                        ))}
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </section>
          );
        })
      )}
    </section>
  );
};
