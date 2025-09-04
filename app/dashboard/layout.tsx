import { SidebarProvider } from "@/components/ui/sidebar";

import { DashboardSidebar } from "@/components/features/dashboard-sidebar";

import { DashboardHeader } from "@/components/features/dashboard-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />

      <div className="flex flex-col w-full">
        <DashboardHeader />

        <main className="w-full">{children}</main>
      </div>
    </SidebarProvider>
  );
}
