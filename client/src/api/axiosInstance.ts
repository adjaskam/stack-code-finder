import axios, { AxiosRequestConfig } from "axios";
import { UserSessionStateInterface } from "../state/reducers/types/reducers";
import { NotificationManager } from "react-notifications";

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = {};
    }
    config.baseURL = "http://localhost/api";

    const sessionObject = localStorage.getItem("session");
    if (sessionObject) {
      const parsedSessionObject: UserSessionStateInterface =
        JSON.parse(sessionObject);
      config.headers.Authorization = `Bearer ${parsedSessionObject.jwtToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorData = error.response.data;
    if (Array.isArray(errorData) && errorData.length > 0) {
      errorData.forEach((error) =>
        NotificationManager.error(error.result, "Validation error", 3500)
      );
    } else {
      NotificationManager.error(errorData, error.response.statusText, 3500);
    }
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
  CancelToken: axios.CancelToken,
};
