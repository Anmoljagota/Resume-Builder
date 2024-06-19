import {
  createPrompt,
  getPromptDetails,
  getPromptList,
  publishPrompt,
  updatePrompt,
  executeGrammarCheckPrompt,
} from "@/apis/prompt";
import { useMutation, useQuery } from "react-query";
import { PromptInterface } from "../interfaces/prompt";
import { PromptVersionInterface } from "../interfaces/promptVersion";
import { reactQueryConfig } from "@/config/reactQuery.config";

export const usePromptList = (params?: any) => {
  return useQuery({
    queryKey: ["prompt", params],
    queryFn: async () => (await getPromptList(params)).data.prompts as PromptInterface[],
    staleTime: 60000,
  });
};

interface PromptDetailsInterface {
  prompt: PromptInterface;
  draftVersion: PromptVersionInterface;
  currentVersion?: PromptVersionInterface;
}

export const usePromptDetails = (id: string) => {
  return useQuery({
    queryKey: ["promptDetails", id],
    queryFn: async () => (await getPromptDetails(id)).data as PromptDetailsInterface,
    staleTime: 60000,
  });
};

interface PromptUpdateInterface {
  prompt: PromptInterface;
  draftVersion: PromptVersionInterface;
}

export const usePromptUpdate = () => {
  return useMutation<PromptUpdateInterface, Error, { id: string; data: PromptVersionInterface }>({
    mutationKey: ["updatePrompt"],
    mutationFn: async ({ id, data }: { id: string; data: PromptVersionInterface }) =>
      (await updatePrompt(id, data)).data as PromptUpdateInterface,
  });
};

interface PromptPublishInterface {
  prompt: PromptInterface;
  draftVersion: PromptVersionInterface;
  publishedVersion: PromptVersionInterface;
}

export const usePromptPublish = () => {
  return useMutation<PromptPublishInterface, Error, { id: string; versionDescription: string; setCurrent?: boolean }>({
    mutationKey: ["publishPrompt"],
    mutationFn: async ({
      id,
      versionDescription,
      setCurrent,
    }: {
      id: string;
      versionDescription: string;
      setCurrent?: boolean;
    }) => (await publishPrompt(id, versionDescription, setCurrent)).data as PromptPublishInterface,
  });
};

interface PromptCreateInterface {
  prompt: PromptInterface;
  draftVersion: PromptVersionInterface;
}

export const usePromptCreate = () => {
  return useMutation<PromptCreateInterface, Error, Pick<PromptInterface, "description" | "name">>({
    mutationKey: ["createPrompt"],
    mutationFn: async (data: Pick<PromptInterface, "description" | "name">) =>
      (await createPrompt(data)).data as PromptCreateInterface,
  });
};

export const useGrammarCheck = () => {
  return useMutation({
    mutationKey: ["grammarCheck"],
    mutationFn: async (text: string) =>
      (await executeGrammarCheckPrompt(text)).data as { data: { correctedText: string } },
    retry: 3,
  });
};
