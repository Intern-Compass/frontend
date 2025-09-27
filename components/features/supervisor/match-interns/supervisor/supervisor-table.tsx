"use client";

import { columns, type Supervisor } from "@/components/features/supervisor/match-interns/supervisor/columns";

import { DataTable } from "@/components/features/supervisor/match-interns/supervisor/data-table";
import { getAllSupervisors } from "@/lib/api/admin";
import { useQuery } from "@tanstack/react-query";
import { DataTableSkeleton } from "../data-table-skeleton";
import { getDepartment } from "@/lib/utils";

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
                supervisor_id,
                firstname,
                lastname,
                department,
                intern_count,
              }: Supervisor) => ({
                user_id,
                supervisor_id,
                firstname,
                lastname,
                department,
                intern_count,
              })
            )}
          />
        )}
      </div>
    </main>
  );
};
