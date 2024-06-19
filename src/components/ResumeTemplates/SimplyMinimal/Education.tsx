import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";

const Education = ({ data, components }: any) => {
  return (
    <div>
      <ResumeHeading
        content={formatString("EDUCATION:")}
        componentProperties={components["SimplyMinimalHeading3Blue"]}
      />
      <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div>
      <div className="grid gap-[16px]">
        {data?.education?.map((education: any) => (
          <div>
            <ResumeHeading
              content={formatString(education.courseName)}
              componentProperties={components["SimplyMinimalHeadingBlack"]}
            />
            <div className="flex gap-[8px]">
              <ResumeHeading
                content={formatString(education.instituteName)}
                componentProperties={components["SimplyMinimalHeadingGray1"]}
              />
              <div>|</div>
              <ResumeHeading
                content={formatString(education.duration)}
                componentProperties={components["SimplyMinimalHeadingGray1"]}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
