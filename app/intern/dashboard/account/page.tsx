"use client";

import { useQuery, useMutation } from "@tanstack/react-query";

import React from "react";
import CreatableSelect from "react-select/creatable";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { UsersRound } from "lucide-react";

import { ProfileFormSchema } from "@/lib/validation/intern";

import { attachNewSkills, getAllSkills } from "@/lib/api/intern";
import { AccountForm } from "@/components/features/intern/account/account-form";
import { AccountProfile } from "@/components/features/intern/account/account-profile";
import { AdditionalDetails } from "@/components/features/intern/account/additional-details";

export default function AccountPage() {
  const mutation = useMutation({
    mutationFn: attachNewSkills,
  });

  const {
    isPending,
    isError,
    data: skills,
    error,
  } = useQuery({
    queryKey: ["skills"],
    queryFn: getAllSkills,
  });

  return (
    <div className="flex-1 bg-white p-4 md:p-8">
      <AccountProfile />
      <AdditionalDetails />
    </div>
  );
}
1;
