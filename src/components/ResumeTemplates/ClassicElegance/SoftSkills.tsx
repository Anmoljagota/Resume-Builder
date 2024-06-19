import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import { MdsHeading4, body1 } from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const SoftSkills = ({ data }: any) => {
  const softSkills = data?.softSkills;
  return (
    <div style={{ marginTop: "20px" }}>
      <ResumeHeading
        content={formatString("SOFT SKILLS:")}
        componentProperties={{
          ...MdsHeading4,
          styles: {
            ...MdsHeading4.styles,
            color: "#000",
          },
        }}
      />
      <div
        style={{ height: "1px", backgroundColor: "#000" }}
        className=""
      ></div>
      <div className="mt-[8px] ml-[32px]">
        {" "}
        <ResumeBulletPoints
          componentProperties={body1}
          content={softSkills.map((skill) => skill.name)}
        />
      </div>
    </div>
  );
};

export default SoftSkills;
