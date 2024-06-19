import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import { Experience } from "@/utils/interfaces";

const Experience = ({ data, components }: any) => {
  const experienceList = data?.experience || [];
  if (experienceList.length === 0) return null;
  return (
    <div>
      <ResumeHeading
        content="Experience"
        componentProperties={components["ProfessionalEdgeSectionHeading"]}
      />
      <div className="grid gap-[16px]">
        {experienceList.map((experience: Experience, index: number) => {
          return (
            <div key={index} className="grid gap-[4px]">
              <ResumeHeading
                content={experience?.title}
                componentProperties={components["ExperienceSubheading1"]}
              />
              <div className="flex gap-1">
                <ResumeHeading
                  content={experience?.orgName}
                  componentProperties={
                    components["ProfessionalEdgeSummaryText"]
                  }
                />
                {experience.duration && (
                  <ResumeHeading
                    content={`(${experience?.duration})`}
                    componentProperties={
                      components["ProfessionalEdgeSummaryText"]
                    }
                  />
                )}
              </div>
              <ResumeBulletPoints
                componentProperties={components["SimpleBulletPoint"]}
                content={
                  experience?.highlights.length
                    ? experience.highlights
                    : experience.areasOfResponsibility?.split("\n")
                }
              />
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Experience;
