import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import { Experience } from "@/utils/interfaces";
import { MdsHeading5, body1Md, body2, body2Md, subtitle2 , body4Md, body5Md,body4} from "@/utils/components";

const Experience = ({ data, components }: any) => {
 
  const experienceList = data?.experience || [];

  return (
    <div className="mt-[10px] w-[100%] h-auto" >
    <div className="w-[90%] m-auto left-[5%] h-auto">
      <ResumeHeading content="WORK EXPERIENCE" componentProperties={body4Md} />
      {/* <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div> */}
      <div className="flex flex-col gap-[4px] mt-[2px]">
        {experienceList.map((experience: Experience, index: number) => {
            console.log( experience.highlights,"experience........");
           console.log( experience.highlights.length,"length........");
          return (
            <div key={index} className="flex flex-col">
              <div className="flex flex-col">
                <ResumeHeading content={experience?.orgName} componentProperties={body5Md} />
                {/* <div>|</div> */}
                <ResumeHeading content={experience?.title} componentProperties={body4} />
              </div>

              {/* <ResumeHeading content={experience?.orgAddress} componentProperties={components["ProfessionalEdgeSummaryText"]} /> */}
              <div className="flex">
                <ResumeHeading content={experience?.duration} componentProperties={body4} />

                {/* No Org Adress input */}
                {/* 
                                 <div>|</div>
                             <ResumeHeading content={experience?.orgAddress}
                                componentProperties={body2} 
                                /> */}
              </div>

              <div className="flex flex-col">
                <ResumeHeading content={"Job responsibilities:"} componentProperties={body5Md} />
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
      <hr style={{border:"1px solid #b07f35"}} className="w-[95%] m-auto mt-3"/>
    </div>
  );
};

export default Experience;
