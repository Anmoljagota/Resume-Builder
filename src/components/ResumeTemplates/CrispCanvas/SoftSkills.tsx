import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import { MdsHeading5, body1, body1Md, body2 } from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const SoftSkills = ({ data, components }: any) => {
  const softSkills = data?.softSkills;
  let arr = softSkills.map((el: any) => el.name);

  return (
    <div className="mt-[15px]">
      <ResumeHeading
        content={formatString("SOFT SKILLS")}
        componentProperties={{
          ...body1Md,
          styles: {
            ...body1Md.styles,
            color: "white",
          },
        }}
      />
      <div className="h-[2px] w-[100%] bg-white mb-[10px]"></div>
      <div className="flex flex-wrap gap-[3px] ml-[2px] mt-0">
        {arr.map((el: any, index: any) => (
          <div key={index}>
          <ResumeHeading
            content={index === arr.length - 1 ? el : el + " |"}
            componentProperties={{
              ...body1,
              styles: {
                ...body1.styles,
                color: "white",
              },
            }}
          />
        </div>
        ))}
      </div>
    </div>
  );
};

export default SoftSkills;
