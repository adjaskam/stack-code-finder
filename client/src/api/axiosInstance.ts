import axios, { AxiosRequestConfig } from "axios";
import { State } from "../state";
import { useSelector } from "react-redux";


// @todo

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const session = useSelector((state: State) => state.userSession);

    if (!config.headers) {
      config.headers = {};
    }
    console.log(session.jwtToken)
    config.headers.Authorization = `Bearer ${session.jwtToken}`;
    config.baseURL = "http://localhost/api";

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
