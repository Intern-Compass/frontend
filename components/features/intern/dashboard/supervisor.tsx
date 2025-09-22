"use client";

import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { performMatching } from "@/lib/api/admin";
import { getInternSupervisor } from "@/lib/api/intern";
import { getUserInitials } from "@/lib/utils";

const NoSupervisor = () => {
  return (
    <div className="flex flex-col items-center text-center border border-border bg-card rounded-[0.625rem] p-6">
      <h2 className="text-2xl font-medium leading-8 mb-6">My Supervisor</h2>

      <figure className="flex flex-col gap-8">
        <Image
          src="/assets/icons/hourglass.svg"
          alt="Hourglass icon"
          width={100}
          height={100}
          priority
        />
        <figcaption className="text-xl font-medium leading-7 mb-2">
          Awaiting
        </figcaption>
      </figure>
      <p className="leading-6">You are yet to be assigned a supervisor.</p>
    </div>
  );
};

export const Supervisor = () => {
  const {
    isPending,
    isError,
    data: supervisor,
    error,
  } = useQuery({
    queryKey: ["getInternSupervisor"],
    queryFn: getInternSupervisor,
  });

  //  const response =
  //    useQuery({
  //      queryKey: ["matchIntern"],
  //      queryFn: performMatching,
  //     //  enabled: false,
  //    });

  if (isPending) {
    return <NoSupervisor />;
  }

  return (
    <section>
      {supervisor ? (
        <div className="flex flex-col text-center border border-border bg-card rounded-[0.625rem] p-6">
          <h2 className="text-2xl font-medium leading-8">My Supervisor</h2>

          <Avatar className="w-20 h-20 my-6 self-center">
            <AvatarFallback className="capitalize bg-secondary text-3xl text-secondary-foreground">
              {getUserInitials(supervisor.firstname, supervisor.lastname)}
            </AvatarFallback>
          </Avatar>

          <dl className="space-y-3.5">
            <div className="flex flex-col justify-between items-center gap-4 sm:flex-row">
              <dt className="font-medium text-muted-foreground text-sm leading-5">
                Name:
              </dt>
              <dd className="leading-6">{supervisor.firstname} {supervisor.lastname}</dd>
            </div>
            <div className="flex flex-col justify-between items-center gap-4 sm:flex-row">
              <dt className="font-medium text-muted-foreground text-sm leading-5">
                Email
              </dt>
              <dd className="leading-6 truncate">{supervisor.email}</dd>
            </div>
            <div className="flex flex-col justify-between items-center gap-4 sm:flex-row">
              <dt className="font-medium text-muted-foreground text-sm leading-5">
                Phone no:
              </dt>
              <dd className="leading-6">{supervisor.phone_number}</dd>
            </div>
            <div className="flex flex-col justify-between items-center gap-4 sm:flex-row">
              <dt className="font-medium text-muted-foreground text-sm leading-5">
                Division:
              </dt>
              <dd className="leading-6">IT Department</dd>
            </div>
            <div className="flex flex-col justify-between items-center gap-4 sm:flex-row">
              <dt className="font-medium text-muted-foreground text-sm leading-5">
                Team:
              </dt>
              <dd className="leading-6">UI/UX Design</dd>
            </div>
          </dl>
        </div>
      ) : (
        <NoSupervisor />
      )}
    </section>
  );
};
