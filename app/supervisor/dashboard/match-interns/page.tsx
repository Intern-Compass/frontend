// import { MatchTable } from "@/components/features/supervisor/match-interns/match-table";

// export default function MatchInternsPage() {
//     return <MatchTable />;
// }

import {
  columns as internColumns,
  Intern,
} from "@/components/features/supervisor/match-interns/intern/columns";
import { MatchTable } from "@/components/features/supervisor/match-interns/match-table";
import { InternTable } from "@/components/features/supervisor/match-interns/intern/intern-table";
import { SupervisorTable } from "@/components/features/supervisor/match-interns/supervisor/supervisor-table";



export default async function MatchInternsPage() {
  return (
    <div className="p-8 max-w-240 mx-auto">
      <header className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Match Interns
          </h1>
        </div>
        <p className="text-gray-600">
          Review generated matches and approve them to proceed.
        </p>
      </header>
      <main>
        <InternTable />
        <SupervisorTable />

        <MatchTable />
      </main>
    </div>
  );
}
