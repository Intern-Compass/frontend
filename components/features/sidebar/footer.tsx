"use client";

import Link from "next/link";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export const Footer = () => {
  const { isMobile } = useSidebar();

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="py-5 px-2 hover:rounded-[9999px]"
          >
            <Link href="/login" className="flex items-center gap-3">
              <LogOut className="text-sidebar-foreground-70" />
              <span className="text-foreground">Log out</span>
            </Link>
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
