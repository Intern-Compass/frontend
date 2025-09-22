"use client";

import { columns } from "@/components/features/supervisor/match-interns/intern/columns";

import { DataTable } from "@/components/features/supervisor/match-interns/intern/data-table";
import { getAllInterns } from "@/lib/api/admin";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeleton } from "../data-table-skeleton";
import { getDepartment } from "@/lib/utils";

interface Intern {
  user_id: string;
  firstname: string;
  lastname: string;
  department: number;
  supervisor: string | null;
}

export const InternTable = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["allInterns"],
    queryFn: getAllInterns,
  });

  return (
    <main>
      <div className="container mx-auto py-10">
        <h2 className="font-medium text-2xl mb-4">Interns</h2>
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
                supervisor,
              }: Intern) => ({
                id: user_id,
                name: `${firstname} ${lastname}`,
                department: getDepartment(department),
                status: supervisor ? "assigned" : "unassigned",
              })
            )}
          />
        )}
      </div>
    </main>
  );
};
