import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token && !config.url?.includes("/auth/local")) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  console.log("REQUEST:", config.url);
  console.log("DATA:", config.data);

  return config;
});

API.interceptors.response.use(
  (res) => {
    console.log("RESPONSE:", res.data);
    return res;
  },
  (error) => {
    console.error("AXIOS ERROR:", error);

    if (error.response) {
      console.error("STATUS:", error.response.status);
      console.error("DATA:", error.response.data);
    } else if (error.request) {
      console.error("NO RESPONSE:", error.request);
    } else {
      console.error("MESSAGE:", error.message);
    }

    return Promise.reject(error);
  }
);

export default API;