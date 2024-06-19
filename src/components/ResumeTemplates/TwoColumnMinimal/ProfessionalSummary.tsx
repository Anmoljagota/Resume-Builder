import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading3, body1 } from "@/utils/components";
import { formatString } from "@/utils/formatString";
import { UserProfile } from "@/utils/interfaces";

interface ProfessionalSummaryProps {
  data: UserProfile;
}

const ProfessionalSummary = ({ data }: ProfessionalSummaryProps) => {
  if (!data?.professionalSummary) return null;
  return (
    <div>
      <ResumeHeading
        content={"Professional Summary"}
        componentProperties={{
          ...MdsHeading3,
          styles: {
            ...MdsHeading3.styles,
            color: "#000",
          },
        }}
      />
      {/* add a horizontal underline */}
      <div style={{ height: "1px", backgroundColor: "#000" }}></div>
      <div className="mt-[8px]">
        <ResumeHeading
          content={formatString(data?.professionalSummary)}
          componentProperties={{
            ...body1,
            styles: {
              ...body1.styles,
              color: "#000",
            },
          }}
        />
      </div>
    </div>
  );
};

export default ProfessionalSummary;
