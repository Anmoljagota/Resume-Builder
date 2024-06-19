import { formatString } from "@/utils/formatString";
import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading4, body1 } from "@/utils/components";

const ProfessionalSummary = ({ data }: any) => {
  return (
    <div style={{ marginTop: "20px" }}>
      {" "}
      <ResumeHeading
        content={formatString("PROFESSIONAL SUMMARY")}
        componentProperties={{
          ...MdsHeading4,
          styles: {
            ...MdsHeading4.styles,
            color: "#b27a56",
          },
        }}
      />
      {/* <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div> */}
      <div className="mt-[8px]">
        <ResumeHeading
          content={formatString(data?.professionalSummary)}
          componentProperties={body1}
        />
      </div>
    </div>
  );
};

export default ProfessionalSummary;
