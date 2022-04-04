import axios, { AxiosRequestConfig } from "axios";


// @todo

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {

    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV4YW1wbGUxQGV4YW1wbGUuY29tIiwiaWF0IjoxNjQ5MDkxOTYzLCJleHAiOjE2NDkwOTU1NjN9.ZGHfiUcn_HsB6xuF0_0vVsMorQJrSUSmAmyIFeJbP8Q`;
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
