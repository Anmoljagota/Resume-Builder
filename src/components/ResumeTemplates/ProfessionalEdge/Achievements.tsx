import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";

const Achievements = ({ data, components }: any) => {
  const achievements = data?.achievements;
  if (!achievements || achievements?.length == 0) return null;
  return (
    <div>
      <ResumeHeading
        content="Achievements"
        componentProperties={components["ProfessionalEdgeSectionHeading"]}
      />
      {achievements?.map((achievement: any, index: number) => {
        return (
          <div>
            <ResumeHeading
              content={achievement?.title}
              componentProperties={components["ExperienceSubheading1"]}
            />
            <ResumeHeading
              content={achievement?.orgName}
              componentProperties={components["ProfessionalEdgeSummaryText"]}
            />
            <ResumeHeading
              content={achievement?.description}
              componentProperties={components["ProfessionalEdgeSummaryText"]}
            />

            {achievement?.certificateUrl && (
              <a
                href={achievement?.certificateUrl}
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

export default Achievements;
