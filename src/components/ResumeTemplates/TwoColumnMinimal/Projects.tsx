import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import {
  MdsHeading3,
  caption,
  MdsHeading5,
  body2,
  body1,
  body1Md,
} from "@/utils/components";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
const Projects = ({ data, components }: any) => {
  const projectsList = data?.projects;
  return (
    <div>
      <ResumeHeading
        content={"Projects"}
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
      <div className="grid gap-[16px]">
        {projectsList?.map((project: any, index: number) => {
          return (
            <div key={index} className="mt-[16px] grid gap-[8px]">
              <div className="flex gap-[16px]">
                <ResumeHeading
                  content={project?.name}
                  componentProperties={{
                    ...MdsHeading5,
                    styles: {
                      ...MdsHeading5.styles,
                      color: "#000",
                    },
                  }}
                />

                {project?.liveProjectUrl && (
                  <a
                    href={project?.liveProjectUrl}
                    target="_blank"
                    className="flex items-center gap-[4px] underline"
                  >
                    <ResumeHeading
                      content="Live Demo Link"
                      componentProperties={{
                        ...body2,
                        styles: {
                          ...body2.styles,
                          color: "#000",
                        },
                      }}
                    />
                  </a>
                )}
                {project?.githubUrl && (
                  <a
                    target="_blank"
                    href={project?.githubUrl}
                    className="flex items-center gap-[4px] underline"
                  >
                    <ResumeHeading
                      content="Github Repo Link"
                      componentProperties={{
                        ...body2,
                        styles: {
                          ...body2.styles,
                          color: "#000",
                        },
                      }}
                    />
                  </a>
                )}
              </div>
              <div className="mb-[-16px]">
                <ResumeTags
                  content={project?.techStack}
                  componentProperties={components["SkillsTags"]}
                />
              </div>
              {/* <ResumeHeading
                                content={project?.description}
                                componentProperties={components["ProfessionalEdgeSummaryText"]}
                            /> */}

              {/* <ResumeHeading
                                content={"Features:"}
                                componentProperties={{
                                    ...body2,
                                    styles: {
                                        ...body2.styles,
                                        color: "#000",
                                    },
                                }}
                            /> */}
              <div className="ml-[32px]">
                <ResumeBulletPoints
                  componentProperties={{
                    ...body1,
                    styles: {
                      ...body1.styles,
                      color: "#000",
                    },
                  }}
                  isHtml={project?.highlights?.length > 0}
                  content={
                    project?.highlights?.length > 0
                      ? project?.highlights
                      : project?.features
                      ? project?.features.split("\n")
                      : []
                  }
                />
              </div>
              {/* <ResumeHeading
                                content={"Areas Of Responsibility:"}
                                componentProperties={{
                                    ...body2,
                                    styles: {
                                        ...body2.styles,
                                        color: "#000",
                                    },
                                }}
                            /> */}
              {/* <div className="ml-[32px]">
                                <ResumeBulletPoints
                                    componentProperties={{
                                        ...body1,
                                        styles: {
                                            ...body1.styles,
                                            color: "#000",
                                        },
                                    }}
                                    content={project?.areasOfResponsibility}
                                />
                            </div> */}

              {/* {project?.natureAndDuration && (
                                <ResumeHeading
                                    content={"Nature and Duration:"}
                                    componentProperties={{
                                        ...body1Md,
                                        styles: {
                                            ...body1Md.styles,
                                            color: "#000",
                                        },
                                    }}
                                />
                            )}
                            <ResumeHeading
                                content={project?.natureAndDuration}
                                componentProperties={{
                                    ...body1,
                                    styles: {
                                        ...body1.styles,
                                        color: "#000",
                                    },
                                }}
                            /> */}
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Projects;
