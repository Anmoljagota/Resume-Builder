"use client";
import React, { useCallback, useEffect } from "react";
import ProfileInformation from "./ProfileInformation";
import { getComponent } from "@/apis/resume";
import ContactInformation from "./ContactInformation";
import ProfessionalSummary from "./ProfessionalSummary";

import Projects from "./Projects";
import Education from "./Education";
import Experience from "./Experience";
import TechnicalSkills from "./TechnicalSkills";
import SoftSkills from "./SoftSkills";
import Achievements from "./Achievements";
import { UserProfile } from "@/utils/interfaces";
import Certifications from "./Certifications";
import { Resume } from "@/interfaces/Resume";
interface Props {
  user?: Resume;
  userId?: string;
}

const fetchResumeComponent = async (uniqueLabel: string) => {
  const response = await getComponent({ uniqueLabel });
  return response?.data?.component || {};
};

const TwoColumnMinimal = ({ user, userId }: Props) => {
  const [components, setComponents] = React.useState({
    SimplyMinimalHeading1Blue: {},
    SimplyMinimalHeading2Blue: {},
    SimplyMinimalHeading3Blue: {},
    SimplyMinimalHeadingBlack: {},
    SimplyMinimalTextGray1: {},
    SimplyMinimalTextGray2: {},
    SkillsTags: {},
  });

  const fetchData = useCallback(async () => {
    const SimplyMinimalHeading1Blue = await fetchResumeComponent("SimplyMinimalHeading1Blue");
    const SimplyMinimalHeading2Blue = await fetchResumeComponent("SimplyMinimalHeading2Blue");
    const SimplyMinimalHeading3Blue = await fetchResumeComponent("SimplyMinimalHeading3Blue");
    const SimplyMinimalHeadingBlack = await fetchResumeComponent("SimplyMinimalHeadingBlack");
    const SimplyMinimalTextGray1 = await fetchResumeComponent("SimplyMinimalTextGray1");
    const SimplyMinimalTextGray2 = await fetchResumeComponent("SimplyMinimalTextGray2");
    const SkillsTags = await fetchResumeComponent("SkillsTags");
    setComponents({
      SimplyMinimalHeading1Blue: SimplyMinimalHeading1Blue,
      SimplyMinimalHeading2Blue: SimplyMinimalHeading2Blue,
      SimplyMinimalHeading3Blue: SimplyMinimalHeading3Blue,
      SimplyMinimalHeadingBlack: SimplyMinimalHeadingBlack,
      SimplyMinimalTextGray1: SimplyMinimalTextGray1,
      SimplyMinimalTextGray2: SimplyMinimalTextGray2,
      SkillsTags: SkillsTags,
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div
      style={{
        // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        backgroundColor: "white",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
        display: "grid",
        gridTemplateColumns: "38% 62%",
        gap: "20px",
        color: "#000",
      }}
    >
      <div className="bg-[#666]">
        <div className="h-fit bg-[#666] p-[24px] grid gap-[16px]">
          <div>
            <img
              className="mx-auto border-[#585555] border-[8px] text-center h-[150px] w-[150px] rounded-[50%]"
              src={user.photoUrl}
              alt={user.name}
            />
          </div>
          <ContactInformation data={user} components={components} />
          <Education data={user} />
          {user?.technicalSkills?.length > 0 && <TechnicalSkills data={user} components={components} />}
          {user?.softSkills?.length > 0 && <SoftSkills data={user} components={components} />}
          {user?.achievements?.length > 0 && <Achievements data={user} components={components} />}
          {user?.certifications?.length > 0 && <Certifications data={user} components={components} />}
        </div>
      </div>
      <div className=" mr-[32px] p-[24px] grid gap-[16px] h-fit">
        <ProfileInformation data={user} components={components} />
        {user?.professionalSummary && <ProfessionalSummary data={user} />}
        {user?.projects?.length > 0 && <Projects data={user} components={components} />}
        {user?.experience?.length > 0 && <Experience data={user} components={components} />}
      </div>
    </div>
  );
};

export default TwoColumnMinimal;
