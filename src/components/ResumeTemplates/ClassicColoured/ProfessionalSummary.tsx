import { formatString } from "@/utils/formatString";
import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import {
  MdsHeading1,
  MdsHeading4,
  MdsHeading5,
  MdsHeading6,
  body1,
  body1Md,
  body2,
  body2Md,
  subtitle1,
  subtitle2,
  body6Md,
  body5
} from "@/utils/components";

const ProfessionalSummary = ({ data, components }: any) => {
  return (
    <div className="text-justify mt-5 w-[90%] m-auto">
      {" "}
      <div className="flex justify-center items-center">

      <ResumeHeading
        content={formatString("SUMMARY")}
        componentProperties={body6Md}
        />
        </div>
      <div className="mt-[8px]">
        <ResumeHeading
          content={formatString(data?.professionalSummary)}
          componentProperties={body5}
        />
      </div>
      <div className="h-[4px] w-[100%] mb-[8px]"></div>
    </div>
  );
};

export default ProfessionalSummary;
