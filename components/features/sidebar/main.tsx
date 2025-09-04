"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  UsersRound,
  Clock1,
  FileCheck,
  Users,
} from "lucide-react";

import {
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarContent,
} from "@/components/ui/sidebar";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import path from "path";

interface Item {
  title: string;
  url: string;
  icon: LucideIcon;
}

const items: Item[] = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Account",
    url: "/dashboard/account",
    icon: UsersRound,
  },
  {
    title: "Milestones",
    url: "/dashboard/milestones",
    icon: Clock1,
  },
  {
    title: "Projects",
    url: "/dashboard/projects",
    icon: FileCheck,
  },
  {
    title: "Community",
    url: "/dashboard/community",
    icon: Users,
  },
];

export const Main = () => {
  const pathname = usePathname();

  return (
    <SidebarContent>
      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className={cn(
              "w-94/100",
              pathname === item.url &&
                "relative before:content-[''] before:absolute before:w-1 before:h-4 before:bg-primary before:left-0.5 before:rounded-tr-[6px] before:rounded-br-[6px] before:-translate-1/2 before:top-1/2"
            )}
          >
            <SidebarMenuButton
              asChild
              isActive={pathname === item.url}
              className="shrink-0 leading-5 py-5 px-2 ml-2.5 data-[active=true]:bg-sidebar-active data-[active=true]:rounded-[9999px] data-[active=true]:font-medium hover:rounded-[9999px]"
            >
              <Link href={item.url} className="flex items-center gap-3">
                <item.icon className="text-sidebar-foreground-70" />
                <span className="text-foreground">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarContent>
  );
};
