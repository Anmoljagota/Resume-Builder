import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import { Experience } from "@/utils/interfaces";
import {
  MdsHeading4,
  body1,
  body1Md,
  body2,
  body2Md,
} from "@/utils/components";

const Experience = ({ data }: any) => {
  const experienceList = data?.experience || [];
  return (
    <div>
      <ResumeHeading
        content="WORK EXPERIENCE"
        componentProperties={{
          ...MdsHeading4,
          styles: {
            ...MdsHeading4.styles,
            color: "#b27a56",
          },
        }}
      />
      {/* <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div> */}
      <div className="grid gap-[16px] mt-[8px]">
        {experienceList.map((experience: Experience, index: number) => {
          return (
            <div key={index} className="grid gap-[4px]">
              <ResumeHeading
                content={experience?.orgName}
                componentProperties={body1Md}
              />

              {/* <ResumeHeading content={experience?.orgAddress} componentProperties={components["ProfessionalEdgeSummaryText"]} /> */}
              <div className="flex gap-[16px]">
                <ResumeHeading
                  content={experience?.title}
                  componentProperties={body1}
                />
                <div>|</div>
                <ResumeHeading
                  content={experience?.duration}
                  componentProperties={body1}
                />
              </div>
              <div className="ml-[32px]">
                <ResumeBulletPoints
                  content={
                    experience?.highlights ||
                    experience.areasOfResponsibility?.split("\n")
                  }
                />
              </div>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Experience;
