import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
  headers: { "Content-type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const refreshToken = async (originalRequest) => {
  try {
    const rt = localStorage.getItem("refreshToken");
    const response = await axios.post(
      "http://localhost:8080/auth/refresh",
      {},
      {
        headers: {
          Authorization: rt,
        },
      },
    );
    if (response.status === 200) {
      console.log("Token refreshed successfully");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);
      originalRequest.headers[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      return axios(originalRequest);
    }
  } catch (error) {
    console.log("Token refresh failed: ", error);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    throw error;
  }
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const rT = localStorage.getItem("refreshToken");
    if (rT && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return await refreshToken(originalRequest);
    } else if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
    return Promise.reject(error);
  },
);

export default api;
