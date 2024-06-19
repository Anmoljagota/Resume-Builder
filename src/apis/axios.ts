import Axios from "axios";
export const baseApi = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

baseApi.interceptors.request.use(
  (config) => {
    // get token from query and pass it to the header authorization
    if (typeof window !== "undefined") {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const token = params.get("token");
      if (token) {
        config.headers.Authorization = `${token}`;
        const resumeId = params.get("resumeId");
        // add resumeId to query
        if (resumeId) {
          config.params = {
            ...config.params,
            resumeId,
          };
        }
      }
    }

    return config;
  },
  (error) => {
    // If there's an error, reject the Promise with the error
    return Promise.reject(error);
  }
);
