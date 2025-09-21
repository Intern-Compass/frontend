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
import { displayMatches, matchInternToSupervisor } from "@/lib/api/supervisor";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { errorToast } from "@/lib/toast";
import { Badge } from "@/components/ui/badge";

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

  const {
    isPending,
    isError,
    data: matches,
    error,
  } = useQuery({
    queryKey: ["displayMatches"],
    queryFn: displayMatches,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

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

  const formattedMatchEntries: Match[] = [
    {
      department: "Information Technology",
      supervisor: {
        firstname: "John",
        lastname: "Doe",
        email: "john.doe@company.com",
        phone_number: "+2348012345678",
        skills: "System Architecture, Java, Cloud Computing",
      },
      interns: [
        {
          firstname: "Alice",
          lastname: "Smith",
          email: "alice.smith@interns.com",
          phone_number: "+2348098765432",
          skills: "React, TypeScript, UI/UX Design",
        },
        {
          firstname: "Bob",
          lastname: "Johnson",
          email: "bob.johnson@interns.com",
          phone_number: "+2348087654321",
          skills: "Node.js, Express, MongoDB",
        },
        {
          firstname: "Charlie",
          lastname: "Brown",
          email: "charlie.brown@interns.com",
          phone_number: "+2348076543210",
          skills: "Python, Machine Learning, Data Analysis",
        },
      ],
    },
    {
      department: "Digital Services",
      supervisor: {
        firstname: "Emily",
        lastname: "Clark",
        email: "emily.clark@company.com",
        phone_number: "+2348065432109",
        skills: "Design Systems, Figma, Branding",
      },
      interns: [
        {
          firstname: "Diana",
          lastname: "Williams",
          email: "diana.williams@interns.com",
          phone_number: "+2348054321098",
          skills: "Adobe Illustrator, Motion Graphics, UI/UX",
        },
        {
          firstname: "Ethan",
          lastname: "Taylor",
          email: "ethan.taylor@interns.com",
          phone_number: "+2348043210987",
          skills: "Wireframing, Typography, Web Design",
        },
      ],
    },
    {
      department: "Marketing",
      supervisor: {
        firstname: "Michael",
        lastname: "Lee",
        email: "michael.lee@company.com",
        phone_number: "+2348032109876",
        skills: "Digital Marketing, SEO, Campaign Strategy",
      },
      interns: [
        {
          firstname: "Sophia",
          lastname: "Martinez",
          email: "sophia.martinez@interns.com",
          phone_number: "+2348021098765",
          skills: "Content Writing, SEO, Social Media",
        },
        {
          firstname: "Liam",
          lastname: "Garcia",
          email: "liam.garcia@interns.com",
          phone_number: "+2348010987654",
          skills: "Google Ads, Analytics, Copywriting",
        },
        {
          firstname: "Olivia",
          lastname: "Hernandez",
          email: "olivia.hernandez@interns.com",
          phone_number: "+2348091234567",
          skills: "Market Research, Data Analytics, Email Marketing",
        },
      ],
    },
  ];

  console.log(formattedMatchEntries);

  return (
    <section>
      <h2 className="font-medium text-xl mb-4">
        Supervisor-Intern Assignments
      </h2>

      <Accordion type="multiple" className="w-full">
        {formattedMatchEntries.map((match, i) => {
          return (
            <AccordionItem key={i} value={`item-${i + 1}`}>
              <AccordionTrigger>
                {match.supervisor.firstname} {match.supervisor.lastname} -{" "}
                {match.interns.length} interns
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance mb-4">
                <div className="bg-white rounded-lg shadow-sm border border-card overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Intern</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone number</TableHead>
                        <TableHead>Skills</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {match.interns.map(
                        (
                          { firstname, lastname, email, phone_number, skills },
                          i
                        ) => {
                          const skillsArray = skills
                            .split(",")
                            .map((skill) => skill.trim());

                          return (
                            <TableRow key={i}>
                              <TableCell className="font-medium text-muted-foreground">
                                {firstname} {lastname}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {email}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {phone_number}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                <div className="space-x-2">
                                  {skillsArray.map((skill) => (
                                    <Badge className="bg-gray-100 text-gray-800">
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        }
                      )}
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
};
