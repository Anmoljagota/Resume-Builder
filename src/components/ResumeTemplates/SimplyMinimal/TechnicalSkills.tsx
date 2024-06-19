import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import ResumeTags from "../../ResumeComponents/ResumeTags";

const TechnicalSkills = ({ data, components }: any) => {
  const technicalSkills = data?.technicalSkills;
  return (
    <div>
      <ResumeHeading
        content={formatString("TECHNICAL SKILLS:")}
        componentProperties={components["SimplyMinimalHeading3Blue"]}
      />
      <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div>
      <div className="grid gap-[16px]">
        <div className="mt-[16px]">
          <ResumeTags
            content={technicalSkills}
            componentProperties={components["SkillsTags"]}
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicalSkills;
