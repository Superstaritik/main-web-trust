// src/api/axiosClient.js
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const axiosClient = axios.create({
  baseURL,
  withCredentials: true,
});

// ------------------------
// EXPORT THIS FUNCTION ✔✔
// ------------------------
export function setAuthToken(token) {
  if (token) {
    localStorage.setItem("token", token);
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("token");
    delete axiosClient.defaults.headers.common["Authorization"];
  }
}

// page reload hone par bhi token set ho jaye
const existingToken = localStorage.getItem("token");
if (existingToken) {
  axiosClient.defaults.headers.common["Authorization"] = `Bearer ${existingToken}`;
}

export default axiosClient;
