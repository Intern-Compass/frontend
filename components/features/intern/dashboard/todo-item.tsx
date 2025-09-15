"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import type { TodoItemProps } from "@/components/features/intern/dashboard/todos";
import { toggleTodoCompleted } from "@/lib/api/intern";

export const TodoItem = ({ id, title, details, done }: TodoItemProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: toggleTodoCompleted,
  });

  return (
    <li className="flex gap-2 p-5 border border-border bg-card rounded-[0.625rem]">
      <Checkbox
        id={`todo-${id}`}
        checked={done}
        onCheckedChange={() => {
          mutation.mutate({ id });

          queryClient.invalidateQueries({ queryKey: ["todos"] });
        }}
      />
      <Label htmlFor={`todo-${id}`} className="font-normal">
        <div className="space-y-2">
          <h3 className="font-medium leading-5">{title}</h3>
          <p className="text-sm leading-[21px]">{details}</p>
        </div>
      </Label>
    </li>
  );
};
