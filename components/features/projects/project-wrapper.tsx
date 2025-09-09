import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProjectList } from "./project-list";

export const ProjectWrapper = () => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-5 rounded-[9999px] p-0">
        <TabsTrigger
          value="all"
          className="text-sm leading-5 text-muted-foreground py-1.5 px-3 rounded-[9999px] cursor-pointer data-[state=active]:leading-6 data-[state=active]:bg-foreground data-[state=active]:text-white"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="inProgress"
          className="text-sm leading-5 text-muted-foreground py-1.5 px-3 rounded-[9999px] cursor-pointer data-[state=active]:leading-6 data-[state=active]:bg-foreground data-[state=active]:text-white"
        >
          In Progress
        </TabsTrigger>
        <TabsTrigger
          value="completed"
          className="text-sm leading-5 text-muted-foreground py-1.5 px-3 rounded-[9999px] cursor-pointer data-[state=active]:leading-6 data-[state=active]:bg-foreground data-[state=active]:text-white"
        >
          Completed
        </TabsTrigger>
        <TabsTrigger
          value="overdue"
          className="text-sm leading-5 text-muted-foreground py-1.5 px-3 rounded-[9999px] cursor-pointer data-[state=active]:leading-6 data-[state=active]:bg-foreground data-[state=active]:text-white"
        >
          Overdue
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <ProjectList tab="all" />
      </TabsContent>
      <TabsContent value="inProgress">
        <ProjectList tab="inProgress" />
      </TabsContent>
      <TabsContent value="completed">
        <ProjectList tab="completed" />
      </TabsContent>
      <TabsContent value="overdue">
        <ProjectList tab="overdue" />
      </TabsContent>
    </Tabs>
  );
};
