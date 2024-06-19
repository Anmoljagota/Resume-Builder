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
        componentProperties={{
          ...body1Md,
          styles: {
            ...body1Md.styles,
            color: "white",
          },
        }}
      />
      <div className="h-[2px] w-[100%] bg-white mb-[10px]"></div>
      <div className="flex flex-col gap-[10px]">
        {data?.education?.map((education: any) => (
          <div>
            <div className="flex fex-wrap">
              <ResumeHeading
                content={formatString(education.courseName)}
                componentProperties={{
                  ...body1Md,
                  styles: {
                    ...body1Md.styles,
                    color: "white",
                  },
                }}
              />
            </div>

            <div className="flex flex-col">
              <div className="flex fex-wrap">
                <ResumeHeading
                  content={formatString(education.instituteName)}
                  componentProperties={{
                    ...body1,
                    styles: {
                      ...body1.styles,
                      color: "white",
                    },
                  }}
                />
              </div>
              {/* <div>|</div> */}
              <ResumeHeading
                content={formatString(education.duration)}
                componentProperties={{
                  ...body2,
                  styles: {
                    ...body2.styles,
                    color: "white",
                  },
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
