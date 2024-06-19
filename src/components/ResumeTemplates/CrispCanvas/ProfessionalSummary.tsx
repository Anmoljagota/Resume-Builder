import { formatString } from "@/utils/formatString";
import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import {
  MdsHeading1,
  MdsHeading3,
  MdsHeading4,
  MdsHeading5,
  body1,
  body1Md,
  body2,
  body2Md,
  subtitle1,
  subtitle2,
} from "@/utils/components";

const ProfessionalSummary = ({ data, components }: any) => {
  return (
    <div className="text-justify">
      {" "}
      <ResumeHeading
        content={formatString("PROFESSIONAL SUMMARY")}
        componentProperties={body1Md}
      />
      <div className="h-[1.5px] w-[100%] bg-slate-900 mb-[8px]"></div>
      <ResumeHeading
        content={formatString(data?.professionalSummary)}
        componentProperties={{...body1,styles:{
          ...body1.styles,
          textAlign:"Justify",
        }}}
      />
      <div className="h-[4px] w-[100%] mb-[8px]"></div>
    </div>
  );
};

export default ProfessionalSummary;
