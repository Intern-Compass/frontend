import axiosInstance from "@/lib/axios";

export const displayMatches = async () => {
  const response = await axiosInstance.get("/supervisor/display-matches");

  return response.data;
};

export const matchInternToSupervisor = async () => {
  const response = await axiosInstance.post("/supervisor/perform-matching");

  return response.data;
};

export const getMyInterns = async () => {
  const response = await axiosInstance.get("/supervisor/my-interns");

  return response.data;
};