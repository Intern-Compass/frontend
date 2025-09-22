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
  skills: string;
}

interface Supervisor {
  firstname: string;
  lastname: string;
  email: string;
  department: number;
  phone_number: string;
  skills: string;
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
  });

  // if (isPending) {
  //   return <p>Loading...</p>;
  // }

  // const matchEntries = Object.entries(matches);

  // const formattedMatchEntries: Match[] = matchEntries.map((entry) => {
  //   const department = entry[0];
  //   const mapping = entry[1] as [Supervisor, Intern[]][];

  //   const [supervisor, interns] = mapping[0];

  //   return {
  //     department,
  //     interns: interns.map(({ firstname, lastname }) => ({
  //       firstname,
  //       lastname,
  //     })),
  //     supervisor: {
  //       firstname: supervisor.firstname,
  //       lastname: supervisor.lastname,
  //     },
  //   };
  // });

  const formattedData: [string, [Supervisor, Intern[]][]][] = Object.entries(
    data ?? []
  );

  return (
    <section>
      <h2 className="font-medium text-2xl mb-4">
        Supervisor-Intern Assignments
      </h2>

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
                  const supervisorSkills = supervisor.skills
                    .split(",")
                    .map((skill) => skill.trim());

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
                            {supervisorSkills.map((skill) => (
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
                                <TableHead className="w-[250px] text-left">
                                  Skills
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {interns.map((intern, i) => {
                                const internSkills = intern.skills
                                  .split(",")
                                  .map((skill) => skill.trim());

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
                                    <TableCell className="w-[250px] h-12 text-left">
                                      <div className="space-x-2 flex flex-wrap gap-2">
                                        {internSkills.map((skill, i) => (
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
