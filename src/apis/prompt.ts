import { PromptInterface } from "@/interfaces/prompt";
import { baseApi } from "./axios";

export const executeOptimizeResumePrompt = (
  promptId: string,
  profileId: string,
  data: any
) => {
  return baseApi.post(`/prompt/execute/${promptId}/${profileId}`, data);
};

export const executeGrammarCheckPrompt = (text: string) => {
  return baseApi.post(`/profile/grammar/check`, { text });
};

// export const getPromptList = (params?: any) => {
//   return baseApi.get("/prompt/list", { params });
// };

// export const getPromptDetails = (id: string) => {
//   return baseApi.get(`/prompt/details/${id}`);
// };

// export const updatePrompt = (id: string, data: any) => {
//   return baseApi.post(`/prompt/update/${id}`, data);
// };

// export const publishPrompt = (
//   id: string,
//   versionDescription: string,
//   setCurrent?: boolean
// ) => {
//   return baseApi.post(`/prompt/publish/${id}`, {
//     versionDescription,
//     setCurrent,
//   });
// };

// export const createPrompt = (
//   data: Pick<PromptInterface, "description" | "name">
// ) => {
//   return baseApi.post(`/prompt/create`, data);
// };
