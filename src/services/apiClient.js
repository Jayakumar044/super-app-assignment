import axios from "axios";

const apiClient = axios.create({
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API Error:", err.message);
    return Promise.reject(err);
  }
);

export default apiClient;
