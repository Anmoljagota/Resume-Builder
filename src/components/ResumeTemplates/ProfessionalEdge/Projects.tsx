import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import ResumeTags from "../../ResumeComponents/ResumeTags";

const Projects = ({ isEdit, data, components }: any) => {
  const projectsList = data?.projects;
  if (projectsList.length === 0) return null;
  return (
    <div>
      <ResumeHeading
        content="Projects"
        componentProperties={components["ProfessionalEdgeSectionHeading"]}
      />
      <div className="grid gap-[16px]">
        {projectsList?.map((project: any, index: number) => {
          return (
            <div className="grid gap-[8px]" key={index}>
              <ResumeHeading
                content={project?.name}
                componentProperties={components["ExperienceSubheading1"]}
              />

              {/* <ResumeHeading
                content={project?.description}
                componentProperties={components["ProfessionalEdgeSummaryText"]}
              /> */}

              <ResumeHeading
                content={"Features:"}
                componentProperties={components["ExperienceSubheading2"]}
              />
              <ResumeBulletPoints
                componentProperties={components["SimpleBulletPoint"]}
                isHtml={project?.highlights?.length > 0}
                content={
                  project?.highlights?.length > 0
                    ? project?.highlights
                    : project?.features
                    ? project?.features.split("\n")
                    : []
                }
              />

              {/* <ResumeHeading
                content={"Areas Of Responsibility:"}
                componentProperties={components["ExperienceSubheading2"]}
              />
              <ResumeBulletPoints
                componentProperties={components["SimpleBulletPoint"]}
                content={project?.areasOfResponsibility?.split("\n")}
              /> */}
              <ResumeHeading
                content={"Tech Stack:"}
                componentProperties={components["ExperienceSubheading2"]}
              />
              <ResumeTags
                isEdit={isEdit}
                content={project?.techStack}
                componentProperties={components["SkillsTags"]}
              />
              <ResumeHeading
                content={"Nature and Duration:"}
                componentProperties={components["ExperienceSubheading2"]}
              />
              <ResumeHeading
                content={project?.natureAndDuration}
                componentProperties={components["ProfessionalEdgeSummaryText"]}
              />
              {project?.liveProjectUrl && (
                <a
                  target="_blank"
                  href={project?.liveProjectUrl}
                  className="flex items-center gap-[4px]"
                >
                  <ResumeHeading
                    content="Live Demo Link"
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
              {project?.githubUrl && (
                <a
                  target="_blank"
                  href={project?.githubUrl}
                  className="flex items-center gap-[4px]"
                >
                  <ResumeHeading
                    content="Github Repo Link"
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
        })}{" "}
      </div>
    </div>
  );
};

export default Projects;
