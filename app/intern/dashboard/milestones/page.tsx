import {
  columns,
  type Project,
} from "@/components/features/intern/milestones/columns";
import projects from "@/components/features/intern/milestones/data.json";
import { DataTable } from "@/components/features/intern/milestones/data-table";

// async function getData(): Promise<Project[]> {
//   // Fetch data from your API here.
//   // return projects;
// }


export default async function MilestonesPage() {
  const data: Project[] = projects;


  return (
    <div className="my-8 mx-auto w-95/100">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
