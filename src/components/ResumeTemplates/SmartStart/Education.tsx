import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import { MdsHeading4, body1, body1Md } from "@/utils/components";

const Education = ({ data }: any) => {
  return (
    <div style={{ width: "300px", marginTop: "20px" }}>
      <ResumeHeading
        content={formatString("EDUCATION")}
        componentProperties={{
          ...body1Md,
          styles: {
            ...body1Md.styles,
            color: "#b27a56",
          },
        }}
      />

      <div className="grid gap-[16px]">
        {data?.education?.map((education: any) => (
          <div>
            <ResumeHeading
              content={formatString(education.courseName)}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                },
              }}
            />
            <div className="flex gap-[8px]">
              <ResumeHeading
                content={formatString(education.instituteName)}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                  },
                }}
              />
              <div>|</div>
              <ResumeHeading
                content={formatString(education.duration)}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
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
