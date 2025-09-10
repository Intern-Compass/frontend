"use client";

import * as React from "react";

import { Calendar } from "@/components/ui/calendar";

export const CalendarSection = () => {
  const dateToday = new Date();

  const year = dateToday.getFullYear();
  const month = dateToday.getMonth();
  const day = dateToday.getDate();

  const [date, setDate] = React.useState<Date | undefined>(
    new Date(year, month, day)
  );

  return (
    <section>
      <h2 className="font-medium text-xl leading-7.5 mb-4.5">Calendar</h2>
      {/* <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-lg border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12.625)]"
        buttonVariant="ghost"
      /> */}

      <Calendar
        mode="single"
        defaultMonth={date}
        selected={date}
        onSelect={setDate}
        disabled={{
          before: new Date(year, month, day),
        }}
        className="rounded-lg border border-border p-2 shadow-sm w-full"
      />
    </section>
  );
};
