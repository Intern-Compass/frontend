import axios from "axios";

const API_ROOT = "https://intern-compass-1.onrender.com";

// ---- Single Axios instance ----
const api = axios.create({
  baseURL: API_ROOT,
  withCredentials: true, // send HttpOnly refresh token automatically
  headers: { "Content-Type": "application/json" },
});

// ---- Shared refresh state ----
let refreshPromise: Promise<string> | null = null;
let refreshSubscribers: ((token: string) => void)[] = [];

// ---- Helper: set token in Axios defaults ----
function setAuthHeader(token: string) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// ---- Notify queued requests that token is refreshed ----
function onTokenRefreshed(token: string) {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
}

// ---- Notify queued requests that refresh failed ----
function onTokenRefreshFailed() {
  refreshSubscribers.forEach((callback) => callback("")); // empty string = reject
  refreshSubscribers = [];
}

// ---- Subscribe a request to wait for token refresh ----
function subscribeTokenRefresh(cb: (token: string) => void) {
  refreshSubscribers.push(cb);
}

// ---- Response interceptor for 401 ----
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only handle 401 once per request
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If no refresh in progress, start it immediately
      if (!refreshPromise) {
        refreshPromise = new Promise((resolve, reject) => {
          axios
            .post("/auth/refresh", {}, { baseURL: API_ROOT, withCredentials: true })
            .then((res) => {
              const token = res.data.access_token;
              setAuthHeader(token);
              onTokenRefreshed(token);
              resolve(token);
            })
            .catch((err) => {
              onTokenRefreshFailed(err);
              if (err.response?.status === 401 && typeof window !== "undefined") {
                window.location.href = "/login";
              }
              reject(err);
            })
            .finally(() => {
              refreshPromise = null;
            });
        });
      }

      // Queue the original request to wait for refresh
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((token: string) => {
          if (!token) {
            reject(error);
            return;
          }
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });

        if (refreshPromise) refreshPromise.catch(reject);
      });
    }

    return Promise.reject(error);
  }
);

export default api;


// ---- Usage helper functions ----
// export const axiosInstance = (path: string, config?: any) =>
//   api({ url: `/auth/${path}`, ...config });
// export const axiosInstance = (path: string, config?: any) =>
//   api({ url: `/intern/${path}`, ...config });
// export const axiosInstance = (path: string, config?: any) =>
//   api({ url: `/supervisor/${path}`, ...config });
// export const axiosInstance = (path: string, config?: any) =>
//   api({ url: `/skills/${path}`, ...config });

// export const axiosInstance = axios.create({
//   baseURL: "https://intern-compass-1.onrender.com/auth",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export const axiosInstance = axios.create({
//   baseURL: "https://intern-compass-1.onrender.com/intern",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       if (typeof window !== "undefined") {
//         window.location.href = "/login";
//       }

//       return Promise.reject(error);
//     }
//   }
// );

// export const axiosInstance = axios.create({
//   baseURL: "https://intern-compass-1.onrender.com/supervisor",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       if (typeof window !== "undefined") {
//         window.location.href = "/login";
//       }

//       return Promise.reject(error);
//     }
//   }
// );

// export const axiosInstance = axios.create({
//   baseURL: "https://intern-compass-1.onrender.com/skills",
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
