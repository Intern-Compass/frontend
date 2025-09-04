"use client";

import { Header as SidebarHeader } from "@/components/features/sidebar/header";
import { Main as SidebarContent } from "@/components/features/sidebar/main";
import { Footer as SidebarFooter } from "@/components/features/sidebar/footer";

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
