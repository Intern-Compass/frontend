import { SidebarProvider } from "@/components/ui/sidebar";

import { DashboardSidebar } from "@/components/features/intern/dashboard-sidebar";

import { DashboardHeader } from "@/components/features/intern/dashboard-header";

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
