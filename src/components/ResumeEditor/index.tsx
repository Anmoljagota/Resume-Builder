"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Resume } from "@/interfaces/Resume";
import { useFieldArray, useForm } from "react-hook-form";
import { Button, Textarea } from "flowbite-react";
import { Project as ProjectData, UserProfile } from "@/utils/interfaces";
import Project from "./Project";
import { useRegenerateResume, useUpdateResume } from "@/hooks/useResume";
import ResumeEditSkill from "./Skill";
import { getWordCount } from "@/utils/string";
import AddNewProject from "./AddNewProject/AddNewProject";
import VariantButton from "../common/Button/VariantButton";
import ClickableDiv from "./miniComponents/ClickableDiv";
import FontSizeSelection from "./miniComponents/FontSizeSelection";
import TextAreaComponent from "../common/InputComponent/TextAreaComponent";
import { saveAsPdf } from "@/apis/resume";
import { toast } from "react-toastify";
import { useMyDetails } from "@/hooks/useAuth";
import ResumeReview from "./miniComponents/ResumeReview";

interface ResumeEditorProps {
  resume: Resume;
  originalProfile: UserProfile;
  refetch: () => void;
  onUpdate: (resume: Resume) => void;
  selectedTemplateName: string;
  onClickExploreTemplate: () => void;
  onSelecetFontSize: (value: string) => void;
  onClickViewResume: () => void;
  selectedFont: string;
  templateName: string;
  setUpdatedProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  updatedProfile: UserProfile | null;
}

const professionalSummaryWordLimit = 45;

function ResumeEditor({
  resume,
  originalProfile: originalProfile,
  onUpdate,
  refetch,
  selectedTemplateName,
  onClickExploreTemplate,
  onSelecetFontSize,
  onClickViewResume,
  selectedFont,
  templateName,
  setUpdatedProfile,
  updatedProfile,
}: ResumeEditorProps) {
  const [selectedRegenerationItems, setSelectedRegenerationItems] = useState<string[]>([]);
  const [isEditing, setIsEditing] = React.useState(false);
  const [savingPdf, setSavingPdf] = React.useState(false);
  const { data } = useMyDetails();
  const {
    mutate: updateResume,
    isLoading: isResumeUpdating,
    isSuccess: isResumeUpdated,
  } = useUpdateResume(
    () => {
      toast.success("Resume Updated Successfully");
    },
    (err: Error) => {
      toast.error(err.message);
    }
  );
  const {
    mutate,
    isLoading: isRegenerating,
    isSuccess: isRegenerationSuccess,
    isError: hasRegenerationError,
  } = useRegenerateResume();
  const handleRegenerate = async () => {
    if (!resume._id) return;
    mutate({ id: resume._id, items: selectedRegenerationItems });
  };
  const { register, watch, control, getValues, reset, setValue, handleSubmit } = useForm<Resume>({
    defaultValues: resume,
  });

  const handleRegenerateSummary = () => {
    if (!resume._id) return;
    setSelectedRegenerationItems(["professionalSummary"]);
    mutate({ id: resume._id, items: ["professionalSummary"] });
  };

  // useEffect(() => {
  //   const { unsubscribe } = watch((data, { name }) => {
  //     onUpdate(getValues());
  //   });
  //   return () => {
  //     unsubscribe();
  //   };
  // }, [getValues, onUpdate, watch]);

  const { fields: projectFields, remove: removeProjectFunction } = useFieldArray({
    control,
    name: "projects",
  });
  const onSubmit = () => {
    const data = getValues();
    if (!data._id) {
      return;
    }
    updateResume({ id: data._id, resume: data, templateName: selectedTemplateName, fontSize: selectedFont });
  };

  useEffect(() => {
    if (isRegenerationSuccess || isResumeUpdated) {
      refetch();
    }
  }, [isResumeUpdated, isRegenerationSuccess, refetch]);

  const professionalSummaryWordCount = useMemo(() => {
    return getWordCount(getValues().professionalSummary);
  }, [getValues]);

  const handleRegenerateTechnicalSkills = () => {
    if (!resume._id) return;
    setSelectedRegenerationItems(["technicalSkills"]);
    mutate({ id: resume._id, items: ["technicalSkills"] });
  };

  const handleRegenerateSoftSkills = () => {
    if (!resume._id) return;
    setSelectedRegenerationItems(["softSkills"]);
    mutate({ id: resume._id, items: ["softSkills"] });
  };

  const handleRegenerateProjects = () => {
    if (!resume._id) return;
    setSelectedRegenerationItems(["projects"]);
    mutate({ id: resume._id, items: ["projects"] });
  };

  const handleResumeSaveAsPdf = (resumeId: string, selectedTemplateName: string, selectedFont: string) => {
    if (!resumeId || resumeId === "") return;
    setSavingPdf(true);
    saveAsPdf(resumeId, selectedTemplateName, selectedFont)
      .then(() => {
        setSavingPdf(false);
        toast.success("Resume saved as pdf");
      })
      .catch(() => {
        setSavingPdf(false);
        toast.error("Error while saving resume as pdf");
      });
  };

  return (
    <div className="grid gird-cols-1 gap-y-8 pt-12">
      {!isEditing && (
        <>
          <VariantButton
            label="Explore Templates"
            size="xl"
            className="py-3 px-7 w-full text-left justify-start"
            onClick={onClickExploreTemplate}
            type="button"
          />
          <div className="grid gird-cols-1 gap-y-6">
            <ClickableDiv
              label="Edit"
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setIsEditing(true)}
            />
            <FontSizeSelection
              onSelect={(value: string) => {
                onSelecetFontSize(value);
              }}
              selectedFont={selectedFont}
            />
            {/* <ClickableDiv
              label="Save As Pdf"
              loading={savingPdf}
              onClick={() => handleResumeSaveAsPdf(resume._id || "", templateName, selectedFont)}
            /> */}
            <ClickableDiv label="View Resume" onClick={onClickViewResume} />
            {(data?.masaistudent || data?.role === "Admin") && (
              <ResumeReview resume={resume} selectedTemplateName={selectedTemplateName} fontSize={selectedFont} />
            )}
          </div>
        </>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full grid grid-cols-1 gap-y-6 max-h-[100vh] overflow-y-auto">
            <ClickableDiv
              label="Close Editor"
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => setIsEditing(false)}
            />
            <TextAreaComponent
              placeholder="Professional Summary"
              name="professionalSummary"
              value={watch("professionalSummary") || ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setValue("professionalSummary", e.target.value);
                if (updatedProfile)
                  setUpdatedProfile({ ...(updatedProfile || {}), professionalSummary: e.target.value });
              }}
            />
            <ResumeEditSkill
              profile={originalProfile}
              register={register}
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              control={control}
              updateResumeSkills={(key: "technicalSkills" | "softSkills", data: { name: string }[]) => {
                if (updatedProfile) setUpdatedProfile({ ...(updatedProfile || {}), [key]: data });
              }}
            />
            <div className="flex flex-col gap-4">
              {projectFields.map((field, index) => (
                <Project
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  remove={(value: string[]) => {
                    if (updatedProfile) {
                      setUpdatedProfile({
                        ...(updatedProfile || {}),
                        projects: updatedProfile.projects.map((ec, idx) => {
                          if (idx === index) {
                            ec.highlights = value;
                          }
                          return ec;
                        }),
                      });
                    }
                  }}
                  projectIndex={index}
                  key={field.id}
                  onDelete={() => {
                    if (updatedProfile) {
                      setUpdatedProfile({
                        ...(updatedProfile || {}),
                        projects: updatedProfile.projects.filter((ec, idx) => idx !== index),
                      });
                    }
                  }}
                />
              ))}
              <AddNewProject
                profile={originalProfile}
                watch={watch}
                resumeId={resume?._id || ""}
                setValue={setValue}
                getValue={getValues}
                updateProjectInResume={(value: ProjectData) => {
                  if (updatedProfile) {
                    setUpdatedProfile({ ...(updatedProfile || {}), projects: [...updatedProfile.projects, value] });
                  }
                }}
              />
            </div>
          </div>
          <VariantButton label="Update" type="submit" className="w-full mt-4" loading={isResumeUpdating} />
        </form>
      )}
    </div>
  );
}
{
  /* <div className="container mx-auto text-black">
  <div className="bg-white flex flex-col gap-6 p-4 rounded-lg">
    <div className="text-xl text-black flex justify-between items-center">
      <span>Professional Summary</span>
      <Button
        size="sm"
        isProcessing={isRegenerating && selectedRegenerationItems.includes("professionalSummary")}
        disabled={isRegenerating}
        onClick={handleRegenerateSummary}
      >
        Regenerate
      </Button>
    </div>
    <div className="flex flex-col gap-2">
      <Textarea
        placeholder="model name like: gpt-3.5-turbo"
        {...register("professionalSummary")}
        style={{
          minHeight: "200px",
        }}
      />
      <div
        className={clsx({
          "text-red-500": professionalSummaryWordCount > professionalSummaryWordLimit,
        })}
      >
        {professionalSummaryWordCount}/{professionalSummaryWordLimit} words
      </div>
    </div>
    <div className="text-xl text-black flex justify-between items-center">
      <div className="text-xl text-black">Technical Skills</div>
      <Button
        isProcessing={isRegenerating && selectedRegenerationItems.includes("technicalSkills")}
        disabled={isRegenerating}
        onClick={handleRegenerateTechnicalSkills}
      >
        Regenerate
      </Button>
    </div>
    <Skill control={control} register={register} watch={watch} profile={originalProfile} type="technicalSkills" />
    <div className="text-xl text-black flex justify-between items-center">
      <div className="text-xl text-black">Soft Skills</div>
      <Button
        onClick={handleRegenerateSoftSkills}
        isProcessing={isRegenerating && selectedRegenerationItems.includes("softSkills")}
        disabled={isRegenerating}
      >
        Regenerate
      </Button>
    </div>
    <Skill control={control} register={register} watch={watch} profile={originalProfile} type="softSkills" />
    <div className="text-xl text-black flex justify-between items-center">
      <h3 className="text-2xl text-black">Projects</h3>
      <Button
        onClick={handleRegenerateProjects}
        isProcessing={isRegenerating && selectedRegenerationItems.includes("projects")}
        disabled={isRegenerating}
      >
        Regenerate
      </Button>
    </div>
    <div className="flex flex-col gap-4">
      {projectFields.map((field, index) => (
        <Project control={control} remove={removeProjectFunction} projectIndex={index} key={field.id} />
      ))}
      <AddNewProject
        profile={originalProfile}
        watch={watch}
        resumeId={resume?._id || ""}
        setValue={setValue}
        getValue={getValues}
      />
    </div>

    <Button isProcessing={isResumeUpdating} onClick={onSubmit}>
      Update
    </Button>
    {isResumeUpdated && <div className="text-green-500">Resume updated successfully</div>}
  </div>
</div>; */
}

export default ResumeEditor;
