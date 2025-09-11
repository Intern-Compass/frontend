import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Trash2, TriangleAlert } from "lucide-react";

export const RemoveProjectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="cursor-pointer text-xs w-fit">
          <Trash2 /> Remove
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-warning-lighter">
        <DialogHeader className="mb-2">
          <DialogTitle className="flex items-center gap-2">
            <TriangleAlert className="shrink-0 size-5 text-warning-base" />
            <span className="font-medium text-sm leading-5">
              Are you sure you want to remove this project?
            </span>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className="ml-auto flex-row gap-4">
          <DialogClose>Cancel</DialogClose>
          <Button className="rounded-[9999px] text-black">Remove</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
