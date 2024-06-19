import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import { Experience } from "@/utils/interfaces";
import { MdsHeading5, body1Md, body2, body2Md, subtitle2 } from "@/utils/components";

const Experience = ({ data, components }: any) => {
  const experienceList = data?.experience || [];

  return (
    <div className="mt-[15px]">
      <ResumeHeading content="WORK EXPERIENCE" componentProperties={body1Md} />
      {/* <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div> */}
      <div className="flex flex-col gap-[4px] mt-[2px]">
        {experienceList.map((experience: Experience, index: number) => {
          return (
            <div key={index} className="flex flex-col">
              <div className="flex flex-col">
                <ResumeHeading content={experience?.orgName} componentProperties={body1Md} />
                {/* <div>|</div> */}
                <ResumeHeading content={experience?.title} componentProperties={body2Md} />
              </div>

              {/* <ResumeHeading content={experience?.orgAddress} componentProperties={components["ProfessionalEdgeSummaryText"]} /> */}
              <div className="flex">
                <ResumeHeading content={experience?.duration} componentProperties={body2} />

                {/* No Org Adress input */}
                {/* 
                                 <div>|</div>
                             <ResumeHeading content={experience?.orgAddress}
                                componentProperties={body2} 
                                /> */}
              </div>

              <div className="flex flex-col">
                <ResumeHeading content={"Job responsibilities:"} componentProperties={body2Md} />
                <div className="ml-[32px]">
                  <ResumeBulletPoints
                    content={
                      experience?.highlights?.length
                        ? experience.highlights
                        : experience.areasOfResponsibility?.split("\n")
                    }
                    componentProperties={body2}
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
