"use client";

import { useQuery } from "@tanstack/react-query";

import { CreateTodoDialog } from "@/components/features/intern/dashboard/create-todo-dialog";

import { TodoList } from "@/components/features/intern/dashboard/todo-list";
import axiosInstance from "@/lib/axios";
import { getTodos } from "@/lib/api/intern";

export interface TodoItemProps {
  id: string;
  title: string;
  details: string;
  done: boolean;
}

const todos = [
  {
    id: "1",
    title: "Design Database Schema",
    description: "Create compressive database for application",
    date: "2025-09-10",
  },
  {
    id: "2",
    title: "Design Database Schema",
    description: "Create compressive database for application",
    date: "2025-09-10",
  },
  {
    id: "3",
    title: "Design Database Schema",
    description: "Create compressive database for application",
    date: "2025-09-10",
  },
];

const NoTodos = () => {
  return (
    <div className="py-3 px-2 rounded-[0.625rem] border border-border bg-card h-[130px]">
      <p className="text-muted-foreground leading-6">
        Stay organized by writing down tasks, setting priorities, and tracking
        progress with ease.
      </p>
    </div>
  );
};

export const Todos = () => {
  const {
    isPending,
    isError,
    data: todos,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return (
    <section className="my-6">
      <header className="mb-4.5 flex justify-between items-center gap-4">
        <h2 className="text-lg leading-7">{"Daily To-do's"}</h2>

        <CreateTodoDialog />
      </header>

      {todos && todos.length > 0 ? <TodoList todos={todos} /> : <NoTodos />}
    </section>
  );
};
