import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading3, caption, MdsHeading5, body2, body1, body1Md } from "@/utils/components";

import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
const Experience = ({ data, components }: any) => {
  const experienceList = data?.experience || [];
  if (!experienceList.length) return null;
  return (
    <div>
      <ResumeHeading
        content={"Experience"}
        componentProperties={{
          ...MdsHeading3,
          styles: {
            ...MdsHeading3.styles,
            color: "#000",
          },
        }}
      />
      {/* add a horizontal underline */}
      <div style={{ height: "1px", backgroundColor: "#000" }}></div>
      <div className="grid gap-[16px] mt-[8px]">
        {experienceList.map((experience: any, index: number) => {
          return (
            <div key={index} className="grid gap-[4px]">
              {/* <ResumeHeading content={experience?.orgAddress} componentProperties={components["ProfessionalEdgeSummaryText"]} /> */}

              <div className="flex gap-[4px]">
                <ResumeHeading
                  content={experience?.orgName}
                  componentProperties={{
                    ...body1Md,
                    styles: {
                      ...body1Md.styles,
                      color: "#000",
                    },
                  }}
                />
                {experience.orgName && experience.title && <div>|</div>}
                <ResumeHeading
                  content={experience?.title}
                  componentProperties={{
                    ...body1,
                    styles: {
                      ...body1.styles,
                      color: "#000",
                    },
                  }}
                />
              </div>
              <div className="flex gap-[4px]">
                <ResumeHeading
                  content={experience?.duration}
                  componentProperties={{
                    ...body2,
                    styles: {
                      ...body2.styles,
                      color: "#000",
                    },
                  }}
                />
                {experience.duration && experience.orgAddress && <div>|</div>}
                <ResumeHeading
                  content={experience?.orgAddress}
                  componentProperties={{
                    ...body2,
                    styles: {
                      ...body2.styles,
                      color: "#000",
                    },
                  }}
                />
              </div>
              <div className="ml-[32px]">
                <ResumeBulletPoints
                  componentProperties={{
                    ...body1,
                    styles: {
                      ...body1.styles,
                      color: "#000",
                    },
                  }}
                  content={
                    experience?.highlights?.length > 0
                      ? experience?.highlights?.split("\n")
                      : experience.areasOfResponsibility?.split("\n")
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
