import { z } from "zod";

import axiosInstance from "@/lib/axios";

export const displayMatches = async () => {
  const response = await axiosInstance.get("/matching/display-matches");

  return response.data;
};

export const performMatching = async () => {
  const response = await axiosInstance.post("/matching/perform-matching");

  return response.data;
};

export const getAllInterns = async () => {
  const response = await axiosInstance.get("/admin/interns/all");

  return response.data;
};

export const getAllUnmatchedInterns = async () => {
  const response = await axiosInstance.get("/admin/interns/all/unmatched");

  return response.data;
};

export const getAllSupervisors = async () => {
  const response = await axiosInstance.get("/admin/supervisors/all");

  return response.data;
};

export const assignSupervisor = async (data: {
  supervisor_id: string;
  intern_id: string;
}) => {
  const response = await axiosInstance.post(
    `/matching/assign-supervisor?supervisor_id=${data.supervisor_id}&intern_id=${data.intern_id}`
  );

  return response.data;
};

export const unassignSupervisor = async (data: { intern_id: string }) => {
  const response = await axiosInstance.delete(`/matching/unassign-supervisor?intern_id=${data.intern_id}`);

  return response.data;
};
