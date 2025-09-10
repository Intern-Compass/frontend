import { LayoutDashboard } from "lucide-react";
import { CalendarSection as Calendar } from "@/components/features/intern/dashboard/calendar";
import { Community } from "@/components/features/intern/dashboard/community";
import { Projects } from "@/components/features/intern/dashboard/projects";
import { Supervisor } from "@/components/features/intern/dashboard/supervisor";
import { Todos } from "@/components/features/intern/dashboard/todos";

export default function DashboardPage() {
  return (
    <div className="py-16 px-8 mx-auto grid justify-center gap-6 lg:grid-cols-[minmax(375px,696px)_275px] xl:grid-cols-[minmax(375px,696px)_324px]">
      <header className="col-span-full">
        <h1 className="font-medium text-2xl flex items-center gap-x-3 mb-8">
          <LayoutDashboard />
          <span>Dashboard</span>
        </h1>
      </header>
      <div>
        <div className="space-y-1 mb-6">
          <p className="text-xl font-medium">Welcome, Oluwafikunayomi.</p>
          <p className="leading-6">What are you doing today?</p>
        </div>
        <Projects />
        <Todos />
        <Community />
      </div>
      <div className="space-y-5.75">
        <Supervisor />
        <Calendar />
      </div>
    </div>
  );
}
