import { useGetSoftTechSkills } from "@/hooks/useData";
import { Resume } from "@/interfaces/Resume";
import { Skill, UserProfile } from "@/utils/interfaces";
import React from "react";
import {
  Control,
  FieldArrayWithId,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";
import Skills from "../Profile/Form/Skills";
import AddSkill from "../Profile/Form/Skills/AddSkill";
import DropDownComponent from "../common/DropDown/DropDownComponent";
import { twMerge } from "tailwind-merge";
import ArrangeOrderIcon from "@/assets/ArrangeOrder.svg";
import Image from "next/image";

interface SkillProps {
  profile: UserProfile;
  register: UseFormRegister<Resume>;
  control: Control<Resume>;
  watch: UseFormWatch<Resume>;
  getValues: UseFormGetValues<Resume>;
  setValue: UseFormSetValue<Resume>;
  updateResumeSkills: (key: "technicalSkills" | "softSkills", data: { name: string }[]) => void;
}

function ResumeEditSkill({ profile, register, control, watch, getValues, setValue, updateResumeSkills }: SkillProps) {
  const { data } = useGetSoftTechSkills();
  const [openDropDown, setOpenDropDown] = React.useState("");
  const DragStart = React.useRef<number>(0);
  const DragProcess = React.useRef<number>(0);
  const [arrangeOrder, setArrangeOrder] = React.useState<string>("");
  const checkIfTechnicalSkillExist = () => {
    return (
      profile?.technicalSkills.filter((s) => {
        return !watch("technicalSkills")?.some((cs) => cs.name === s.name);
      })?.length > 0
    );
  };
  const checkIfSoftSkillExist = () => {
    return (
      profile?.softSkills.filter((s) => {
        return !watch("softSkills")?.some((cs) => cs.name === s.name);
      })?.length > 0
    );
  };

  const checkArrangeOrderButtonVisible = (name: "softSkills" | "technicalSkills") => {
    return watch(name)?.length > 1;
  };

  const addNewSkill = (key: "technicalSkills" | "softSkills") => {
    const updatedSkillData = [
      ...getValues()[key],
      {
        name: "",
      },
    ];
    setValue(key, updatedSkillData);
    updateResumeSkills(key, updatedSkillData);
  };
  const updateSkills = (key: "technicalSkills" | "softSkills", data: { name: string }[]) => {
    setValue(key, data);
    updateResumeSkills(key, data);
  };

  return (
    <div>
      <div className="my-6 grid grid-cols-1 gap-y-6">
        <p className="text-base font-medium text-[#2E1971]">Your Technical Skills</p>
        {watch("technicalSkills")?.map((skill: { name: string }, index: number) => (
          <div
            key={index}
            className={twMerge(
              "grid  gap-x-0 items-center",
              `${arrangeOrder === "technicalSkills" ? "grid-cols-[1fr_9fr]" : "grid-cols-1"}`
            )}
            draggable={arrangeOrder === "technicalSkills" ? true : false}
            onDragStart={(e) => (DragStart.current = index)}
            onDragEnter={(e) => (DragProcess.current = index)}
            onDragEnd={() => {
              const updateData = watch("technicalSkills");
              const removeOne = updateData[DragStart.current];
              updateData.splice(DragStart.current, 1);
              updateData.splice(DragProcess.current, 0, removeOne);
              setValue("technicalSkills", updateData);
              updateSkills("technicalSkills", updateData);
              DragStart.current = 0;
              DragProcess.current = 0;
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <div
              className={twMerge("w-3 grid grid-cols-2 gap-1", `${arrangeOrder === "technicalSkills" ? "" : "hidden"}`)}
            >
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
            </div>
            <Skills
              value={skill?.name}
              onChange={(value: string) => {
                const technicalSkills = [...getValues().technicalSkills];
                technicalSkills[index] = { ...technicalSkills[index], name: value };
                updateSkills("technicalSkills", technicalSkills);
              }}
              onDelete={() => {
                setValue(
                  "technicalSkills",
                  getValues().technicalSkills.filter((skill: { name: string }, idx: number) => idx !== index)
                );
              }}
              placeholder="Add Skill"
            />
          </div>
        ))}
        {checkIfTechnicalSkillExist() && (
          <DropDownComponent
            placeholder="Select to add a skill"
            name="Technical Skill"
            options={
              profile?.technicalSkills
                .filter((s) => {
                  return !watch("technicalSkills")?.some((cs) => cs.name === s.name);
                })
                .map((skill, index) => ({ id: index.toString(), value: skill.name })) || []
            }
            setSelected={(value: string) => {
              updateSkills("technicalSkills", [
                ...getValues().technicalSkills,
                {
                  name: value,
                },
              ]);
            }}
            selected=""
          />
        )}

        <div className="w-full flex justify-between items-center">
          <AddSkill onClick={() => addNewSkill("technicalSkills")} />
          {checkArrangeOrderButtonVisible("technicalSkills") && (
            <button
              type="button"
              className="bg-none border-none flex items-center gap-x-2 bg-[#FFF] rounded-sm text-[#A7A7A7] font-normal text-center text-[10px] py-2 px-4"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.stopPropagation();
                if (arrangeOrder === "technicalSkills") {
                  setArrangeOrder("");
                } else {
                  setArrangeOrder("technicalSkills");
                }
              }}
            >
              Arrange Order
              <Image src={ArrangeOrderIcon} alt="arrange-order" />
            </button>
          )}
        </div>
      </div>
      <div className="my-6 grid grid-cols-1 gap-y-6">
        <p className="text-base font-medium text-[#2E1971]">Your Soft Skills</p>
        {watch("softSkills")?.map((skill: { name: string }, index: number) => (
          <div
            key={index}
            className={twMerge(
              "grid  gap-x-0 items-center",
              `${arrangeOrder === "softSkills" ? "grid-cols-[1fr_9fr]" : "grid-cols-1"}`
            )}
            draggable={arrangeOrder === "softSkills" ? true : false}
            onDragStart={(e) => (DragStart.current = index)}
            onDragEnter={(e) => (DragProcess.current = index)}
            onDragEnd={() => {
              const updateData = watch("softSkills");
              const removeOne = updateData[DragStart.current];
              updateData.splice(DragStart.current, 1);
              updateData.splice(DragProcess.current, 0, removeOne);
              updateSkills("softSkills", updateData);
              DragStart.current = 0;
              DragProcess.current = 0;
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className={twMerge("w-3 grid grid-cols-2 gap-1", `${arrangeOrder === "softSkills" ? "" : "hidden"}`)}>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
              <div className="h-1 w-1 bg-[#E1E1E1] rounded-lg"></div>
            </div>
            <Skills
              value={skill?.name}
              onChange={(value: string) => {
                const softSkills = [...getValues().softSkills];
                softSkills[index] = { ...softSkills[index], name: value };
                updateSkills("softSkills", softSkills);
              }}
              onDelete={() => {
                setValue(
                  "softSkills",
                  getValues().softSkills.filter((skill: { name: string }, idx: number) => idx !== index)
                );
              }}
              placeholder="Add Skill"
            />
          </div>
        ))}
        {checkIfSoftSkillExist() && (
          <DropDownComponent
            placeholder="Select to add a skill"
            name="Soft Skill"
            options={
              profile?.softSkills
                .filter((s) => {
                  return !getValues()?.softSkills?.find((cs) => cs.name === s.name);
                })
                .map((skill, index) => ({ id: index.toString(), value: skill.name })) || []
            }
            setSelected={(value: string) => {
              updateSkills("softSkills", [
                ...getValues().softSkills,
                {
                  name: value,
                },
              ]);
            }}
            selected=""
          />
        )}
        <div className="w-full flex justify-between items-center">
          <AddSkill onClick={() => addNewSkill("softSkills")} />
          {checkArrangeOrderButtonVisible("softSkills") && (
            <button
              type="button"
              className="bg-none border-none flex items-center gap-x-2 bg-[#FFF] rounded-sm text-[#A7A7A7] font-normal text-center text-[10px] py-2 px-4"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                e.stopPropagation();
                if (arrangeOrder === "softSkills") {
                  setArrangeOrder("");
                } else {
                  setArrangeOrder("softSkills");
                }
              }}
            >
              Arrange Order
              <Image src={ArrangeOrderIcon} alt="arrange-order" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeEditSkill;
