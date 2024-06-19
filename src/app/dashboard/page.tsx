"use client";
import dynamic from "next/dynamic";
import { ResumeList } from "@/components/ResumeHandler/ResumeList";
// import BatchUsernameForm from "@/components/BatchUsernameForm";
import { useGetProfile } from "@/hooks/profile";
import { useLogout, useMyDetails } from "@/hooks/useAuth";
import { UserProfile } from "@/utils/interfaces";
import { Button } from "flowbite-react";
import React, { useEffect } from "react";
import { Routes } from "@/utils/route.utils";
import { CheckUserLoggedIn } from "@/middleware/checkAuth";
import ContentLayout from "@/components/common/Layout/ContentLayout";
import DataCard from "@/components/DashboardComponents/DataCard/DataCard";
import SinglElement from "@/components/DashboardComponents/DataCard/SinglElement";
import { Rating } from "react-simple-star-rating";
const Topbar = dynamic(() => import("@/components/Nav/Topbar"), { ssr: false });
const TopbarComponenet = dynamic(() => import("@/components/MainPageComponents/TopbarComponent"), { ssr: false });

function Dashboard() {
  const { isLoading, error, data } = useMyDetails();
  const [resumeListKey, setResumeListKey] = React.useState<number>(0);
  const { data: profileResponse, isLoading: isLoadingProfile } = useGetProfile({});
  const { mutate: logout, isSuccess } = useLogout();
  CheckUserLoggedIn();

  useEffect(() => {
    if (isSuccess) {
      window.location.href = "/";
    }
  }, [isSuccess]);
  return !data || isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="w-full h-full bg-[#1D0C50] text-[#fff]">
      <Topbar
        background="#2E1971"
        color="#fff"
        stickyBackground="#2E1971"
        childComponent={<TopbarComponenet resumeCreateButtonType="normal" />}
      />
      <ContentLayout>
        <div className="w-full my-11 container">
          <p className="text-[47px] font-medium">Hello {data.name}</p>
          <p className="font-light text-[22px] mb-9">{data.email}</p>
          <hr className="border border-[#886ED5]" />
        </div>
        <div className="container w-full grid grid-cols-3 gap-x-8 mt-7">
          <DataCard label="Projects">
            {profileResponse?.profile?.projects?.map((eachProject) => (
              <div>
                <SinglElement
                  leftChild={<p>{eachProject?.name}</p>}
                  rightChild={
                    <p>
                      <span className="mr-1">{eachProject?.startDate?.split("-")[1]}</span>-
                      <span className="ml-1">{eachProject?.endDate?.split("-")[1]}</span>
                    </p>
                  }
                  key={eachProject?._id}
                />
              </div>
            ))}
          </DataCard>
          <DataCard label="Skills">
            {profileResponse?.profile?.technicalSkills?.map((eachSkill) => (
              <div>
                <SinglElement
                  leftChild={<p>{eachSkill?.name}</p>}
                  rightChild={
                    <p>
                      <Rating size={10} allowFraction={true} readonly initialValue={eachSkill.level || 0} />
                    </p>
                  }
                  key={eachSkill?.level}
                />
              </div>
            ))}
          </DataCard>
          <DataCard label="Education">
            {profileResponse?.profile?.education?.map((eachEducation) => (
              <div>
                <SinglElement
                  leftChild={<p>{eachEducation?.instituteName}</p>}
                  rightChild={
                    <p>
                      {eachEducation?.isPresent ? (
                        "Present"
                      ) : (
                        <>
                          <span className="mr-1"> {eachEducation?.endDate?.split("-")[1]}</span>
                          <span>-</span>
                          <span className="ml-1">{eachEducation?.endDate?.split("-")[1]}</span>
                        </>
                      )}
                    </p>
                  }
                  key={eachEducation?.key}
                />
              </div>
            ))}
          </DataCard>
        </div>
        <div className="container w-full grid grid-cols-3 gap-x-8 mt-7">
          <ResumeList refetchKey={resumeListKey} />
        </div>
      </ContentLayout>
      <div className="text-black container mx-auto">
        <div className="flex justify-between items-center py-2">
          <h1 className="text-black text-2xl mb-2">Welcome {data.name}</h1>
          <div>
            {data && (
              <div className="flex flex-wrap items-center gap-2">
                <div>{data.email}</div>
                <div>
                  <Button color="failure" onClick={() => logout()}>
                    Sign Out
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2 bg-gray-100 rounded-lg my-2 p-2">
            {["Admin", "SuperAdmin"].includes(data.role) && (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-black font-semibold text-xl mb-2">You are an admin</h3>
                </div>
                <div className="flex">
                  <Button href={`/dashboard/users`} size="sm">
                    View Users
                  </Button>
                </div>
                <div className="flex gap-2">
                  <div className="font-semibold">Role:</div>
                  <div>{data.role}</div>
                </div>
              </>
            )}
            {data?.batch && (
              <div className="flex gap-2">
                <div className="font-semibold">Batch:</div>
                <div>{data.batch}</div>
              </div>
            )}
            {data?.username && (
              <div className="flex gap-2">
                <div className="font-semibold">Username:</div>
                <div>{data.username}</div>
              </div>
            )}
            {/* <BatchUsernameForm /> */}
          </div>
        </div>
        {profileResponse && (
          <div>
            <ProfileOverview profile={profileResponse.profile} />
          </div>
        )}
        <div className="flex flex-col gap-2 bg-gray-100 rounded-lg my-2 p-2">
          <div className="flex justify-between items-center">
            <h3 className="text-black font-semibold text-xl mb-2">My Resumes</h3>
          </div>
          <ResumeList refetchKey={resumeListKey} />
        </div>
      </div>
    </div>
  );
}

function ProfileOverview({ profile }: { profile: UserProfile }) {
  return (
    <div className="flex flex-col gap-2 p-2 bg-gray-100 rounded-lg my-4">
      <div className="flex justify-between">
        <h2 className="text-black font-semibold text-xl mb-2">Profile Overview</h2>
        <Button href={Routes.profile(profile._id || "personalDetails")} size="sm">
          Edit Profile
        </Button>
      </div>
      <div className="flex gap-2">
        <div className="font-semibold">Name:</div>
        <div>{profile.name}</div>
      </div>
      <div className="flex gap-2">
        <div className="font-semibold">Projects:</div>
        {profile.projects.length} ({profile.projects.map((project) => project.name).join(", ")})
      </div>
      <div className="flex gap-2">
        <div className="font-semibold">Technical Skills:</div>
        {profile.technicalSkills.length}
      </div>
      <div className="flex gap-2">
        <div className="font-semibold">Soft Skills:</div>
        {profile.softSkills.length}
      </div>
      <div className="flex gap-2">
        <div className="font-semibold">Education:</div>
        {profile.education.length}
      </div>
      <div className="flex">
        <Button href={Routes.profile(profile._id || "personalDetails")} size="sm">
          Edit Profile
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
