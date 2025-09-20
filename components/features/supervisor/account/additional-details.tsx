"use client";

import { useQuery } from "@tanstack/react-query";

import { AccountForm } from "@/components/features/intern/account/account-form";

import type { Skill } from "@/components/features/intern/account/account-form";
import { useState } from "react";
import { getUserSkills } from "@/lib/api/intern";

export const AdditionalDetails = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    isPending,
    isError,
    data: userSkills,
    error,
  } = useQuery({
    queryKey: ["userSkills"],
    queryFn: getUserSkills
  });

  const showForm = () => {
    setIsEditing(true);
  }

  const hideForm = () => {
    setIsEditing(false);
  }

  return (
    <>
      {isPending || userSkills?.length === 0 || isEditing ? (
        <div className="bg-card rounded-lg p-2 md:p-6">
          <h2 className="text-2xl font-medium mb-6">More Information</h2>

          <AccountForm hideForm={hideForm} />
        </div>
      ) : (
        <div className="bg-card rounded-lg p-2 md:p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-medium">More Information</h2>
            <button
              onClick={showForm}
              className="px-6 py-2 rounded-3xl font-bold text-sm transition bg-primary text-foreground hover:bg-muted hover:text-muted-foreground"
            >
              Edit
            </button>
          </div>

          <div className="w-full">
            <div className="p-4">
              <h3 className="text-muted-foreground text-sm font-medium mb-2">
                Skills
              </h3>
              <div className="text-foreground flex flex-wrap gap-2">
                {userSkills.map((skill: Skill) => (
                  <p
                    key={skill.name}
                    className="bg-muted py-2 px-4 rounded-3xl "
                  >
                    {skill.name}
                  </p>
                ))}
              </div>
            </div>
            {/* <div className="p-4">
              <h3 className="text-muted-foreground text-sm font-medium mb-2">
                Experience
              </h3>
              <div>{form.getValues("experience")}</div>
            </div>
            <div className="p-4">
              <h3 className="text-muted-foreground text-sm font-medium mb-2">
                Interests
              </h3>
              <div>{form.getValues("interests")}</div>
            </div>
            <div className="p-4">
              <h3 className="text-muted-foreground text-sm font-medium mb-2">
                Expectations
              </h3>
              <div>{form.getValues("expectations")}</div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};
