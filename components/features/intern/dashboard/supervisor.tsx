"use client";

import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { axiosInternInstance } from "@/lib/axios";
import { matchInternToSupervisor } from "@/lib/api/supervisor";

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
    queryKey: ["get-intern-supervisor"],
    queryFn: async () => {
      const response = await axiosInternInstance.get("/supervisor");

      return response.data;
    },
  });

  //  const response =
  //    useQuery({
  //      queryKey: ["matchIntern"],
  //      queryFn: matchInternToSupervisor,
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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="text-base-color bg-secondary">
              OD
            </AvatarFallback>
          </Avatar>

          <dl className="space-y-3.5">
            <div className="flex flex-col justify-between items-center gap-4 sm:flex-row">
              <dt className="font-medium text-muted-foreground text-sm leading-5">
                Name:
              </dt>
              <dd className="leading-6">{supervisor.name}</dd>
            </div>
            <div className="flex flex-col justify-between items-center gap-4 sm:flex-row">
              <dt className="font-medium text-muted-foreground text-sm leading-5">
                Email
              </dt>
              <dd className="leading-6">{supervisor.email}</dd>
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
