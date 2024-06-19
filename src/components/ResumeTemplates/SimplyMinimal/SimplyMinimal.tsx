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
import { UserProfile } from "@/utils/interfaces";
interface Props {
  user?: UserProfile | null;
  userId?: string;
}
const fetchResumeComponent = async (uniqueLabel: string) => {
  const response = await getComponent({ uniqueLabel });
  console.log(response,"responseee");
  return response?.data?.component || {};
};
const SimplyMinimal = ({ user, userId }: Props) => {
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
        padding: "48px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        color: "#000",
      }}
    >
      <ProfileInformation data={user} components={components} />
      <ContactInformation data={user} components={components} />
      <ProfessionalSummary data={user} components={components} />
      <Education data={user} components={components} />
      <TechnicalSkills data={user} components={components} />
      <SoftSkills data={user} components={components} />
      <Projects data={user} components={components} />
      <Experience data={user} components={components} />
    </div>
  );
};

export default SimplyMinimal;
