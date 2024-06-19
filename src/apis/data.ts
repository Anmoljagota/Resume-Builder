import { baseApi } from "./axios";

export const getJobDescriptions = () => {
  return baseApi.get("/data/jobDescription");
};

export const getProjectHighlights = (resumeId: string, projectId: string) => {
  return baseApi.get(`/data/generateProjectHighlights?resumeId=${resumeId}&projectId=${projectId}`);
};
export const getServerTime = () => {
  return baseApi.get(`/data/serverTime`);
};
export const getSoftTechSkills = () => {
  return baseApi.get(`/data/softTechSkills`);
};
