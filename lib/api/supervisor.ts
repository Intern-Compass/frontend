import { axiosSupervisorInstance } from "@/lib/axios";

export const matchInternToSupervisor = async () => {
  const response = await axiosSupervisorInstance.post("/perform-matching");

  return response.data;
};

export const getMyInterns = async () => {
  const response = await axiosSupervisorInstance.get("/my-interns");
  
  return response.data;
}