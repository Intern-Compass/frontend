"use client";

import { columns } from "@/components/features/supervisor/match-interns/supervisor/columns";

import { DataTable } from "@/components/features/supervisor/match-interns/supervisor/data-table";
import { getAllSupervisors } from "@/lib/api/admin";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeleton } from "../data-table-skeleton";
import { getDepartment } from "@/lib/utils";

const data = [
  { id: "1", name: "Alice Johnson", interns: 3, department: "Finance" },
  {
    id: "2",
    name: "Brian Smith",
    interns: 5,
    department: "Digital Services",
  },
  {
    id: "3",
    name: "Chinwe Okafor",
    interns: 2,
    department: "Customer Relations and Experience",
  },
  {
    id: "4",
    name: "David Lee",
    interns: 4,
    department: "Enterprise Business",
  },
  {
    id: "5",
    name: "Fatima Bello",
    interns: 6,
    department: "Corporate Services and Sustainability",
  },
];

interface Supervisor {
  user_id: string;
  firstname: string;
  lastname: string;
  department: number;
  interns: number;
}

export const SupervisorTable = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["allSupervisors"],
    queryFn: getAllSupervisors,
  });

  return (
    <main>
      <div className="container mx-auto py-10">
        <h2 className="font-medium text-2xl mb-4">Supervisors</h2>
        {isPending ? (
          <DataTableSkeleton />
        ) : (
          <DataTable
            columns={columns}
            data={data.map(
              ({
                user_id,
                firstname,
                lastname,
                department,
                interns,
              }: Supervisor) => ({
                id: user_id,
                name: `${firstname} ${lastname}`,
                department: getDepartment(department),
                interns,
              })
            )}
          />
        )}
      </div>
    </main>
  );
};
