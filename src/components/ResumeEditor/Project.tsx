import { Resume } from "@/interfaces/Resume";
import React from "react";
import { Control, Controller, UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import TextAreaComponent from "../common/InputComponent/TextAreaComponent";
import { RxCross2 } from "react-icons/rx";
import AddSkill from "../Profile/Form/Skills/AddSkill";
import DeleteButton from "../Profile/Form/DeleteButton";

function HighlightsEditor({ onChange, value }: { onChange: (value: string[]) => void; value: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      {value?.map((highlight, index) => {
        return (
          <div className="grid grid-cols-[9fr_1fr] gap-x-3 items-center" key={index}>
            <TextAreaComponent
              name="project Highlights"
              placeholder="Enter Highlights"
              value={highlight}
              onChange={(e) => {
                const highlights = [...value];
                highlights[index] = e.target.value;
                onChange(highlights);
              }}
            />

            <RxCross2
              className="h-6 w-6 text-[#ee4040] cursor-pointer"
              onClick={() => {
                const highlights = [...value];
                highlights.splice(index, 1);
                onChange(highlights);
              }}
            />
          </div>
        );
      })}
      <div>
        <AddSkill
          onClick={() => {
            onChange([...value, ""]);
          }}
        />
      </div>
    </div>
  );
}

interface ProjectProps {
  projectIndex: number;
  control: Control<Resume>;
  remove: (value: string[]) => void;
  watch: UseFormWatch<Resume>;
  setValue: UseFormSetValue<Resume>;
  onDelete: () => void;
}

function Project({ projectIndex, control, remove, watch, setValue, onDelete }: ProjectProps) {
  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center justify-between gap-2">
        <Controller
          control={control}
          name={`projects.${projectIndex}.name`}
          render={({ field }) => <h4 className="text-lg font-bold text-black capitalize">{field.value}</h4>}
        />
        <DeleteButton
          onDelete={() => {
            const UpdatedData = watch("projects")?.filter((ec, index) => index !== projectIndex);
            setValue("projects", UpdatedData);
            onDelete();
          }}
        />
      </div>
      <Controller
        control={control}
        name={`projects.${projectIndex}.highlights`}
        render={({ field }) => (
          <HighlightsEditor
            value={field.value}
            onChange={(value: string[]) => {
              field.onChange(value);
              remove(value);
            }}
          />
        )}
      />
    </div>
  );
}

export default Project;
