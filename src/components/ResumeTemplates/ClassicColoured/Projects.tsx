import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeBulletPoints from "../../ResumeComponents/ResumeBulletPoints";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import {
  MdsHeading5,
  MdsHeading6,
  body1,
  body1Md,
  body2,
  body4Md,
  body2Md,
  body5Md,
  body4,
  subtitle2,
} from "@/utils/components";
import { VscGithub, VscGlobe } from "react-icons/vsc";

const Projects = ({ isEdit, data, components }: any) => {
  const projectsList = data?.projects;

  return (
    <>
    <div className="mt-[15px]  w-[90%] h-[auto] m-auto" >
      <div className=" left-[5%] " >
        <ResumeHeading content="PROJECTS" componentProperties={body4Md} />
        {/* <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div> */}
        <div className="flex flex-col mt-[5px] gap-[2px]" >
          {projectsList?.map((project: any, index: number) => {
            return (
              <div key={index} className="flex flex-col mt-[5px] grid">
                <div className="flex gap-[5px] mb-0">
                  <ResumeHeading
                    content={`${index + 1}.`}
                    componentProperties={body5Md}
                  />
                  <ResumeHeading
                    content={project?.name}
                    componentProperties={body5Md}
                  />

                  {project?.liveProjectUrl && (
                    <>
                      <ResumeHeading
                        content="|"
                        componentProperties={body5Md}
                      />
                      <a
                        href={project?.liveProjectUrl}
                        className="flex items-center gap-[4px] underline"
                      >
                        <VscGlobe style={{ marginRight: "5px" ,color:"#fff"}} />
                        {/* <ResumeHeading
                                            content="Deployed"
                                            componentProperties={body1}
                                        /> */}
                      </a>
                    </>
                  )}

                  {project?.githubUrl && (
                    <>
                      <ResumeHeading
                        content="|"
                        componentProperties={body5Md}
                      />
                      <a
                        href={project?.githubUrl}
                        className="flex items-center gap-[4px] underline"
                      >
                        <VscGithub style={{ marginRight: "5px",color:"#fff" }} />
                        {/* <ResumeHeading
                                            content="Github"
                                            componentProperties={body1}
                                        /> */}
                      </a>
                    </>
                  )}
                </div>

               

                <div className="ml-[18px] mt-2">
                  <ResumeBulletPoints
                    componentProperties={body4}
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
                  <ResumeHeading
                    content={"Nature and Duration:"}
                    componentProperties={body1Md}
                  />
                )}
                <ResumeHeading
                  content={project?.natureAndDuration}
                  componentProperties={body4}
                />
                 <div className="flex flex-wrap justify gap-[3px] ml-[2px] mt-2">
                 <ResumeHeading
                content={"Tech Stack:"}
                componentProperties={body5Md}
              />
                  {project?.techStack.map((el: any, index: any) => (
                    <div key={index}>
                      <ResumeHeading
                        // content={`${el} |`}
                        content={
                          index === project?.techStack.length - 1
                            ? el
                            : el + " |"
                        }
                        componentProperties={body5Md}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}{" "}
        </div>
      </div>
    </div>
      <hr style={{border:"1px solid #b07f35"}} className="w-[95%] m-auto mt-4"/>
     </>
  );
};

export default Projects;
