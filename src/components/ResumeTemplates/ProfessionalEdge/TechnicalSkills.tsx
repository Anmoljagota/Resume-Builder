import React, { useEffect } from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeTags from "../../ResumeComponents/ResumeTags";

const TechnicalSkills = ({ isEdit, data, components }: any) => {
  if (!data?.technicalSkills || data?.technicalSkills.length == 0) return null;
  return (
    <div>
      {" "}
      <ResumeHeading
        content="Technical Skills"
        componentProperties={components["ProfessionalEdgeSectionHeading"]}
      />
      <ResumeTags
        key="technicalSkills"
        isEdit={isEdit}
        content={data?.technicalSkills}
        componentProperties={components["SkillsTags"]}
      />
    </div>
  );
};

export default TechnicalSkills;
