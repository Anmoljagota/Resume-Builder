import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading3, body1, MdsHeading5, body1Md } from "@/utils/components";
import { formatString } from "@/utils/formatString";
import { UserProfile } from "@/utils/interfaces";

interface EducationProps {
  data: UserProfile;
}

const Education = ({ data }: EducationProps) => {
  if (!data?.education?.length) return null;
  return (
    <div>
      <ResumeHeading
        content={"Education"}
        componentProperties={{
          ...MdsHeading3,
          styles: {
            ...MdsHeading3.styles,
            color: "#fff",
          },
        }}
      />
      {/* add a horizontal underline */}
      <div style={{ height: "1px", backgroundColor: "#fff" }}></div>
      <div className="grid gap-[16px] mt-[16px] ">
        {data?.education?.map((education: any, index: any) => (
          <div className="" key={index}>
            <ResumeHeading
              content={formatString(education.courseName)}
              componentProperties={{
                ...body1Md,
                styles: {
                  ...body1Md.styles,
                  color: "#fff",
                },
              }}
            />
            <ResumeHeading
              content={formatString(education.instituteName)}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "#fff",
                },
              }}
            />
            <ResumeHeading
              content={formatString(education.duration)}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "#fff",
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
