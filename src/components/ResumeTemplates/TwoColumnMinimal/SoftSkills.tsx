import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading3 } from "@/utils/components";
import ResumeTags from "../../ResumeComponents/ResumeTags";
const SoftSkills = ({ data, components }: any) => {
  const softSkills = data?.softSkills;
  return (
    <div>
      <ResumeHeading
        content={"Soft Skills"}
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
            content={softSkills}
            componentProperties={components["SkillsTags"]}
          />
        </div>
      </div>
    </div>
  );
};

export default SoftSkills;
