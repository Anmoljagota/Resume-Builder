import { PromptVariableType } from "@/interfaces/enums";
import { PromptVersionInterface } from "@/interfaces/promptVersion";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import React from "react";
import { FieldValues, useFieldArray, useForm } from "react-hook-form";

interface PromptFormProps {
  promptVersion: PromptVersionInterface;
  actionText: string;
  onSubmit: (prompt: PromptVersionInterface) => void;
  isSubmitting: boolean;
}

function PromptForm({
  promptVersion,
  actionText,
  onSubmit,
  isSubmitting,
}: PromptFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<PromptVersionInterface>({
    defaultValues: promptVersion,
  });
  const {
    fields: templateChunksFields,
    append: appendTemplateChunk,
    remove: removeTemplateChunk,
    swap: swapTemplateChunk,
    insert: insertTemplateChunk,
  } = useFieldArray({
    control,
    name: "templateChunks",
  });
  const {
    fields: variablesFields,
    append: appendVariable,
    remove: removeVariable,
    swap: swapVariable,
    insert: insertVariable,
  } = useFieldArray({
    control,
    name: "variables",
  });

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={
        isSubmitting
          ? (e) => e.preventDefault()
          : handleSubmit((fieldValues) => onSubmit(fieldValues))
      }
    >
      <div>
        <div className="mb-2 block">
          <Label>System Message</Label>
        </div>
        <Textarea {...register("systemMessage")} />
      </div>
      <div>
        <div className="mb-2 block">
          <Label>Variables</Label>
        </div>
        <div className="flex flex-col gap-4 mb-2">
          {variablesFields.map((field, index) => (
            <div
              key={field.id}
              className="flex justify-between gap-2 bg-slate-100 p-3 rounded-lg"
            >
              <div className="flex items-center gap-2">
                <span>Type: {PromptVariableType.string}</span>

                <TextInput
                  placeholder="variable name like: topics, summary"
                  {...register(`variables.${index}.name`)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  color="gray"
                  onClick={() => swapVariable(index, index - 1)}
                >
                  Move Up
                </Button>
                <Button
                  size="sm"
                  color="red"
                  onClick={() => removeVariable(index)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <Button
              color="green"
              size="sm"
              onClick={() =>
                appendVariable({ name: "", type: PromptVariableType.string })
              }
            >
              Add variable
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-2 block">
          <Label>Template</Label>
        </div>
        <div className="flex flex-col gap-4 mb-2">
          {templateChunksFields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col gap-2 bg-slate-100 p-3 rounded-lg"
            >
              <div className="flex justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span>include if</span>
                  <TextInput
                    placeholder="variable name like: topics, summary"
                    {...register(`templateChunks.${index}.includeIf`)}
                  />
                  <span>exists</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    color="gray"
                    size="sm"
                    onClick={() => swapTemplateChunk(index, index - 1)}
                  >
                    Move Up
                  </Button>
                  <Button
                    color="gray"
                    size="sm"
                    onClick={() =>
                      insertTemplateChunk(index + 1, {
                        includeIf: "",
                        text: "",
                      })
                    }
                  >
                    Add below
                  </Button>
                  <Button
                    color="red"
                    size="sm"
                    onClick={() => removeTemplateChunk(index)}
                  >
                    Remove
                  </Button>
                </div>
              </div>

              <Textarea
                {...register(`templateChunks.${index}.text`)}
                defaultValue={field.text}
              />
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            color="green"
            size="sm"
            onClick={() =>
              appendTemplateChunk({
                includeIf: "",
                text: "",
              })
            }
          >
            Add template chunk
          </Button>
        </div>
      </div>
      <div>
        <Button
          color={"purple"}
          type="submit"
          isProcessing={isSubmitting}
          disabled={isSubmitting}
        >
          {actionText}
        </Button>
      </div>
    </form>
  );
}

export default PromptForm;
