import axios from "axios";

export const axiosAuthInstance = axios.create({
  baseURL: "https://intern-compass-1.onrender.com/auth",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosInternInstance = axios.create({
  baseURL: "https://intern-compass-1.onrender.com/intern",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInternInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        if (window.location.pathname.startsWith("/intern")) {
          window.location.href = "/intern/login";
        } else if (window.location.pathname.startsWith("/supervisor")) {
          window.location.href = "/supervisor/login";
        } else {
          window.location.href = "/";
        }
      }

      return Promise.reject(error);
    }
  }
);

export const axiosSupervisorInstance = axios.create({
  baseURL: "https://intern-compass-1.onrender.com/supervisor",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosSupervisorInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      return Promise.reject(error);
    }
  }
);

export const axiosSkillsInstance = axios.create({
  baseURL: "https://intern-compass-1.onrender.com/skills",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
