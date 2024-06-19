import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import { MdsHeading5, MdsHeading6, body1, body1Md, body2, body2Md, subtitle2 } from "@/utils/components";
import { VscGithub, VscGlobe } from "react-icons/vsc";

const Projects = ({ isEdit, data, components }: any) => {
  const projectsList = data?.projects;
  return (
    <div>
      <ResumeHeading content="PROJECTS" componentProperties={body1Md} />
      <div className="h-[1.5px] w-[100%] bg-slate-900 mt-[2px]"></div>
      <div className="flex flex-col mt-[5px] gap-[2px]">
        {projectsList?.map((project: any, index: number) => {
          return (
            <div key={index} className="flex flex-col mt-[5px] grid">
              <div className="flex gap-[5px] mb-0">
                <ResumeHeading content={`${index + 1}.`} componentProperties={body1Md} />
                <ResumeHeading content={project?.name} componentProperties={body1Md} />

                {project?.liveProjectUrl && (
                  <>
                    <ResumeHeading content="|" componentProperties={body2Md} />
                    <a href={project?.liveProjectUrl} className="flex items-center gap-[4px] underline">
                      <VscGlobe style={{ marginRight: "5px" }} />
                      {/* <ResumeHeading
                                            content="Deployed"
                                            componentProperties={body1}
                                        /> */}
                    </a>
                  </>
                )}

                {project?.githubUrl && (
                  <>
                    <ResumeHeading content="|" componentProperties={body2Md} />
                    <a href={project?.githubUrl} className="flex items-center gap-[4px] underline">
                      <VscGithub style={{ marginRight: "5px" }} />
                      {/* <ResumeHeading
                                            content="Github"
                                            componentProperties={body1}
                                        /> */}
                    </a>
                  </>
                )}
              </div>

              <div className="flex flex-wrap justify gap-[3px] ml-[2px] mt-0">
                {project?.techStack.map((el: any, index: any) => (
                  <div key={index}>
                    <ResumeHeading
                      content={index === project?.techStack.length - 1 ? el : el + " |"}
                      componentProperties={body2Md}
                    />
                  </div>
                ))}
              </div>
              <div className="ml-[32px]">
                <ResumeBulletPoints
                  componentProperties={body1}
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
              {project?.natureAndDuration && (
                <ResumeHeading content={"Nature and Duration:"} componentProperties={body1Md} />
              )}
              <ResumeHeading content={project?.natureAndDuration} componentProperties={body1} />
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default Projects;
