"use client";

import { Header as SidebarHeader } from "@/components/features/supervisor/sidebar/header";
import { Main as SidebarContent } from "@/components/features/supervisor/sidebar/main";
import { Footer as SidebarFooter } from "@/components/features/supervisor/sidebar/footer";

import { Sidebar, SidebarRail } from "@/components/ui/sidebar";

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="py-3">
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
