import { PromptVariableType } from "./enums";

export type PromptVariable = {
  _id?: string;
  name: string;
  type?: PromptVariableType;
  value?: string;
};

interface ResponseFormat {
  type: "string" | "object" | "array" | "number" | "boolean";
  key?: string;
  properties?: ResponseFormat;
}

export interface PromptVersionInterface {
  _id: string;
  systemMessage?: string;
  isPublished: boolean;
  templateChunks?: {
    _id?: string;
    text: string;
    /**
     * include the chunk if the condition is true
     */
    includeIf?: string;
  }[];
  prompt: string;
  version: number;
  versionDescription?: string;
  variables: PromptVariable[];
  model: string;
  modelConfig?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    presencePenalty?: number;
    frequencyPenalty?: number;
    stop?: string[];
  };
  /**
   * @deprecated
   */
  responseFormats?: ResponseFormat;
  functions?: {
    name: string;
    description: string;
    parameters?: {
      type: string;
      properties: {
        [key: string]: {
          type: string;
          description?: string;
          enum?: string[];
        };
      };
    }[];
    required: string[];
  }[];
  function_call?: string;
  createdAt: string;
  updatedAt: string;
}
