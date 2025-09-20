import { z } from "zod";

import axiosInstance from "@/lib/axios";
import { CreateTodoFormSchema } from "@/lib/validation/intern";

export const getTasks = async () => {
  const response = await axiosInstance.get("/intern/tasks");

  return response.data;
};

export const getTodos = async () => {
  const response = await axiosInstance.get("/intern/todos");

  return response.data;
};

export const createTodo = async (
  data: z.infer<typeof CreateTodoFormSchema>
) => {
  const response = await axiosInstance.post("/intern/todos", data);

  return response.data;
};

export const toggleTodoCompleted = async (data: { id: string }) => {
  const response = await axiosInstance.patch(
    `/intern/todos/${data.id}/complete`
  );

  return response.data;
};

export const getAllSkills = async () => {
  const response = await axiosInstance.get("/skills");

  return response.data;
};

export const getUserSkills = async () => {
  const response = await axiosInstance.get("/skills/get-user-skills");

  return response.data;
};

export const attachNewSkills = async (data: { name: string }[]) => {
  const response = await axiosInstance.post("/skills", data);

  return response.data;
};

export const getProjects = async () => {
  const response = await axiosInstance.get("/intern/projects");

  return response.data;
};

export const getInternSupervisor = async () => {
  const response = await axiosInstance.get("/intern/supervisor");

  return response.data;
};
