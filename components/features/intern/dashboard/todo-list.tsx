import { TodoItem } from "@/components/features/intern/dashboard/todo-item";

import type { TodoItemProps } from "@/components/features/intern/dashboard/todos";

interface TodoListProps {
    todos: TodoItemProps[]
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul className="grid gap-4.5 grid-cols-[repeat(auto-fit,_minmax(220px,1fr))]">
      {todos.map((todo) => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </ul>
  );
};
