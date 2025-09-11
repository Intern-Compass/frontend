import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateTodoForm } from "./create-todo-form";

export const CreateTodoDialog = () => {
  return (
    <Dialog>
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
        <CreateTodoForm />
      </DialogContent>
    </Dialog>
  );
};
