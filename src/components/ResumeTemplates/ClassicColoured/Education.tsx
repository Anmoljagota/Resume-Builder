import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import {
  MdsHeading5,
  body1,
  body1Md,
  body2,
  body5Md,
  body2Md,
  subtitle2,
  body4Md,
  body4
} from "@/utils/components";

const Education = ({ data, components }: any) => {
  return (
    <>
    <div  className="mt-[15px] w-[100%] h-[auto] " >
     

     
       <div className="w-[90%] m-auto left-[5%] h-auto" >
      <ResumeHeading
        content={formatString("EDUCATION")}
        componentProperties={body4Md}
      />
      <div className="mt-[5px] flex flex-col gap-[6px]">
        {data?.education?.map((education: any) => (
          <div>
            <div className="flex flex-wrap">
              <ResumeHeading
                content={formatString(education.courseName)}
                componentProperties={body5Md}
              />
            </div>

            <div className="flex flex-col box-content">
              <div className="flex flex-wrap">
                <ResumeHeading
                  content={formatString(education.instituteName)}
                  componentProperties={body4}
                  />
              </div>
              {/* <div>|</div> */}
              <ResumeHeading
                content={formatString(education.duration)}
                componentProperties={body2}
                />
            </div>
          </div>
        ))}
      </div>
      </div>
      </div>
      <hr style={{border:"1px solid #b07f35"}} className="w-[95%] m-auto mt-3"/>
    
    
        </>
  );
};

export default Education;

