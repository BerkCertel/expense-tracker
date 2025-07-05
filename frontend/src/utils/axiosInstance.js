import axios from "axios";

import { BASE_URL } from "./apiPaths";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // Set a timeout of 10 seconds
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

// Response interceptor

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        console.error("Unauthorized access - redirecting to login");
        window.location.href = "/login";
      } else if (status === 403) {
        console.error("Forbidden access - you do not have permission");
      } else if (error.code === "ECONNABORTED") {
        console.error("Request timed out. Please try again later.");
      } else if (status >= 500) {
        console.error("Server error - please try again later");
      } else {
        console.error(`Error: ${data.message || "An error occurred"}`);
      }
      return Promise.reject(error);
    }
    // Eğer response yoksa (örn: network error)
    return Promise.reject(error);
  }
);

export default axiosInstance;
