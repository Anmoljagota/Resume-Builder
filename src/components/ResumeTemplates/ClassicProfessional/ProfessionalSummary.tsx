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
} from "@/utils/components";

const ProfessionalSummary = ({ data, components }: any) => {
  return (
    <div className="mr-[24px] text-justify">
      {" "}
      <ResumeHeading
        content={formatString("PROFESSIONAL SUMMARY")}
        componentProperties={body1Md}
      />
      <div className="mt-[8px]">
        <ResumeHeading
          content={formatString(data?.professionalSummary)}
          componentProperties={body2}
        />
      </div>
      <div className="h-[4px] w-[100%] mb-[8px]"></div>
    </div>
  );
};

export default ProfessionalSummary;
