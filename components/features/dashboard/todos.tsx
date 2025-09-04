import { Button } from "@/components/ui/button";

export const Todos = () => {
  return (
    <section className="mb-6">
      <header className="mb-4.5 flex justify-between items-center gap-4">
        <h2 className="text-lg leading-7">Daily To-do's</h2>

        <Button variant="link" className="font-medium text-link">Create</Button>
      </header>
      <div className="py-3 px-2 rounded-[0.625rem] border border-border bg-card h-[130px]">
        <p className="text-muted-foreground leading-6">
          Stay organized by writing down tasks, setting priorities, and tracking
          progress with ease.
        </p>
      </div>
    </section>
  );
};
