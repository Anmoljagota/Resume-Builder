import { Template, UserProfile } from "@/utils/interfaces";
import { baseApi } from "./axios";

export const getComponent = ({ uniqueLabel }: any) => {
  return baseApi.get("/component", {
    params: {
      uniqueLabel,
    },
  });
};

export const getUserProfile = ({ id, resumeId }: { id?: string; resumeId?: string }) => {
  return baseApi.get(`/profile/${id || "my"}`, {
    params: {
      resumeId,
    },
  });
};

export const updateUserProfile = (profileData: UserProfile) => {
  return baseApi.put(`/profile/${profileData._id}`, profileData);
};

export const updateTemplateConfigs = (profileId: string, templateConfig: Template) => {
  return baseApi.patch(`/profile/${profileId}/update-template-config`, templateConfig);
};

export const generateResumeUrl = ({ id, templateId }: { id: string; templateId: string }) => {
  return baseApi.get(`/profile/${id}/download-resume/${templateId}`, {
    responseType: "blob",
  });
};

export const getAllUserProfiles = (email: string) => {
  return baseApi.get(`/profile/all?email=${email}`);
};

export const createResume = (header: string) => {
  return baseApi.post("/resume/create", { header });
};

export const getResume = (id: string) => {
  return baseApi.get(`/resume/get/${id}`);
};

export const updateResume = (id: string, resume: any, templateName?: string, fontSize?: string) => {
  return baseApi.put(`/resume/update/${id}`, { resume, templateName, fontSize });
};

export const regenerateResume = ({ id, items }: { id: string; items: string[] }) => {
  return baseApi.get(`/resume/regenerate/${id}`, {
    params: { items },
  });
};

export const listAllResumes = () => {
  return baseApi.get(`/resume/list`);
};

export const requestReview = ({
  resumeId,
  text,
  templateName,
  fontSize,
}: {
  resumeId: string;
  text?: string;
  templateName?: string;
  fontSize?: string;
}) => {
  return baseApi.post(`/resume/request-review/${resumeId}`, { text, templateName, fontSize });
};

export const approveResume = (resumeId: string) => {
  return baseApi.post(`/resume/approve/${resumeId}`);
};

export const requestChanges = (resumeId: string, { videoUrl, text }: { videoUrl: string; text: string }) => {
  return baseApi.post(`/resume/request-changes/${resumeId}`, {
    videoUrl,
    text,
  });
};

export const saveAsPdf = (resumeId: string, templateName: string, fontSize: string) => {
  return baseApi.post(`/resume/saveAsPdf?resumeId=${resumeId}&templateName=${templateName}&fontSize=${fontSize}`);
};
