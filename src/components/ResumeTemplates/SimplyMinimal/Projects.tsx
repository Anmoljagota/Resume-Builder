import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import ResumeTags from "../../ResumeComponents/ResumeTags";

const Projects = ({ isEdit, data, components }: any) => {
  const projectsList = data?.projects;
  return (
    <div>
      <ResumeHeading
        content="PROJECTS"
        componentProperties={components["SimplyMinimalHeading3Blue"]}
      />
      <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div>
      <div className="grid gap-[16px]">
        {projectsList?.map((project: any, index: number) => {
          return (
            <div key={index} className="mt-[16px] grid gap-[8px]">
              <div className="flex gap-[16px]">
                <ResumeHeading
                  content={project?.name}
                  componentProperties={components["SimplyMinimalHeadingBlack"]}
                />
                {project?.liveProjectUrl && (
                  <a
                    href={project?.liveProjectUrl}
                    target="_blank"
                    className="flex items-center gap-[4px] underline"
                  >
                    <ResumeHeading
                      content="Live Demo Link"
                      componentProperties={components["SimplyMinimalTextGray2"]}
                    />
                  </a>
                )}
                {project?.githubUrl && (
                  <a
                    href={project?.githubUrl}
                    target="_blank"
                    className="flex items-center gap-[4px] underline"
                  >
                    <ResumeHeading
                      content="Github Repo Link"
                      componentProperties={components["SimplyMinimalTextGray2"]}
                    />
                  </a>
                )}
              </div>
              {/* <ResumeHeading
                content={project?.description}
                componentProperties={components["ProfessionalEdgeSummaryText"]}
              /> */}

              <ResumeHeading
                content={"Features:"}
                componentProperties={components["SimplyMinimalTextGray2"]}
              />
              <div className="ml-[32px]">
                <ResumeBulletPoints
                  componentProperties={components["SimpleBulletPoint"]}
                  isHtml={project?.highlights?.length > 0}
                  content={
                    project?.highlights?.length > 0
                      ? project?.highlights
                      : project?.features
                      ? project.features.split("\n")
                      : []
                  }
                />
              </div>
              {/* <ResumeHeading
                                content={"Areas Of Responsibility:"}
                                componentProperties={components["SimplyMinimalTextGray2"]}
                            />
                            <div className="ml-[32px]">
                                <ResumeBulletPoints
                                    componentProperties={components["SimpleBulletPoint"]}
                                    content={project?.areasOfResponsibility?.split('\n')}
                                />
                            </div> */}
              <ResumeHeading
                content={"Tech Stack:"}
                componentProperties={components["SimplyMinimalTextGray2"]}
              />
              <ResumeTags
                isEdit={isEdit}
                content={project?.techStack}
                componentProperties={components["SkillsTags"]}
              />
              {project?.natureAndDuration && (
                <ResumeHeading
                  content={"Nature and Duration:"}
                  componentProperties={components["SimplyMinimalTextGray2"]}
                />
              )}
              <ResumeHeading
                content={project?.natureAndDuration}
                componentProperties={components["ProfessionalEdgeSummaryText"]}
              />
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Projects;
