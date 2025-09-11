"use client";

import { usePathname } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Separator } from "@/components/ui/separator";

import { Bell, CircleQuestionMark, Moon } from "lucide-react";

const pathPrefixes: Record<string, string> = {
    "/intern/dashboard/account": "Account",
    "/intern/dashboard/milestones": "Milestones",
    "/intern/dashboard/projects": "Projects",
    "/intern/dashboard/community": "Community",
    // Order is important here: dashboard has to be last
    "/intern/dashboard": "Dashboard",
};

const getPageTitle = (pathname: string) => {
  for (const prefix in pathPrefixes) {
    if (pathname.startsWith(prefix)) {
      return pathPrefixes[prefix];
    }
  }
};

export const DashboardHeader = () => {
  const pathname = usePathname();

  return (
    <header className="flex justify-between border-b border-border py-2 px-3 items-center gap-4">
      <div className="flex h-4 items-center space-x-2 text-sm">
        <SidebarTrigger className="p-4 cursor-pointer" />
        <Separator orientation="vertical" />
        <span className="leading-5 text-sm">{getPageTitle(pathname)}</span>
      </div>

      <div className="flex items-center gap-6">
        <CircleQuestionMark className="w-5 h-5" />
        <Bell className="w-5 h-5" />
        <Moon className="w-5 h-5" />

        <Avatar className="h-10 w-10 rounded-full">
          <AvatarImage src="htt://github.com/shadcn.png" />
          <AvatarFallback className="bg-secondary text-secondary-foreground leading-6">
            OD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};
