import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import { MdsHeading5, body1, body1Md, body2,body6Md } from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const TechnicalSkills = ({ data, components }: any) => {
  const technicalSkills = data?.technicalSkills;
  let arr = technicalSkills.map((el: any) => el.name);
  return (
    <div className="mt-[15px]">
      <div className="flex justify-center items-center">

      <ResumeHeading
        content={formatString("TECHNICAL SKILLS")}
        componentProperties={body6Md}
        />
        </div>
      <div className="flex flex-wrap gap-[3px]  w-[90%] m-auto">
        {arr.map((el: any, index: any) => (
          <div key={index}>
            <ResumeHeading
              content={index === arr.length - 1 ? el : el + " |"}
              componentProperties={body2}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalSkills;

