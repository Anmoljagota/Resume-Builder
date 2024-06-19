import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeTags from "../../ResumeComponents/ResumeTags";

const Interests = ({ isEdit, data, components }: any) => {
  if (!data?.interests || data?.interests.length == 0) return null;
  return (
    <div>
      {" "}
      <ResumeHeading
        content="Interests"
        componentProperties={components["ProfessionalEdgeSectionHeading"]}
      />
      <ResumeTags
        isEdit={isEdit}
        content={data?.interests}
        componentProperties={components["SkillsTags"]}
      />
    </div>
  );
};

export default Interests;
