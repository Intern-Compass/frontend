"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock3, Reply, ThumbsUp } from "lucide-react";
import { getUserInitials } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "@/lib/api/auth";

export const Community = () => {
  const {
    isPending,
    isError,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserDetails,
  });

  return (
    <section>
      <header className="mb-4.5 flex justify-between items-center gap-4">
        <h2 className="text-lg leading-7">Community</h2>

        <Button asChild variant="link" className="font-medium text-link">
          <Link href="/intern/dashboard/community">View all</Link>
        </Button>
      </header>

      <article className="border border-border rounded-[0.625rem] py-4.5 px-3">
        <div className="flex gap-x-2.5">
          <div className="flex flex-col gap-2">
            {user ? (
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarFallback className="capitalize bg-secondary text-secondary-foreground leading-6">
                  {getUserInitials(user.firstname, user.lastname)}
                </AvatarFallback>
              </Avatar>
            ) : (
              <Skeleton className="h-10 w-10 rounded-full" />
            )}
            <div>
              <div className="gap-y-1 mb-7.75">
                <div className="flex flex-col items-center gap-7.5">
                  <h3 className="text-xl leading-6">Opemipo Ashiru</h3>
                  <div className="flex items-center gap-1.25">
                    <Clock3 className="size-4 text-black/38" />
                    <span className="text-black/35 text-xs leading-6">
                      1 day ago
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Supervisor, Information Technology
                </p>
              </div>
              <div>
                <h4 className="text-xl font-medium leading-7 mb-1">
                  Accessibility in Design
                </h4>
                <div className="leading-6">
                  <p>
                    Attached below is a link to an article on accessibility in
                    design, this will help you gain knowledge in creating
                    user-centric designs. Please read up and let me know your
                    thoughts.
                    {/* Link:{" "}
                    <a href="#" className="truncate w-10">
                      https://medium.incluslivityforall.com
                    </a> */}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <Button variant="ghost">
                  <ThumbsUp className="text-chart-1" />
                  <span>5</span>
                </Button>
                <Button variant="ghost" className="flex items-center gap-1.25">
                  <Reply className="text-muted-foreground/50" />
                  <span className="text-xs text-muted-foreground">1 reply</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};
