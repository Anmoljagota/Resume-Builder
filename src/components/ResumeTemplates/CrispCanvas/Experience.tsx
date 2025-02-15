import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import { Experience } from "@/utils/interfaces";
import {
  MdsHeading5,
  body1,
  body1Md,
  body2,
  body2Md,
  subtitle2,
} from "@/utils/components";

const Experience = ({ data, components }: any) => {
  const experienceList = data?.experience || [];

  return (
    <div className="mt-[5px]">
      <ResumeHeading content="WORK EXPERIENCE" componentProperties={body1Md} />
      <div className="h-[1.5px] w-[100%] bg-slate-900 mb-[5px]"></div>
      <div className="flex flex-col gap-[2px] mt-[5px]">
        {experienceList.map((experience: Experience, index: number) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="flex flex-col">
                <ResumeHeading
                  content={experience?.orgName}
                  componentProperties={body1Md}
                />
                {/* <div>|</div> */}
                <ResumeHeading
                  content={experience?.title}
                  componentProperties={body2Md}
                />
              </div>

              {/* <ResumeHeading content={experience?.orgAddress} componentProperties={components["ProfessionalEdgeSummaryText"]} /> */}
              <div className="flex gap-[16px] mt-0">
                <ResumeHeading
                  content={experience?.duration}
                  componentProperties={body2}
                />
                {/* No Org Adress input */}
                {/* 
                                 <div>|</div>
                             <ResumeHeading content={experience?.orgAddress}
                                componentProperties={body2} 
                                /> */}
              </div>

              <div className="flex flex-col ">
                <div>
                  <ResumeHeading
                    content={"Job responsibilities:"}
                    componentProperties={body1Md}
                  />
                </div>
                <div className="ml-[32px]">
                  <ResumeBulletPoints
                    content={
                      experience
                        ? experience.areasOfResponsibility?.split("\n")
                        : []
                    }
                    componentProperties={body1}
                  />
                </div>
              </div>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Experience;
