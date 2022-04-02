import axios, { AxiosRequestConfig } from "axios";

const TEMP_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImV4YW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE2NDg5MDA3MzAsImV4cCI6MTY0ODkwNDMzMH0.2tGmcDNVsHKMP4_uE2vff_j88BpuNQBhqdM9SQUvmOw";

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${TEMP_TOKEN}`;
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
  CancelToken: axios.CancelToken
};
