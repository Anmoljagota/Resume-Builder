import { usePromptCreate } from "@/hooks/usePrompts";
import { PromptInterface } from "@/interfaces/prompt";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import React from "react";
import { useForm } from "react-hook-form";

interface CreatePromptProps {
  isOpen: boolean;
  onClose: () => void;
}

function CreatePrompt({ isOpen, onClose }: CreatePromptProps) {
  const { mutate } = usePromptCreate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PromptInterface>();

  return (
    <Modal show={isOpen} onClose={() => onClose()}>
      <Modal.Header>Create New Prompt</Modal.Header>
      <Modal.Body>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit((fieldValues) => mutate(fieldValues))}
        >
          <div className="mb-2 block">
            <Label>Name</Label>
            <TextInput
              {...register("name", { required: true })}
              placeholder="Name"
            />
            {errors.name && <span>This field is required</span>}
          </div>
          <div className="mb-2 block">
            <Label>Description</Label>
            <TextInput
              {...register("description", { required: true })}
              placeholder="Description"
            />
            {errors.description && <span>This field is required</span>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={() => onClose()}>
          Cancel
        </Button>
        <Button
          color="purple"
          onClick={() => {
            mutate({
              name: watch("name"),
              description: watch("description"),
            });
            onClose();
          }}
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreatePrompt;
