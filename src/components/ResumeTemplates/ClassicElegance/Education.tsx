import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import { MdsHeading4 } from "@/utils/components";

const Education = ({ data }: any) => {
  return (
    <div style={{ width: "300px", marginTop: "20px" }}>
      <ResumeHeading
        content={formatString("EDUCATION:")}
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
      <div className="grid gap-[16px] mt-[16px]">
        {data?.education?.map((education: any) => (
          <div>
            <ResumeHeading content={formatString(education.courseName)} />
            <div className="flex gap-[8px]">
              <ResumeHeading content={formatString(education.instituteName)} />
              <div>|</div>
              <ResumeHeading content={formatString(education.duration)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education;
