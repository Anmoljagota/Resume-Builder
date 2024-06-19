import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import {
  MdsHeading4,
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
            color: "#b27a56",
          },
        }}
      />
      {/* <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div> */}
      <div className="mt-[-8px]">
        {projectsList?.map((project: any, index: number) => {
          return (
            <div key={index} className="mt-[16px] grid gap-[8px]">
              <div className="flex gap-[16px]">
                <ResumeHeading
                  content={project?.name}
                  componentProperties={body1Md}
                />
                {project?.liveProjectUrl && (
                  <a
                    href={project?.liveProjectUrl}
                    className="flex items-center gap-[4px] underline"
                  >
                    <ResumeHeading content="Live Demo Link" />
                  </a>
                )}
                {project?.githubUrl && (
                  <a
                    href={project?.githubUrl}
                    className="flex items-center gap-[4px] underline"
                  >
                    <ResumeHeading content="Github Repo Link" />
                  </a>
                )}
              </div>
              {/* <ResumeHeading content={project?.description} /> */}

              {project?.highlights?.length > 0 && (
                <div className="">
                  <ResumeHeading
                    content={"Features:"}
                    componentProperties={body1Md}
                  />
                  <div className="ml-[16px]">
                    <ResumeBulletPoints
                      isHtml={project?.features?.length > 0}
                      content={
                        project?.highlights?.length > 0
                          ? project?.highlights
                          : project?.features
                          ? project.features.split("\n")
                          : []
                      }
                      componentProperties={body1}
                    />
                  </div>
                </div>
              )}
              {/* <ResumeHeading content={"Areas Of Responsibility:"} />
              <div className="ml-[32px]">
                <ResumeBulletPoints
                  content={project?.areasOfResponsibility?.split("\n")}
                />
              </div> */}
              <ResumeHeading
                content={"Tech Stack:"}
                componentProperties={body1Md}
              />
              <ResumeTags
                isEdit={isEdit}
                content={project?.techStack}
                componentProperties={body1}
              />
              {/* {project?.natureAndDuration && (
                <ResumeHeading content={"Nature and Duration:"} />
              )} */}
              {/* <ResumeHeading content={project?.natureAndDuration} /> */}
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Projects;
