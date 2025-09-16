"use client";

import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const Footer = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = () => {
    queryClient.clear();

    router.push("/login");
  };

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={logout}
            className="py-5 px-2 hover:rounded-[9999px] flex items-center gap-3"
          >
            <LogOut className="text-sidebar-foreground-70" />
            <span className="text-foreground">Log out</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <div className="flex items-center gap-4">
        <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage src="htt://github.com/shadcn.png" />
          <AvatarFallback className="bg-info-light text-info-dark">
            OD
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight text-sidebar-foreground">
          <span className="truncate font-medium text-sm leading-5">
            Oluwafikunayomi
          </span>
          <span className="truncate text-xs leading-4">Intern</span>
        </div>
      </div>
    </SidebarFooter>
  );
};
