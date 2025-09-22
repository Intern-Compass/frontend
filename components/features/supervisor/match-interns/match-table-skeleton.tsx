import { Skeleton } from "@/components/ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const MatchTableSkeleton = ({
  supervisors = 2,
  interns = 3,
}: {
  supervisors?: number;
  interns?: number;
}) => {
  return (
    <section className="my-10">
      {/* Department title */}
      <Skeleton className="h-6 w-48 mb-5" />

      <Accordion type="single" collapsible className="w-full mb-5">
        {Array.from({ length: supervisors }).map((_, i) => (
          <AccordionItem
            key={`skeleton-supervisor-${i}`}
            value={`skeleton-supervisor-${i}`}
          >
            <AccordionTrigger>
              <div className="w-full flex justify-between gap-4">
                {/* Supervisor name */}
                <Skeleton className="h-5 w-40" />

                {/* Supervisor skills */}
                <div className="w-full max-w-100 flex flex-wrap items-center gap-3.5">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <Skeleton key={j} className="h-6 w-16 rounded-full" />
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
                        <Skeleton className="h-4 w-20" />
                      </TableHead>
                      <TableHead className="max-w-[200px] text-left">
                        <Skeleton className="h-4 w-20" />
                      </TableHead>
                      <TableHead className="max-w-[200px] text-left">
                        <Skeleton className="h-4 w-24" />
                      </TableHead>
                      <TableHead className="w-[250px] text-left">
                        <Skeleton className="h-4 w-16" />
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: interns }).map((_, rowIndex) => (
                      <TableRow key={`skeleton-intern-${rowIndex}`}>
                        <TableCell className="max-w-[200px] h-12">
                          <Skeleton className="h-4 w-32" />
                        </TableCell>
                        <TableCell className="max-w-[200px] h-12">
                          <Skeleton className="h-4 w-40" />
                        </TableCell>
                        <TableCell className="max-w-[200px] h-12">
                          <Skeleton className="h-4 w-28" />
                        </TableCell>
                        <TableCell className="w-[250px] h-12">
                          <div className="flex flex-wrap gap-2">
                            {Array.from({ length: 2 }).map((_, k) => (
                              <Skeleton
                                key={k}
                                className="h-6 w-16 rounded-full"
                              />
                            ))}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
