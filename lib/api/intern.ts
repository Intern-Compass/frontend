import { z } from "zod";

import { axiosInternInstance, axiosSkillsInstance } from "@/lib/axios";
import { CreateTodoFormSchema } from "@/lib/validation/intern";

export const getTasks = async () => {
  const response = await axiosInternInstance.get("/tasks");

  return response.data;
};

export const createTodo = async (
  data: z.infer<typeof CreateTodoFormSchema>
) => {
  const response = await axiosInternInstance.post("/todos", data);

  return response.data;
};

export const toggleTodoCompleted = async (data: { id: string }) => {
  const response = await axiosInternInstance.patch(
    `/todos/${data.id}/complete`
  );

  return response.data;
};

export const getAllSkills = async () => {
  const response = await axiosSkillsInstance.get("/");

  return response.data;
};

export const getUserSkills = async () => {
  const response = await axiosSkillsInstance.get("/get-user-skills");

  return response.data;
};

export const attachNewSkills = async (data: { name: string }[]) => {
  const response = await axiosSkillsInstance.post("/", data);

  return response.data;
};

export const getProjects = async () => {
  const response = await axiosInternInstance.get("/projects");

  return response.data;
};
