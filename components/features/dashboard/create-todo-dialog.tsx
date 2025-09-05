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
      <form>
        <DialogTrigger asChild>
          <Button variant="link" className="font-medium text-link">
            Create
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Title goes here...</DialogTitle>
            <DialogDescription>
              Description goes here...
            </DialogDescription>
          </DialogHeader>
          <CreateTodoForm />
        </DialogContent>
      </form>
    </Dialog>
  );
};
