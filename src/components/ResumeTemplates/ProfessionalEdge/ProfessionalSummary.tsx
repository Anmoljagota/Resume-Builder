import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";

const ProfessionalSummary = ({ data, components }: any) => {
  if (!data?.professionalSummary) return null;
  return (
    <div>
      <ResumeHeading
        content="Professional Summary"
        componentProperties={components["ProfessionalEdgeSectionHeading"]}
      />
      <ResumeHeading
        content={data?.professionalSummary}
        componentProperties={components["ProfessionalEdgeSummaryText"]}
      />
    </div>
  );
};

export default ProfessionalSummary;
