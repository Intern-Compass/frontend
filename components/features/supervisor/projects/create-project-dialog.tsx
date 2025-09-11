import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateProjectForm } from "@/components/features/supervisor/projects/create-project-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CreateProjectDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-primary py-2 px-4 rounded-[9999px] cursor-pointer shadow-[0_0_0_2px_#ffffff,0_0_0_4px_#F9C600] hover:shadow-none"
        >
          Add Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh]">
          <CreateProjectForm />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
