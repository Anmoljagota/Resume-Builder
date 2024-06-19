"use client";
import dynamic from "next/dynamic";
import { defineStepIconColor } from "@/components/common/Stepper";
import { useGetProfile } from "@/hooks/profile";
import { ProfileTabStatus } from "@/interfaces/profile";
import { ProfileTabs } from "@/utils/data/profile.data";
import { UserProfile } from "@/utils/interfaces";
import { Routes } from "@/utils/route.utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineSchool, MdStarOutline, MdOutlineAppRegistration, MdOutlineAddTask } from "react-icons/md";
import { CheckUserLoggedIn } from "@/middleware/checkAuth";
const Paper = dynamic(() => import("@/components/common/Paper"));
const Stepper = dynamic(() => import("@/components/common/Stepper"));
const ProfileFormContainer = dynamic(() => import("@/components/Profile/Form/ProfileFormContainer"));

function Profile() {
  const searchParams = useSearchParams();
  let id = searchParams.get("profileId");
  let tab = searchParams.get("tab");
  const router = useRouter();
  CheckUserLoggedIn();

  if (!tab) {
    tab = "personalDetails";
  }

  const { data } = useGetProfile({
    id: id || "my",
  });
  const onUpdateData = (value: string) => {
    switchTab(value);
  };
  const creatingTabData = (data: UserProfile, name: string, value: string) => {
    const tabData = {
      id: `${data._id}-${value}`,
      name: name,
      value: value,
      icon: <FaRegUser className={`h-4 w-5`} color="#D9D9D9" />,
      status: ProfileTabStatus.NONE,
    };

    switch (value) {
      case "personalDetails":
        if (data?.name || data?.header || data?.photoUrl) {
          tabData.status = ProfileTabStatus.COMPLETED;
        }
        tabData.icon = (
          <FaRegUser
            className={`h-4 w-5`}
            color={defineStepIconColor(tabData.status, tab || "personalDetails", value)}
          />
        );
        break;
      case "education":
        if (data?.education?.length > 0) {
          tabData.status = ProfileTabStatus.COMPLETED;
        }
        tabData.icon = (
          <MdOutlineSchool
            className={`h-5 w-6`}
            color={defineStepIconColor(tabData.status, tab || "personalDetails", value)}
          />
        );
        break;
      case "projects":
        if (data?.projects?.length > 0) {
          tabData.status = ProfileTabStatus.COMPLETED;
        }
        tabData.icon = (
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-5`} viewBox="0 0 18 19" fill="none">
            <path
              d="M13.3155 18.1867L11.957 16.8282L13.4225 15.3394L11.957 13.8738L13.3155 12.4781L14.8043 13.9669L16.2699 12.4781L17.6656 13.8738L16.1768 15.3394L17.6656 16.8282L16.2699 18.1867L14.8043 16.7212L13.3155 18.1867ZM2.82873 16.3536C3.13115 16.3536 3.36843 16.2652 3.54987 16.0931C3.73132 15.9209 3.81972 15.679 3.81972 15.3719C3.81972 15.0649 3.73132 14.8322 3.54987 14.6508C3.36843 14.4693 3.1358 14.3809 2.852 14.3809C2.53562 14.3809 2.28904 14.4693 2.11224 14.6508C1.93545 14.8322 1.8517 15.0649 1.8517 15.3487C1.8517 15.665 1.9401 15.9116 2.11224 16.0884C2.28439 16.2652 2.52632 16.349 2.83339 16.349L2.82873 16.3536ZM2.852 18.196C2.04711 18.196 1.37249 17.9215 0.823496 17.3725C0.274499 16.8235 0 16.1536 0 15.358C0 14.5624 0.274499 13.9157 0.823496 13.362C1.37249 12.8084 2.04246 12.5339 2.83804 12.5339C3.41495 12.5339 3.93603 12.7014 4.40594 13.0317C4.87119 13.362 5.20617 13.7901 5.40158 14.3112C6.06689 14.3112 6.6438 14.0739 7.13232 13.604C7.61618 13.1341 7.86276 12.5618 7.86276 11.8918V7.41147C7.86276 6.14133 8.3094 5.05729 9.19804 4.15935C10.0867 3.26142 11.1707 2.81478 12.4501 2.81478H13.9157L12.4641 1.39576L13.8599 0L17.6517 3.79181L13.8599 7.56965L12.4641 6.21112L13.9157 4.74557H12.4501C11.7057 4.74557 11.0777 5.00146 10.5659 5.51789C10.0541 6.03432 9.79821 6.66241 9.79821 7.40681V11.8965C9.79821 13.0829 9.38414 14.0971 8.55133 14.9392C7.71853 15.7814 6.71824 16.2094 5.55046 16.228C5.3504 16.8282 4.99681 17.3074 4.49899 17.661C4.00117 18.0146 3.45217 18.1867 2.852 18.1867V18.196ZM1.35854 6.26229L0 4.90376L1.46554 3.41495L0 1.94941L1.35854 0.558303L2.84734 2.04711L4.31289 0.558303L5.69469 1.95406L4.20588 3.4196L5.69469 4.90841L4.31289 6.26695L2.84734 4.8014L1.35854 6.26695V6.26229Z"
              fill={defineStepIconColor(tabData.status, tab || "personalDetails", value)}
            />
          </svg>
        );
        break;
      case "experience":
        if (data?.experience?.length > 0) {
          tabData.status = ProfileTabStatus.COMPLETED;
        }
        tabData.icon = (
          <MdOutlineAddTask
            className={`h-5 w-6`}
            color={defineStepIconColor(tabData.status, tab || "personalDetails", value)}
          />
        );
        break;
      case "skillsAndInterests":
        if (data?.softSkills?.length > 0 || data?.technicalSkills?.length > 0 || data?.interests?.length > 0) {
          tabData.status = ProfileTabStatus.COMPLETED;
        }
        tabData.icon = (
          <MdStarOutline
            className={`h-5 w-6`}
            color={defineStepIconColor(tabData.status, tab || "personalDetails", value)}
          />
        );
        break;
      case "certifications":
        if (data?.certifications?.length > 0) {
          tabData.status = ProfileTabStatus.COMPLETED;
        }
        tabData.icon = (
          <MdOutlineAppRegistration
            className={`h-5 w-6`}
            color={defineStepIconColor(tabData.status, tab || "personalDetails", value)}
          />
        );
        break;
      case "achievements":
        if (data?.achievements?.length > 0) {
          tabData.status = ProfileTabStatus.COMPLETED;
        }
        tabData.icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className={`h-5 w-6`}
          >
            <path
              d="M6.61123 14.3437C6.83921 14.3437 7.04392 14.2553 7.21606 14.0832C7.39286 13.911 7.48125 13.7063 7.48125 13.4737C7.48125 13.2411 7.39286 13.0364 7.21606 12.8596C7.03926 12.6828 6.83455 12.5944 6.59728 12.5944C6.36465 12.5944 6.16459 12.6828 5.9971 12.8596C5.82961 13.0364 5.74586 13.2457 5.74586 13.4877C5.74586 13.7296 5.83426 13.925 6.0064 14.0925C6.17855 14.26 6.38326 14.3437 6.61589 14.3437H6.61123ZM9.74703 14.3437C9.97966 14.3437 10.1844 14.2553 10.3612 14.0832C10.538 13.911 10.6264 13.7063 10.6264 13.4737C10.6264 13.2411 10.538 13.0364 10.3612 12.8596C10.1844 12.6828 9.97501 12.5944 9.73307 12.5944C9.50045 12.5944 9.29574 12.6828 9.12825 12.8596C8.96076 13.0364 8.87701 13.2457 8.87701 13.4877C8.87701 13.7296 8.96541 13.925 9.13755 14.0925C9.3097 14.26 9.51441 14.3437 9.74703 14.3437ZM12.8921 14.3437C13.1201 14.3437 13.3248 14.2553 13.497 14.0832C13.6738 13.911 13.7622 13.7063 13.7622 13.4737C13.7622 13.2411 13.6738 13.0364 13.497 12.8596C13.3202 12.6828 13.1155 12.5944 12.8782 12.5944C12.6456 12.5944 12.4455 12.6828 12.278 12.8596C12.1105 13.0364 12.0268 13.2457 12.0268 13.4877C12.0268 13.7296 12.1152 13.925 12.2873 14.0925C12.4595 14.26 12.6642 14.3437 12.8968 14.3437H12.8921ZM8.76535 11.1288L13.697 6.22042L12.4269 4.98285L8.78396 8.64438L6.94156 6.8206L5.68073 8.04421L8.76535 11.1288ZM9.73773 19.5034C8.39315 19.5034 7.13232 19.2475 5.94592 18.7404C4.75953 18.2332 3.72667 17.5354 2.84734 16.656C1.96802 15.7767 1.27014 14.7392 0.763013 13.5528C0.255889 12.3664 0 11.0963 0 9.75168C0 8.40711 0.255889 7.14162 0.763013 5.95988C1.27014 4.77814 1.96802 3.74063 2.85665 2.85665C3.74063 1.97267 4.77814 1.27479 5.95523 0.767666C7.13697 0.255889 8.40245 0 9.74238 0C11.087 0 12.3571 0.251236 13.5481 0.758361C14.7392 1.26549 15.772 1.95871 16.656 2.84734C17.54 3.73132 18.2332 4.76883 18.7404 5.95988C19.2475 7.14627 19.5034 8.41641 19.5034 9.76564C19.5034 11.1149 19.2475 12.3757 18.7404 13.5528C18.2332 14.7299 17.5354 15.7581 16.6514 16.6421C15.7674 17.526 14.7299 18.2239 13.5435 18.7357C12.3571 19.2475 11.0916 19.5034 9.74238 19.5034H9.73773ZM9.74703 17.5679C11.9011 17.5679 13.7389 16.8049 15.2603 15.2835C16.7863 13.7575 17.5447 11.9151 17.5447 9.75168C17.5447 7.59757 16.7863 5.75982 15.2649 4.23845C13.7482 2.71242 11.9011 1.95406 9.73307 1.95406C7.565 1.95406 5.74586 2.71242 4.21984 4.23379C2.69381 5.75052 1.9308 7.59757 1.9308 9.76564C1.9308 11.9337 2.69381 13.7529 4.21518 15.2789C5.74121 16.8049 7.58361 17.5679 9.74703 17.5679Z"
              fill={defineStepIconColor(tabData.status, tab || "personalDetails", value)}
            />
          </svg>
        );
        break;
      default:
        tabData.status = ProfileTabStatus.NONE;
        break;
    }
    if (tab === value) {
      tabData.status = ProfileTabStatus.ACTIVE;
    }

    return tabData;
  };
  const TabData = React.useCallback(() => {
    const tabData: ProfileTabs[] = [];
    data?.profile &&
      ProfileTabs.map((tab) => {
        tabData.push(creatingTabData(data?.profile, tab.name, tab.value));
      });

    return tabData;
  }, [data?.profile, tab]);

  const switchTab = (tab: string) => {
    router.push(Routes.profile(id || "my", tab));
  };

  return (
    <div className="w-full lg:grid lg:grid-cols-[4fr_8fr] lg:items-start lg:gap-x-10 ">
      {data?.profile && (
        <>
          <Paper className="max-w-[434px] p-[55px] border-box h-[664px] my-20 hidden lg:block">
            <Stepper
              steps={TabData()}
              onClick={(value: string) => {
                switchTab(value);
              }}
            />
          </Paper>
          <ProfileFormContainer
            initialProfile={data?.profile}
            tab={tab || ""}
            onClickContinue={onUpdateData}
            steps={{
              steps: TabData(),
              onClick: (value: string) => {
                switchTab(value);
              },
            }}
          />
        </>
      )}
    </div>
  );
}
export default Profile;
