import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import ResumeTags from "../../ResumeComponents/ResumeTags";

const SoftSkills = ({ data, components }: any) => {
  const softSkills = data?.softSkills;
  return (
    <div>
      <ResumeHeading
        content={formatString("SOFT SKILLS:")}
        componentProperties={components["SimplyMinimalHeading3Blue"]}
      />
      <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div>
      <div className="grid gap-[16px]">
        <div className="mt-[16px]">
          <ResumeTags
            content={softSkills}
            componentProperties={components["SkillsTags"]}
          />
        </div>
      </div>
    </div>
  );
};

export default SoftSkills;
