"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateTodoForm } from "./create-todo-form";
import { useState } from "react";

export const CreateTodoDialog = () => {
  const [open, setOpen] = useState(false);

  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="font-medium text-link">
          Create
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center font-normal mb-4">
            Create To-Do List
          </DialogTitle>
        </DialogHeader>
        <CreateTodoForm closeDialog={closeDialog} />
      </DialogContent>
    </Dialog>
  );
};
