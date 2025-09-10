import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CreateTodoForm } from "./create-todo-form";

export const CreateTodoDialog = () => {
  return (
    <Dialog>
      <form className="space-y-4">
        <DialogTrigger asChild>
          <Button variant="link" className="font-medium text-link">
            Create
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center font-normal mb-4">Create To-Do List</DialogTitle>
            <DialogDescription>
              
            </DialogDescription>
          </DialogHeader>
          <CreateTodoForm />
        </DialogContent>
      </form>
    </Dialog>
  );
};
