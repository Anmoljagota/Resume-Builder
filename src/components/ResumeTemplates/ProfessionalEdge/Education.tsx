import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";

const Education = ({ data, components }: any) => {
  const educationData = data?.education || [];
  if (educationData.length === 0) return null;
  return (
    <div>
      <ResumeHeading
        content="Education"
        componentProperties={components["ProfessionalEdgeSectionHeading"]}
      />
      <div className="grid gap-[16px]">
        {educationData.map((education: any, index: number) => {
          return (
            <div className="grid gap-[4px]">
              <div>
                <ResumeHeading
                  content={education.courseName}
                  componentProperties={components["ExperienceSubheading1"]}
                />
              </div>
              <div>
                <ResumeHeading
                  content={education.instituteName}
                  componentProperties={
                    components["ProfessionalEdgeSummaryText"]
                  }
                />
              </div>
              <div>
                <ResumeHeading
                  content={education.instituteAddress}
                  componentProperties={
                    components["ProfessionalEdgeSummaryText"]
                  }
                />
              </div>
              <div>
                <ResumeHeading
                  content={education.duration}
                  componentProperties={
                    components["ProfessionalEdgeSummaryText"]
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Education;
