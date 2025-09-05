"use client";

import Image from "next/image";

import { useState } from "react";

import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
  startOfDay,
  endOfDay,
} from "date-fns";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

import { Ban, Calendar, CircleCheckBig, CircleDot, Clock1 } from "lucide-react";

import type { Project, Status } from "./columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

type ProjectCount = {
  [K in Status]: number;
};

type DateFilterValue = "today" | "week" | "month" | "year";

type DateRangeType = {
  [K in DateFilterValue]: [Date, Date];
};

export function DataTable<TData extends { status: Status }, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const projectCount: ProjectCount = {
    inProgress: 0,
    overdue: 0,
    completed: 0,
  };

  for (const { status } of data) {
    projectCount[status as Status] += 1;
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
    },
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
    enableSorting: true,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  console.log(table.getColumn("status"));
  const column = table.getColumn("date");
  const dateFilterValue = column?.getFilterValue() as DateFilterValue;

  const today = new Date();

  const dateRangeType: DateRangeType = {
    today: [startOfDay(today), endOfDay(today)],
    week: [startOfWeek(today), endOfWeek(today)],
    month: [startOfMonth(today), endOfMonth(today)],
    year: [startOfYear(today), endOfYear(today)],
  };

  return (
    <>
      <header>
        <div className="bg-card rounded p-4">
          <div className="flex items-center gap-1.5 mb-5 ml-4">
            <Clock1 className="w-6 h-6" />
            <h1 className="leading-8 text-2xl font-medium">Milestone</h1>
          </div>
          <div className="mb-8 flex items-center gap-2 text-xs rounded-md border border-dashed border-border py-2 px-3 w-fit">
            <Calendar className="size-4" />
            <span className="leading-5">Date:</span>
            {dateFilterValue && (
              <span className="text-secondary-foreground bg-muted py-0.5 px-1 rounded-sm leading-4">
                {dateFilterValue === "today"
                  ? `${format(
                      dateRangeType[dateFilterValue][0],
                      "do MMMM yyyy"
                    )}`
                  : `${format(
                      dateRangeType[dateFilterValue][0],
                      "do MMMM yyyy"
                    )} - ${format(
                      dateRangeType[dateFilterValue][1],
                      "do MMMM yyyy"
                    )}`}
              </span>
            )}
          </div>
          <div className="grid gap-6 max-w-[1050px] md:grid-cols-[repeat(auto-fit,_minmax(280px,1fr))]">
            <div className="bg-white p-6 rounded-xl space-y-6 border border-muted-foreground-50">
              <div className="flex items-center gap-6">
                <CircleCheckBig className="w-10 h-10 text-[rgb(173,138,0)] bg-[rgb(255,247,217)] p-2.5 rounded-full" />
                <span className="font-medium leading-6">Completed</span>
              </div>
              <span className="font-medium text-4xl leading-10">
                {projectCount["completed"]}
              </span>
            </div>
            <div className="bg-white p-6 rounded-xl space-y-6 border border-muted-foreground-50">
              <div className="flex items-center gap-6">
                <CircleDot className="w-10 h-10 text-[rgb(173,138,0)] bg-[rgb(255,247,217)] p-2.5 rounded-full" />
                <span className="font-medium leading-6">In Progress</span>
              </div>
              <span className="font-medium text-4xl leading-10">
                {projectCount["inProgress"]}
              </span>
            </div>
            <div className="bg-white p-6 rounded-xl space-y-6 border border-muted-foreground-50">
              <div className="flex items-center gap-6">
                <Ban className="w-10 h-10 text-[rgb(173,138,0)] bg-[rgb(255,247,217)] p-2.5 rounded-full" />
                <span className="font-medium leading-6">Overdue</span>
              </div>
              <span className="font-medium text-4xl leading-10">
                {projectCount["overdue"]}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* <div className="max-w-246"> */}
        {data.length === 0 ? (
          <div className="rounded-2xl">
            <figure>
              <div className="relative max-w-[930px] min-h-[300px]">
                <Image
                  src="/assets/images/no-projects-illustration.png"
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
              <figcaption className="max-w-[640px] mx-auto text-center">
                <h2 className="font-medium text-xl leading-7 mb-0.5">
                  You {"haven't"} started any projects yet
                </h2>
                <p className="leading-6 text-muted-foreground">
                  Get assigned projects and assignments by your supervisor to
                  start your milestone achievements.
                </p>
              </figcaption>
            </figure>
          </div>
        ) : (
          <div className="container mx-auto py-10">
            <DataTableToolbar table={table} />

            <div className="overflow-hidden rounded-md border mb-4">
              <Table>
                <TableHeader className="bg-muted">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className="text-muted-foreground"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="px-2">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            <DataTablePagination table={table} />
          </div>
        )}
      </main>
    </>
  );
}
