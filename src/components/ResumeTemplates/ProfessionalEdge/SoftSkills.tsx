import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeTags from "../../ResumeComponents/ResumeTags";

const SoftSkills = ({ isEdit, data, components }: any) => {
  if (!data?.softSkills || data?.softSkills.length == 0) return null;
  return (
    <div>
      <ResumeHeading
        content="Soft Skills"
        componentProperties={components["ProfessionalEdgeSectionHeading"]}
      />
      <ResumeTags
        isEdit={isEdit}
        content={data?.softSkills}
        componentProperties={components["SkillsTags"]}
      />
    </div>
  );
};

export default SoftSkills;
