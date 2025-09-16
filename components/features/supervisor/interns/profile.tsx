import Image from "next/image";

import { useQuery } from "@tanstack/react-query";

import { Users } from "lucide-react";

import { getMyInterns } from "@/lib/api/supervisor";

const departments = [
  "Chief Executive Officer Office",
  "Chief Operating Officer Office",
  "Company Secretariat",
  "Corporate Services and Sustainability",
  "Customer Relations and Experience",
  "Digital Services",
  "Enterprise Business",
  "Finance",
  "Fixed BroadBand",
  "Human Resources",
  "Information Technology",
  "Internal Audit and Forensic Services",
  "Marketing",
  "Network",
  "Risk and Compliance",
  "Sales and Distribution",
  "Strategy and Innovation",
];

interface Intern {
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  department: number;
}

export const Profile = () => {
  const {
    isPending,
    isError,
    data: interns,
    error,
  } = useQuery({
    queryKey: ["getInterns"],
    queryFn: getMyInterns,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bg-card rounded-lg p-2 md:p-6">
      <div className="mb-8 flex items-center">
        <Users />
        <h2 className="text-2xl font-medium ml-2">My Interns</h2>
      </div>
      {/* Intern Details */}
      {interns.map((intern: Intern) => {
        return (
          <div className="flex justify-center items-start flex-col md:flex-row gap-8">
            <div className=" rounded-full bg-primary">
              <Image
                src="/assets/images/ellipse.png"
                alt="Avatar"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4">
                <h3 className="text-foreground font-medium mb-2">Name</h3>
                <p className="text-muted-foreground text-sm">{`${intern.firstname} ${intern.lastname}`}</p>
              </div>
              <div className="p-4">
                <h3 className="text-foreground font-medium mb-2">Email</h3>
                <p className="text-muted-foreground text-sm">{intern.email}</p>
              </div>
              <div className="p-4">
                <h3 className="text-foreground font-medium mb-2">
                  Internship Duration
                </h3>
                <p className="text-muted-foreground text-sm">6 months</p>
              </div>
              <div className="p-4">
                <h3 className="text-foreground font-medium mb-2">School</h3>
                <p className="text-muted-foreground text-sm">
                  Convenant University
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-foreground font-medium mb-2">Phone no</h3>
                <p className="text-muted-foreground text-sm">
                  {intern.phone_number}
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-foreground font-medium mb-2">Department</h3>
                <p className="text-muted-foreground text-sm">
                  {departments[intern.department]}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
