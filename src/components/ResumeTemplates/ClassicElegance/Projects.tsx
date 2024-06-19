import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import {
  MdsHeading4,
  MdsHeading5,
  body1,
  body1Md,
  body2,
  body2Md,
} from "@/utils/components";

const Projects = ({ isEdit, data }: any) => {
  const projectsList = data?.projects;
  return (
    <div style={{ marginTop: "20px" }}>
      <ResumeHeading
        content="PROJECTS"
        componentProperties={{
          ...MdsHeading4,
          styles: {
            ...MdsHeading4.styles,
            color: "#000",
          },
        }}
      />
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
                  componentProperties={body2Md}
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
