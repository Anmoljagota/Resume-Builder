import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import { MdsHeading4, body1 } from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const TechnicalSkills = ({ data }: any) => {
  const technicalSkills = data?.technicalSkills;

  return (
    <div style={{ marginTop: "20px" }}>
      <ResumeHeading
        content={formatString("TECHNICAL SKILLS:")}
        componentProperties={{
          ...MdsHeading4,
          styles: {
            ...MdsHeading4.styles,
            color: "#000",
          },
        }}
      />
      <div style={{ height: "1px", backgroundColor: "#000" }}></div>
      <div className="grid gap-[16px] ml-[32px] mt-[8px]">
        <ResumeBulletPoints
          componentProperties={body1}
          content={technicalSkills.map((skill) => skill.name)}
        />
      </div>
    </div>
  );
};

export default TechnicalSkills;
