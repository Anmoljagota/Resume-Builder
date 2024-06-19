import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import {
  MdsHeading5,
  body1,
  body1Md,
  body2,
  body2Md,
  subtitle2,
} from "@/utils/components";

const Education = ({ data, components }: any) => {
  return (
    <div className="mt-[15px]">
      <ResumeHeading
        content={formatString("EDUCATION")}
        componentProperties={body1Md}
      />
      <div className="mt-[5px] flex flex-col gap-[6px]">
        {data?.education?.map((education: any) => (
          <div>
            <div className="flex flex-wrap">
              <ResumeHeading
                content={formatString(education.courseName)}
                componentProperties={body2Md}
              />
            </div>

            <div className="flex flex-col box-content">
              <div className="flex flex-wrap">
                <ResumeHeading
                  content={formatString(education.instituteName)}
                  componentProperties={body2}
                />
              </div>
              {/* <div>|</div> */}
              <ResumeHeading
                content={formatString(education.duration)}
                componentProperties={body2}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
