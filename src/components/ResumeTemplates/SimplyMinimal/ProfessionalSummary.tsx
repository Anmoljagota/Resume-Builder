import { formatString } from "@/utils/formatString";
import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";

const ProfessionalSummary = ({ data, components }: any) => {
  return (
    <div>
      {" "}
      <ResumeHeading
        content={formatString("PROFESSIONAL SUMMARY:")}
        componentProperties={components["SimplyMinimalHeading3Blue"]}
      />
      <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div>
      <ResumeHeading
        content={formatString(data?.professionalSummary)}
        componentProperties={components["SimplyMinimalTextGray1"]}
      />
    </div>
  );
};

export default ProfessionalSummary;
