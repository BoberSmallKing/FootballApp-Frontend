import axios from "axios";

const isDevelopment = import.meta.env.MODE === "development";
const myBaseUrl = isDevelopment
  ? import.meta.env.VITE_API_BASE_URL_LOCAL
  : import.meta.env.VITE_API_BASE_URL_DEPLOY;
let refresh = false;

const AxiosInstance = axios.create({
  baseURL: myBaseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !refresh) {
      refresh = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (refreshToken) {
          const response = await AxiosInstance.post("/token/refresh/", {
            refresh: refreshToken,
          });

          if (response.status === 200) {
            const newAccessToken = response.data.access;
            AxiosInstance.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            localStorage.setItem("access_token", newAccessToken);

            if (response.data.refresh) {
              localStorage.setItem("refresh_token", response.data.refresh);
            }

            error.config.headers.Authorization = `Bearer ${newAccessToken}`;
            refresh = false;
            return AxiosInstance(error.config);
          }
        }
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        console.log("Token refresh failed:", refreshError);
      }
    }

    refresh = false;
    return Promise.reject(error);
  }
);

export default AxiosInstance;
