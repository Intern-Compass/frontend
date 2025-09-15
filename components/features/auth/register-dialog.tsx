"use client";

import Image from "next/image";
import Link from "next/link";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";

export const RegisterDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          className="underline underline-offset-1 cursor-pointer leading-5 text-sm text-foreground font-normal"
        >
          Sign up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-130">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2 mb-2">
            Registration
          </DialogTitle>
          <DialogDescription>
            <span className="text-black flex flex-col items-center gap-3 mb-6">
              <User className="size-12.5" />
              <span className="text-lg">Are you an intern or supervisor?</span>
            </span>
            <span className="flex justify-between">
              <Button
                asChild
                className="text-black rounded-[9999px] py-2 px-4 w-full max-w-55"
              >
                <Link href="/intern/signup">Intern</Link>
              </Button>
              <Button
                asChild
                className="text-black rounded-[9999px] py-2 px-4 w-full max-w-55"
              >
                <Link href="/supervisor/signup">Supervisor</Link>
              </Button>
            </span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
