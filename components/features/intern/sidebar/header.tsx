import Image from "next/image";

import { SidebarHeader } from "@/components/ui/sidebar";

import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { open } = useSidebar();

  return (
    <SidebarHeader className="mb-6 ml-3">
      <Image
        src="/assets/images/logo.svg"
        alt="MTN logo"
        width={91}
        height={45}
        priority
        className={cn("w-[91px] h-[45px]", !open && "hidden")}
      />
    </SidebarHeader>
  );
};
