"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ContentLayout from "@/components/common/Layout/ContentLayout";
import Sponsors from "@/components/MainPageComponents/Sponsors";
import OverviewBoard from "@/components/MainPageComponents/OverviewBoard";
import EditProfileButton from "@/components/common/Button/Smallcomponents/EditProfileButton";
import AchievementImage from "@/assets/project-image/Achievements.svg";
import JobNameSlider from "@/components/MainPageComponents/JobNameSlider";
import Footer from "@/components/MainPageComponents/Footer";
import ResumeTemplatesSlider from "@/components/MainPageComponents/ResumeTemplatesSlider";
import TopbarComponenet from "@/components/MainPageComponents/TopbarComponent";
import { CheckUserLoggedIn } from "@/middleware/checkAuth";
const Topbar = dynamic(() => import("@/components/Nav/Topbar"), { ssr: false });
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // router.replace("/dashboard");
  }, [router]);
  CheckUserLoggedIn();

  return (
    <div className="w-full h-full background bg-[#1D0C50]">
      <Topbar
        background="none"
        color="#fff"
        stickyBackground="#2E1971"
        childComponent={<TopbarComponenet />}
      />
      <ContentLayout>
        <div className="w-full px-8 border-box  2xl:py-28 xl:py-16 py-10 md:py-12">
          <h1 className="font-semibold text-[30px] sm:text-[40px] md:text-[55px] lg:text-[80px] xl:text-[90px] xl:leading-[91.5px]   xl:w-4/6 w-full md:5/6 text-[#fff] pb-6">
            Increase your chances of getting hired.
          </h1>
          <p className="font-normal leading-normal text-md xl:text-2xl  xl:w-4/6 w-full md:5/6 text-[#fff]">
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using Content here, content here, making it
            look like readable English.
          </p>
        </div>
      </ContentLayout>
      <Sponsors />
      <ContentLayout>
        <div className="px-8 border-box  2xl:py-28 xl:py-16 py-10 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[4fr_0.5fr_6fr] lg:gap-8 items-start">
            <div className="h-full flex flex-col justify-around items-start">
              <div>
                <h1 className="font-medium text-[20px] sm:text-[25px] md:text-[35px] lg:text-[45px] xl:text-[56px]  leading-tight   w-full text-[#fff]">
                  Overview And Edit Your Profile
                </h1>
                <p className="font-normal leading-normal text-md xl:text-[21px] mt-3 lg:mt-6 text-[#fff]">
                  Lorem Ipsum is that it has a more-or-less normal distribution
                  of letters, as opposed to
                </p>
              </div>
              <div className="mt-16">
                <EditProfileButton />
              </div>
            </div>
            <div className="hidden lg:block"></div>
            <OverviewBoard />
          </div>
          <ResumeTemplatesSlider />
          <div className="grid grid-cols-1 lg:grid-cols-[4.4fr_6fr] lg:gap-8 items-start mt-28">
            <div className="h-full flex flex-col justify-around items-start">
              <div>
                <h1 className="font-medium text-[20px] sm:text-[25px] md:text-[35px] lg:text-[45px] xl:text-[56px]  leading-tight   w-full text-[#fff]">
                  Stand out of the crowd
                </h1>
                <p className="font-normal leading-normal text-md xl:text-[21px] mt-3 lg:mt-6 text-[#fff]">
                  Lorem Ipsum is that it has a more-or-less normal distribution
                  of letters, as opposed to using Content here, content here',
                  making it look like readable English. Lorem Ipsum is that it
                  has a more-or-less normal distributi. Lorem Ipsum is that it
                  has a more-or-less normal distribution of letters, as opposed
                  to using Content here, content
                </p>
              </div>
              <div className="mt-16">
                <EditProfileButton />
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-2 sm:gap-y-0 sm:flex-row justify-between items-start gap-x-7 mt-4 lg:mt-0">
              <div
                style={{
                  backgroundImage:
                    " linear-gradient(128deg, #527AFE -0.13%, #1331A3 102.48%)",
                  boxShadow: "30px 30px 80px 0px rgba(0, 0, 0, 0.30)",
                }}
                className="rounded-[40px] w-full h-[300px] sm:h-[380px] lg:h-[450px] xl:h-[525px] p-6 flex flex-col justify-between items-start gap-4"
              >
                <div className="h-full w-full flex items-start justify-start  overflow-hidden">
                  <Image
                    src={AchievementImage}
                    alt="Achievement"
                    className="rounded-b-[16px] h-full w-full"
                  />
                </div>
                <p
                  className="text-lg w-full font-light text-center uppercase"
                  style={{
                    color: "rgba(255, 255, 255, 0.50)",
                  }}
                >
                  resume before
                </p>
              </div>
              <div
                style={{
                  backgroundImage:
                    " linear-gradient(128deg, #527AFE -0.13%, #1331A3 102.48%)",
                  boxShadow: "30px 30px 80px 0px rgba(0, 0, 0, 0.30)",
                }}
                className="rounded-[40px] w-full   h-[300px] sm:h-[380px] lg:h-[450px] xl:h-[525px] p-6 flex flex-col justify-between items-start gap-4"
              >
                <div className="h-full w-full flex items-start justify-start  overflow-hidden">
                  <Image
                    src={AchievementImage}
                    alt="Achievement"
                    className="rounded-b-[16px] h-full w-full"
                  />
                </div>
                <p
                  className="text-lg w-full font-light text-center uppercase"
                  style={{
                    color: "rgba(255, 255, 255, 0.50)",
                  }}
                >
                  AI DOING ITS JOB
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-between items-center gap-8 mt-32">
            <p className="text-[#fff] text-[22px] sm:text-[34px] lg:text-[48px] xl:text-[56px]  font-semibold text-center">
              Want to create for another profile?
            </p>
            <p className="text-[#fff] text-sm xs:text-[16px]  md:text-[18px] xl:text-[21px]  font-medium text-center leading-normal">
              Lorem Ipsum is that it has a more-or-less normal distribution of
              letters, as opposed to using Content here, content here', making
              it look like readable English. Lorem Ipsum is that it has a
              more-or-less normal distributi. Lorem Ipsum is that it has a
              more-or-less normal distribution of letters, as opposed to using
              Content here, content h
            </p>
          </div>
          <div>
            <JobNameSlider />
          </div>
          <div
            className="w-full lg:w-5/6 mx-auto py-12 px-10 sm:px-20 md:px-28 lg:px-36 xl:px-44 flex flex-col justify-between items-center gap-8 mt-40 rounded-3xl"
            style={{
              backgroundImage:
                "linear-gradient(222deg, #527AFF 2.37%, #1230A3 84.49%)",
            }}
          >
            <div className="gap-y-2 w-full">
              <p className="text-center font-semibold text-[22px] sm:text-[28px] md:text-[35px] xl:text-[45px] text-[#fff]">
                Easy-to-built
              </p>
              <p className="text-center font-medium text-sm sm:text-base md:text-lg lg:text-xl xl:text-[22px] text-[#fff] leading-normal">
                Lorem Ipsum is that it has a more-or-less normal as opposed to
                using Content here. distribution of letters,
              </p>
            </div>
            <EditProfileButton />
          </div>
        </div>
      </ContentLayout>
      <Footer />
    </div>
  );
}
