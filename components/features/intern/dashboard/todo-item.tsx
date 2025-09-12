import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import type { TodoItemProps } from "@/components/features/intern/dashboard/todos";

export const TodoItem = ({ id, title, description }: TodoItemProps) => {
  return (
    <li className="flex gap-2 p-5 border border-border bg-card rounded-[0.625rem]">
      <Checkbox id={`todo-${id}`} />
      <Label htmlFor={`todo-${id}`} className="font-normal">
        <div className="space-y-2">
          <h3 className="font-medium leading-5">{title}</h3>
          <p className="text-sm leading-[21px]">{description}</p>
        </div>
      </Label>
    </li>
  );
};
