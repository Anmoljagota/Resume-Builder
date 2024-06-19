import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";

const Certifications = ({ data, components }: any) => {
  const certifications = data?.certifications;
  if (!certifications || certifications.length === 0) return null;
  return (
    <div>
      <ResumeHeading
        content="Certifications"
        componentProperties={components["ProfessionalEdgeSectionHeading"]}
      />
      {certifications?.map((certification: any, index: number) => {
        return (
          <div>
            <ResumeHeading
              content={certification?.name}
              componentProperties={components["ExperienceSubheading1"]}
            />
            <ResumeHeading
              content={certification?.instituteName}
              componentProperties={components["ProfessionalEdgeSummaryText"]}
            />

            {certification?.certificateUrl && (
              <a
                href={certification?.certificateUrl}
                target="_blank"
                className="flex items-center gap-[4px]"
              >
                <ResumeHeading
                  content="Certification Link"
                  componentProperties={
                    components["ProfessionalEdgeSummaryText"]
                  }
                />
                <img
                  width={"16px"}
                  src="https://masai-website-images.s3.ap-south-1.amazonaws.com/icons8-link-100.png"
                />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Certifications;
