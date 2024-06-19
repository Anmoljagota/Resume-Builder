"use client";
import React from "react";
import { getProjectHighlights } from "@/apis/data";
import DropDownComponent from "@/components/common/DropDown/DropDownComponent";
import { Resume } from "@/interfaces/Resume";
import { Project, UserProfile } from "@/utils/interfaces";
import { Spinner } from "flowbite-react";
import { useState } from "react";
import { UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { toast } from "react-toastify";

interface IAddNewProject {
  profile: UserProfile;
  watch: UseFormWatch<Resume>;
  resumeId: string;
  getValue: UseFormGetValues<Resume>;
  setValue: UseFormSetValue<Resume>;
  updateProjectInResume: (value: Project) => void;
}

const AddNewProject = ({ profile, watch, resumeId, getValue, setValue, updateProjectInResume }: IAddNewProject) => {
  const [generatingHighlights, setGeneratingHighlights] = useState(false);
  const currentSelectedProject = watch("projects");
  const [open, setOpen] = React.useState(false);

  const generateProjectHighlights = (resumeId: string, projectId: string) => {
    getProjectHighlights(resumeId, projectId)
      .then((data) => {
        const updatedData = data.data;
        setGeneratingHighlights(false);

        setValue("projects", [
          ...getValue().projects,
          {
            _id: projectId,
            name: updatedData.name,
            highlights: updatedData.highlights,
          },
        ]);
        updateProjectInResume({
          ...profile?.projects?.filter((ec) => ec._id === projectId)[0],
          highlights: updatedData.highlights,
        });
      })
      .catch((error) => {
        setGeneratingHighlights(false);
        toast.error(error.message, {
          position: "top-center",
          autoClose: 3000,
        });
      });
  };
  return (
    <div>
      {generatingHighlights && (
        <div className="flex flex-col jusity-center items-center w-full gap-2">
          <Spinner size={"xl"} />
          <p>Please wait, adding the project...</p>
        </div>
      )}
      {!generatingHighlights && (
        <DropDownComponent
          name="select-project"
          placeholder="Add a Project"
          selected=""
          setSelected={(value: string) => {
            const selectedProject = profile?.projects?.filter((ep) => ep.name === value);
            if (selectedProject?.length > 0) {
              setGeneratingHighlights(true);
              generateProjectHighlights(resumeId, selectedProject[0]?._id || "");
            }
          }}
          options={profile?.projects
            .filter((singleProject) => !currentSelectedProject.find((cp) => cp._id === singleProject._id))
            .map((nsp, index) => ({
              id: index.toString(),
              value: nsp?.name,
            }))}
        />
      )}
    </div>
  );
};
export default AddNewProject;
