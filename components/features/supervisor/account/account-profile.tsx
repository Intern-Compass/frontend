"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getUserDetails } from "@/lib/api/auth";
import axiosInstance from "@/lib/axios";
import { getDepartment } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { differenceInMonths } from "date-fns";

import { UsersRound } from "lucide-react";

export const AccountProfile = () => {
  const {
    isPending,
    isError,
    data: supervisor,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserDetails,
  });

  return (
    <div className="bg-card rounded-lg p-2 md:p-6">
      <div className="mb-4 flex items-center">
        <UsersRound />
        <h2 className="text-2xl font-medium ml-2">Profile</h2>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">Name</h3>
          {supervisor ? (
            <p className="text-muted-foreground text-sm truncate">
              {supervisor.firstname} {supervisor.lastname}
            </p>
          ) : (
            <Skeleton className="h-5 w-30" />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">Email</h3>
          {supervisor ? (
            <p className="text-muted-foreground text-sm truncate">
              {supervisor.email}
            </p>
          ) : (
            <Skeleton className="h-5 w-30" />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">Phone no</h3>
          {supervisor ? (
            <p className="text-muted-foreground text-sm truncate">
              {supervisor.phone_number}
            </p>
          ) : (
            <Skeleton className="h-5 w-30" />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">Position</h3>
          {supervisor ? (
            <p className="text-muted-foreground text-sm truncate">
              {supervisor.position}
            </p>
          ) : (
            <Skeleton className="h-5 w-30" />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">Department</h3>
          {supervisor ? (
            <p className="text-muted-foreground text-sm truncate">
              {getDepartment(supervisor.department)}
            </p>
          ) : (
            <Skeleton className="h-5 w-30" />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-foreground font-medium mb-2">Work location</h3>
          {supervisor ? (
            <p className="text-muted-foreground text-sm truncate">
              {supervisor.work_location}
            </p>
          ) : (
            <Skeleton className="h-5 w-30" />
          )}
        </div>
      </div>
    </div>
  );
};
