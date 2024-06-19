"use client";
import React, { useContext } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetProfile } from "@/hooks/profile";

import ProfessionalEdge from "@/components/ResumeTemplates/ProfessionalEdge/ProfessionalEdge";
import SimplyMinimal from "@/components/ResumeTemplates/SimplyMinimal/SimplyMinimal";
import TwoColumnMinimal from "@/components/ResumeTemplates/TwoColumnMinimal/TwoColumnMinimal";
import SmartStart from "@/components/ResumeTemplates/SmartStart/SmartStart";
import ClassicElegance from "@/components/ResumeTemplates/ClassicElegance/ClassicElegance";
import ClassicProfessional from "@/components/ResumeTemplates/ClassicProfessional/ClassicProfessional";
import CrispCanvas from "@/components/ResumeTemplates/CrispCanvas/CrispCanvas";
import ModernMilestone from "@/components/ResumeTemplates/ModernMilestone/ModernMilestone";
import Paper from "@/components/common/Paper";
import VariantButton from "@/components/common/Button/VariantButton";
import { HiDownload } from "react-icons/hi";
import ResumeSlider from "@/components/ResumeComponents/ResumeSlider";
import { twMerge } from "tailwind-merge";
import ResumeEditor from "@/components/ResumeEditor";
import { Routes } from "@/utils/route.utils";
import { GrClose } from "react-icons/gr";
import OutlinedButton from "@/components/common/Button/OutlinedButton";
import AnimatedDiv from "@/components/common/AnimatedDiv/AnimatedDiv";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CheckUserLoggedIn } from "@/middleware/checkAuth";
import { ProfileContext } from "@/context/profile.context";
import { UserProfile } from "@/utils/interfaces";
import ClassicColoured from "@/components/ResumeTemplates/ClassicColoured/ClassicColoured";
import CleanModern from "@/components/ResumeTemplates/CleanModern/CleanModern";
const Topbar = dynamic(() => import("@/components/Nav/Topbar"), { ssr: false });
const ContentLayout = dynamic(
  () => import("@/components/common/Layout/ContentLayout"),
  { ssr: false }
);

function ResumePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [updatedProfile, setUpdatedProfile] =
    React.useState<UserProfile | null>(null);
  const { resumeId, templateName, profileId, fontSize } = Object.fromEntries(
    searchParams.entries()
  );

  const {
    data,
    isLoading,
    isSuccess,
    isFetched,
    refetch,
    dataUpdatedAt,
    isError,
  } = useGetProfile({
    id: profileId || undefined,
    resumeId: resumeId || undefined,
  });
  console.log(data,"data.....")
  const [enableTemplatSelectOption, setEnableTemplateSelectOption] =
    React.useState(false);
  const [showSideBar, setShowSideBar] = React.useState(false);
  CheckUserLoggedIn();
  const { state, dispatch } = useContext(ProfileContext);
  const fontSizeInParams = searchParams?.get("fontSize");

  React.useEffect(() => {
    if (fontSizeInParams) {
      dispatch({ type: "SET_FONT_SIZE", payload: fontSizeInParams });
    } else {
      dispatch({ type: "SET_FONT_SIZE", payload: "medium" });
    }
  }, [fontSizeInParams]);
  React.useEffect(() => {
    setUpdatedProfile(data?.profile || null);
  }, [data]);

  if (isError) return <>No Data Found </>;
  if (isLoading) return <>Loading</>;

  return (
    <>
      <Topbar />
      <ContentLayout>
        <div
          className={twMerge(
            "relative w-full grid grid-cols-1 xl:grid-cols-[7fr_3fr]  px-0 sm:px-4 xl:gap-x-10 lg:gap-x-12 my-20 justify-center items-start",
            `bg-[${!enableTemplatSelectOption ? "#FFF" : "gray-300"}]`
            )}
           
        >
          <Paper className="flex flex-col  gap-4 items-center w-full p-1 relative">
            <div className="flex xl:hidden w-full justify-start items-center ">
              <OutlinedButton
                startIcon={<AiOutlineArrowRight className="h-6 w-6" />}
                onClick={() => setShowSideBar(true)}
                label=""
             
              />
            </div>
            {data?.profile ? (
              <>
                {templateName === "ProfessionalEdge" ? (
                  <div className="w-full">
                    <ProfessionalEdge userData={updatedProfile} />
                  </div>
                ) : null}
                {templateName === "SimplyMinimal" ? (
                  <div>
                    <SimplyMinimal user={updatedProfile} />
                  </div>
                ) : null}

                {templateName === "TwoColumnMinimal" ? (
                  <div>
                    <TwoColumnMinimal user={updatedProfile} />
                  </div>
                ) : null}
                {templateName === "ClassicProfessional" ? (
                  <div >
                    <ClassicProfessional user={updatedProfile} />
                  </div>
                ) : null}
                {templateName === "CrispCanvas" ? (
                  <div>
                    <CrispCanvas user={updatedProfile} />
                  </div>
                ) : null}
                {templateName === "ModernMilestone" ? (
                  <div>
                    <ModernMilestone user={updatedProfile} />
                  </div>
                ) : null}
                {templateName === "ClassicElegance" ? (
                  <div>
                    <ClassicElegance user={updatedProfile} />
                  </div>
                ) : null}
                {templateName === "SmartStart" ? (
                  <div>
                    <SmartStart user={updatedProfile} />
                  </div>
                ) : null}
                 {templateName === "ClassicColoured" ? (
                  <div className="w-full h-[auto]">
                    <ClassicColoured user={updatedProfile} />
                  </div>
                ) : null}
                 {templateName === "CleanModern" ? (
                  <div className="w-full flex justify-center">
                     <div className="scale-resume">

                    <CleanModern user={updatedProfile} />
                     </div>
                  </div>
                ) : null}
              </>
            ) : null}
            <div className="w-full h-full relative bottom-0    group my-2">
              <div className="sticky bottom-0 w-full flex justify-center items-center gap-x-3 ">
                <button
                  className="border py-2 px-7 text-[#343434] font-medium text-lg border-[#CBCBCB] rounded-full hover:bg-[#FFF]"
                  onClick={() => {
                    router.push(
                      Routes.resume.view(
                        resumeId,
                        templateName,
                        fontSize || "small"
                      )
                    );
                  }}
                >
                  Preview
                </button>
                <VariantButton
                  label="Download"
                  startIcon={<HiDownload className="h-6 w-6 text-[#FFF]" />}
                  onClick={() => {
                    const anchor = document.createElement("a");
                    anchor.href = Routes.resume.download(
                      resumeId,
                      templateName,
                      fontSize || "small"
                    );
                    anchor.target = "_blank";
                    anchor.click();
                  }}
                />
              </div>
            </div>
            {showSideBar && (
              <AnimatedDiv
                springValue={{
                  from: { x: -500, y: 0 },
                  to: { x: 0, y: 0 },
                  config: { duration: 1000 },
                  delay: 0,
                }}
              >
                <div
                  className="absolute top-0 left-0 w-full h-full backdrop-opacity-10 backdrop-invert"
                  style={{
                    backdropFilter: "blur(10px)",
                  
                  }}
                >
                  <Paper
                    className="p-3 w-[100%] xs:w-[50%]"
                    style={{ height: "100%" }}
                  >
                    <div className="flex items-center justify-end mb-[-15px]">
                      <OutlinedButton
                        label=""
                        startIcon={<GrClose className="h-6 w-6-" />}
                        onClick={() => setShowSideBar(false)}
                      />
                    </div>
                    {data?.originalProfile && (
                      <ResumeEditor
                        key={dataUpdatedAt}
                        refetch={refetch}
                        originalProfile={data?.originalProfile}
                        resume={data?.resume}
                        onUpdate={() => {
                          refetch();
                        }}
                        selectedTemplateName={templateName || ""}
                        onClickExploreTemplate={() =>
                          setEnableTemplateSelectOption(true)
                        }
                        onSelecetFontSize={(value: string) => {
                          router.push(
                            `${Routes.resume.main(
                              resumeId,
                              templateName
                            )}&fontSize=${value}`
                          );
                        }}
                        selectedFont={fontSize}
                        onClickViewResume={() => {
                          router.push(
                            Routes.resume.view(
                              resumeId,
                              templateName,
                              fontSize || "small"
                            )
                          );
                        }}
                        setUpdatedProfile={setUpdatedProfile}
                        updatedProfile={updatedProfile}
                      />
                    )}
                  </Paper>
                </div>
              </AnimatedDiv>
            )}
          </Paper>
          <div className="invisible xl:visible">
            <ResumeEditor
              key={dataUpdatedAt}
              refetch={refetch}
              originalProfile={data?.originalProfile}
              resume={data?.resume}
              onUpdate={() => {
                refetch();
              }}
              selectedTemplateName={templateName || ""}
              onClickExploreTemplate={() => setEnableTemplateSelectOption(true)}
              onSelecetFontSize={(value: string) => {
                router.push(
                  `${Routes.resume.main(
                    resumeId,
                    templateName
                  )}&fontSize=${value}`
                );
              }}
              selectedFont={fontSize}
              onClickViewResume={() => {
                router.push(
                  Routes.resume.view(
                    resumeId,
                    templateName,
                    fontSize || "small"
                  )
                );
              }}
              templateName={templateName || ""}
              setUpdatedProfile={setUpdatedProfile}
              updatedProfile={updatedProfile}
            />
          </div>
        </div>
        <ResumeSlider
          onSelectTemplate={(value: string) => {
            setEnableTemplateSelectOption(false);
            setShowSideBar(false);
            router.push(
              `${Routes.resume.main(resumeId, value)}&fontSize=${
                fontSize || "small"
              }`
            );
          }}
          displayTemplate={enableTemplatSelectOption}
          onCloseTemplateModal={() => setEnableTemplateSelectOption(false)}
        />
      </ContentLayout>
    </>
  );
}

export default ResumePage;
