// import { MatchTable } from "@/components/features/supervisor/match-interns/match-table";

// export default function MatchInternsPage() {
//     return <MatchTable />;
// }

import {
  columns,
  Match,
} from "@/components/features/supervisor/match-interns/columns";
import { DataTable } from "@/components/features/supervisor/match-interns/data-table";
import { MatchTable } from "@/components/features/supervisor/match-interns/match-table";

const data = [
  {
    id: "1",
    intern: "Alice Smith",
    supervisor: "John Doe",
    department: "Information Technology",
  },
  {
    id: "2",
    intern: "Bob Johnson",
    supervisor: "John Doe",
    department: "Information Technology",
  },
  {
    id: "3",
    intern: "Charlie Brown",
    supervisor: "John Doe",
    department: "Information Technology",
  },
  {
    id: "4",
    intern: "Diana Williams",
    supervisor: "Emily Clark",
    department: "Human Resources",
  },
  {
    id: "5",
    intern: "Ethan Taylor",
    supervisor: "Emily Clark",
    department: "Human Resources",
  },
  {
    id: "6",
    intern: "Sophia Martinez",
    supervisor: "Michael Lee",
    department: "Marketing",
  },
  {
    id: "7",
    intern: "Liam Garcia",
    supervisor: "Michael Lee",
    department: "Marketing",
  },
  {
    id: "8",
    intern: "Olivia Hernandez",
    supervisor: "Michael Lee",
    department: "Marketing",
  },
];

async function getData(): Promise<Match[]> {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      intern: "Ayobami",
      supervisor: "Bukola",
      department: "Information Technology",
    },
    {
      id: "2",
      intern: "Fikun",
      supervisor: "Gideo",
      department: "Information Technology",
    },
    {
      id: "3",
      intern: "Damola",
      supervisor: "Damilare",
      department: "Information Technology",
    },
  ];
}

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
        <div className="container mx-auto py-10">
          <h2 className="font-medium text-xl mb-4">Overview</h2>
          <DataTable columns={columns} data={data} />
        </div>

        <MatchTable />
      </main>
    </div>
  );
}
