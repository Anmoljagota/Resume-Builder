"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { UserProfile } from "@/utils/interfaces";
const AnimatedDiv = dynamic(() => import("@/components/common/AnimatedDiv/AnimatedDiv"), { ssr: false });
const Achievement = dynamic(() => import("@/components/Profile/Form/Achievement"), { ssr: false });
const Certification = dynamic(() => import("@/components/Profile/Form/Certification"), { ssr: false });
const Education = dynamic(() => import("@/components/Profile/Form/Education"), { ssr: false });
const Experience = dynamic(() => import("@/components/Profile/Form/Experience"), { ssr: false });
const PersonalDetails = dynamic(() => import("@/components/Profile/Form/PersonalDetails"), { ssr: false });
const SkillAndInterest = dynamic(() => import("@/components/Profile/Form/SkillAndInterests"), { ssr: false });
const FormFooter = dynamic(() => import("./formHeading/FormFooter"), { ssr: false });
const FormHeader = dynamic(() => import("./formHeading/FormHeader"), { ssr: false });
const Paper = dynamic(() => import("@/components/common/Paper"), { ssr: false });
const Project = dynamic(() => import("@/components/Profile/Form/Project"), { ssr: false });
import { useForm } from "react-hook-form";
import { LeftToRightAnimate } from "@/components/common/AnimatedDiv/data";
import { isEqual } from "lodash";
import { toast } from "react-toastify";
import { switchTabValue } from "@/utils/data/profile.data";
import Stepper, { IStepperProps } from "@/components/common/Stepper";
import { AiOutlineClose } from "react-icons/ai";
import OutlinedButton from "@/components/common/Button/OutlinedButton";
import { useUpdatProfile } from "@/hooks/profile";
import { useQueryClient } from "react-query";
import { autoSavetime } from "@/utils/constant.utils";

interface ProfileFormValues {
  initialProfile: UserProfile;
  tab: string;
  onClickContinue: (value: string) => void;
  steps: IStepperProps;
}

const ProfileFormContainer = ({ initialProfile, tab, onClickContinue, steps }: ProfileFormValues) => {
  const [showSideBar, setShowSideBar] = React.useState(false);
  const [changedData, setChangedData] = React.useState(false);
  const { watch, getValues, setValue, handleSubmit } = useForm<UserProfile>({
    defaultValues: initialProfile,
  });
  const queryClient = useQueryClient();
  const { mutate } = useUpdatProfile({
    onSuccess: () => {
      toast.success("Profile Updated Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
      queryClient.refetchQueries(["myDetails", "self", initialProfile._id]);
      setChangedData(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const updateData = (data: UserProfile) => {
    if (!isEqual(data, initialProfile)) {
      mutate(data);
    }
  };
  const onSubmit = (data: UserProfile) => {
    updateData(data);
    if (switchTabValue[tab] === "personalDetails") {
      document.getElementById("generate-resume")?.click();
    } else {
      onClickContinue(switchTabValue[tab]);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      changedData && updateData(getValues());
    }, autoSavetime);
  }, [changedData]);

  return (
    <form className="relative w-full" onSubmit={handleSubmit(onSubmit)}>
      {tab === "personalDetails" && (
        <AnimatedDiv springValue={LeftToRightAnimate}>
          <Paper className="   pt-[46px] my-20">
            <FormHeader
              data={getValues()}
              showSideBar={showSideBar}
              handleShowSideBar={() => setShowSideBar(!showSideBar)}
            />
            <PersonalDetails
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setChangedData={(value: boolean) => setChangedData(value)}
            />
            <FormFooter />
          </Paper>
        </AnimatedDiv>
      )}
      {tab === "education" && (
        <AnimatedDiv springValue={LeftToRightAnimate}>
          <Paper className=" pt-[46px]  my-20">
            <FormHeader
              data={getValues()}
              showSideBar={showSideBar}
              handleShowSideBar={() => setShowSideBar(!showSideBar)}
            />
            <Education
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setChangedData={(value: boolean) => setChangedData(value)}
            />
            <FormFooter />
          </Paper>
        </AnimatedDiv>
      )}
      {tab === "projects" && (
        <AnimatedDiv springValue={LeftToRightAnimate}>
          <Paper className="   pt-[46px]  my-20">
            <FormHeader
              data={getValues()}
              showSideBar={showSideBar}
              handleShowSideBar={() => setShowSideBar(!showSideBar)}
            />
            <Project
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setChangedData={(value: boolean) => setChangedData(value)}
            />
            <FormFooter />
          </Paper>
        </AnimatedDiv>
      )}
      {tab === "experience" && (
        <AnimatedDiv springValue={LeftToRightAnimate}>
          <Paper className="   pt-[46px]  my-20">
            <FormHeader
              data={getValues()}
              showSideBar={showSideBar}
              handleShowSideBar={() => setShowSideBar(!showSideBar)}
            />
            <Experience
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setChangedData={(value: boolean) => setChangedData(value)}
            />
            <FormFooter />
          </Paper>
        </AnimatedDiv>
      )}
      {tab === "skillsAndInterests" && (
        <AnimatedDiv springValue={LeftToRightAnimate}>
          <Paper className="   pt-[46px]  my-20">
            <FormHeader
              data={getValues()}
              showSideBar={showSideBar}
              handleShowSideBar={() => setShowSideBar(!showSideBar)}
            />
            <SkillAndInterest
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setChangedData={(value: boolean) => setChangedData(value)}
            />
            <FormFooter />
          </Paper>
        </AnimatedDiv>
      )}
      {tab === "certifications" && (
        <AnimatedDiv springValue={LeftToRightAnimate}>
          <Paper className="   pt-[46px]  my-20">
            <FormHeader
              data={getValues()}
              showSideBar={showSideBar}
              handleShowSideBar={() => setShowSideBar(!showSideBar)}
            />
            <Certification
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setChangedData={(value: boolean) => setChangedData(value)}
            />
            <FormFooter />
          </Paper>
        </AnimatedDiv>
      )}
      {tab === "achievements" && (
        <AnimatedDiv springValue={LeftToRightAnimate}>
          <Paper className="   pt-[46px]  my-20">
            <FormHeader
              data={getValues()}
              showSideBar={showSideBar}
              handleShowSideBar={() => setShowSideBar(!showSideBar)}
            />
            <Achievement
              watch={watch}
              getValues={getValues}
              setValue={setValue}
              setChangedData={(value: boolean) => setChangedData(value)}
            />
            <FormFooter />
          </Paper>
        </AnimatedDiv>
      )}
      {showSideBar && (
        // <AnimatedDiv
        //   springValue={{
        //     from: { x: -500, y: 0 },
        //     to: { x: 0, y: 0 },
        //     config: { duration: 600 },
        //     delay: 0,
        //   }}
        // >
        <div
          className="absolute top-0 left-0  backdrop-opacity-10 backdrop-invert lg:hidden  w-full shadow-lg h-full"
          style={{
            backdropFilter: "blur(10px)",
          }}
        >
          <Paper className="relative max-w-[434px] md:p-[55px] xs:p-[30px] sxs:p-[10px] border-box ">
            <div className="w-full flex items-center justify-end">
              <OutlinedButton
                startIcon={
                  <AiOutlineClose className="h-2 w-2 md:h-5 md:w-5 sm:h-4 sm:w-4 sxs:h-3 sxs:w-3" size={"xs"} />
                }
                onClick={() => setShowSideBar(false)}
              />
            </div>
            <Stepper
              steps={steps.steps}
              onClick={(value: string) => {
                setShowSideBar(false);
                steps.onClick(value);
              }}
            />
          </Paper>
        </div>
        // </AnimatedDiv>
      )}
    </form>
  );
};

export default ProfileFormContainer;
