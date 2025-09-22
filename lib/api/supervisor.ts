import axiosInstance from "@/lib/axios";

export const getMyInterns = async () => {
  const response = await axiosInstance.get("/supervisor/my-interns");

  return response.data;
};