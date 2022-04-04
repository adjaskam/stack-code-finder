import axios, { AxiosRequestConfig } from "axios";
import { UserSessionStateInterface } from "../state/reducers/reducers";

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

        // add expiration validation based on parsedSessionObject.exp
      config.headers.Authorization = `Bearer ${parsedSessionObject.jwtToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
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
