import axios from "axios";

const axiosAnsence = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
});

// Add token to every request if exists
axiosAnsence.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axiosAnsence;
