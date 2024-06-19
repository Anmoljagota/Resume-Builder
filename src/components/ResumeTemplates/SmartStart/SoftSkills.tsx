import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import { MdsHeading4, body1, body1Md } from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const SoftSkills = ({ data }: any) => {
  const softSkills = data?.softSkills;
  return (
    <div style={{ marginTop: "20px" }}>
      <ResumeHeading
        content={formatString("SOFT SKILLS")}
        componentProperties={{
          ...body1Md,
          styles: {
            ...body1Md.styles,
            color: "#b27a56",
          },
        }}
      />
      {/* <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div> */}
      <div className="ml-[24px]">
        <ResumeBulletPoints
          componentProperties={body1}
          content={softSkills.map((skill) => skill.name)}
        />
      </div>
    </div>
  );
};

export default SoftSkills;
