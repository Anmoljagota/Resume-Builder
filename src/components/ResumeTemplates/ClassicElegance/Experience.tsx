import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import { Experience } from "@/utils/interfaces";
import { MdsHeading4, body1, body1Md } from "@/utils/components";

const Experience = ({ data }: any) => {
  const experienceList = data?.experience || [];
  return (
    <div style={{ marginTop: "20px" }}>
      <ResumeHeading
        content="WORK EXPERIENCE:"
        componentProperties={{
          ...MdsHeading4,
          styles: {
            ...MdsHeading4.styles,
            color: "#000",
          },
        }}
      />
      <div
        style={{ height: "1px", backgroundColor: "#000" }}
        className=""
      ></div>
      <div className="grid gap-[0px] mt-[16px]">
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
                  componentProperties={body1}
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
