import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import { MdsHeading4, body1, body1Md } from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const TechnicalSkills = ({ data }: any) => {
  const technicalSkills = data?.technicalSkills;

  return (
    <div style={{ marginTop: "20px" }}>
      <ResumeHeading
        content={formatString("TECHNICAL SKILLS")}
        componentProperties={{
          ...body1Md,
          styles: {
            ...body1Md.styles,
            color: "#b27a56",
          },
        }}
      />
      {/* <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div> */}
      <div className="grid gap-[16px] ml-[24px]">
        <ResumeBulletPoints
          componentProperties={body1}
          content={technicalSkills.map((skill) => skill.name)}
        />
      </div>
    </div>
  );
};

export default TechnicalSkills;
