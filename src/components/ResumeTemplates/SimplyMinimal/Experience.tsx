import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import { Experience } from "@/utils/interfaces";

const Experience = ({ data, components }: any) => {
  const experienceList = data?.experience || [];
  return (
    <div>
      <ResumeHeading
        content="WORK EXPERIENCE:"
        componentProperties={components["SimplyMinimalHeading3Blue"]}
      />
      <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div>
      <div className="grid gap-[16px]">
        {experienceList.map((experience: Experience, index: number) => {
          return (
            <div key={index} className="grid gap-[4px]">
              <ResumeHeading
                content={experience?.orgName}
                componentProperties={components["SimplyMinimalHeadingBlack"]}
              />

              {/* <ResumeHeading content={experience?.orgAddress} componentProperties={components["ProfessionalEdgeSummaryText"]} /> */}
              <div className="flex gap-[16px]">
                <ResumeHeading
                  content={experience?.title}
                  componentProperties={components["SimplyMinimalTextGray1"]}
                />
                <div>|</div>
                <ResumeHeading
                  content={experience?.duration}
                  componentProperties={components["SimplyMinimalTextGray1"]}
                />
              </div>
              <div className="ml-[32px]">
                <ResumeBulletPoints
                  componentProperties={components["SimpleBulletPoint"]}
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
