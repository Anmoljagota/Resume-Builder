import {
  approveResume,
  createResume,
  getResume,
  listAllResumes,
  regenerateResume,
  requestChanges,
  requestReview,
  updateResume,
} from "@/apis/resume";
import { reactQueryConfig } from "@/config/reactQuery.config";
import { Resume } from "@/interfaces/Resume";
import { useMutation, useQuery } from "react-query";

export const useListMyResume = () => {
  return useQuery({
    queryKey: ["myResumeList"],
    queryFn: async () => (await listAllResumes()).data.items as Resume[],
    staleTime: 60000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
export const useGetResume = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["myResume", id],
    queryFn: async () => (await getResume(id)) as { data: Resume },
    ...reactQueryConfig,
    enabled: typeof id === "string" && id !== "",
  });
};

export const useCreateResume = (d?: { onSuccess?: () => void }) => {
  return useMutation<Resume, Error, string>({
    mutationKey: ["createResume"],
    mutationFn: async (header: string) => (await createResume(header)).data as Resume,
    onSuccess: d?.onSuccess,
  });
};

export const useRegenerateResume = () => {
  return useMutation<Resume, Error, { id: string; items: string[] }>({
    mutationKey: ["regenerateResume"],
    mutationFn: async ({ id, items }) => (await regenerateResume({ id, items })).data as Resume,
  });
};

export const useUpdateResume = (onSuccess?: () => void, onError?: (err: Error) => void) => {
  return useMutation<Resume, Error, { id: string; resume: Resume; templateName?: string; fontSize?: string }>({
    mutationKey: ["updateResume"],
    mutationFn: async ({ id, resume, templateName, fontSize }) =>
      (await updateResume(id, resume, templateName, fontSize)).data as Resume,
    onSuccess: onSuccess && onSuccess,
    onError: (error: Error) => {
      onError && onError(error);
    },
  });
};

export const useRequestReview = ({ onSuccess }: { onSuccess: () => any }) => {
  return useMutation<Resume, Error, { resumeId: string; text?: string; templateName?: string; fontSize?: string }>({
    onSuccess,
    mutationKey: ["requestReview"],
    mutationFn: async ({
      resumeId,
      text,
      templateName,
      fontSize,
    }: {
      resumeId: string;
      text?: string;
      templateName?: string;
      fontSize?: string;
    }) => (await requestReview({ resumeId, text, templateName, fontSize })).data as any,
  });
};

export const useApproveResume = ({ onSuccess, onError }: { onSuccess: () => any; onError?: (err: Error) => void }) => {
  return useMutation<Resume, Error, string>({
    onSuccess,
    onError,
    mutationKey: ["approveResume"],
    mutationFn: async (resumeId: string) => (await approveResume(resumeId)).data as any,
  });
};

export const useRequestChanges = ({ onSuccess, onError }: { onSuccess: () => any; onError?: (err: Error) => void }) => {
  return useMutation<Resume, Error, { resumeId: string; videoUrl: string; text: string }>({
    onSuccess,
    onError,
    mutationKey: ["requestChanges"],
    mutationFn: async ({ resumeId, videoUrl, text }) =>
      (
        await requestChanges(resumeId, {
          videoUrl,
          text,
        })
      ).data as any,
  });
};
