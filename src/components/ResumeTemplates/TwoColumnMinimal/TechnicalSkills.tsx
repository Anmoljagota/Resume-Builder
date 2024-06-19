import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading3 } from "@/utils/components";
import ResumeTags from "../../ResumeComponents/ResumeTags";

const TechnicalSkills = ({ data, components }: any) => {
  const technicalSkills = data?.technicalSkills;
  return (
    <div className="h-fit">
      <ResumeHeading
        content={"Technical Skills"}
        componentProperties={{
          ...MdsHeading3,
          styles: {
            ...MdsHeading3.styles,
            color: "#fff",
          },
        }}
      />
      {/* add a horizontal underline */}
      <div style={{ height: "1px", backgroundColor: "#fff" }}></div>
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
