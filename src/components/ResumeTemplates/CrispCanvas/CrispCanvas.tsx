"use client";
import React, { useCallback, useEffect } from "react";

import { getComponent } from "@/apis/resume";

import { UserProfile } from "@/utils/interfaces";
import ProfessionalSummary from "./ProfessionalSummary";
import ProfileInformation from "./ProfileInformation";
import ContactInformation from "./ContactInformation";
import ProffesionalPhoto from "./ProfessionalPhoto";
import Education from "./Education";
import SoftSkills from "./SoftSkills";
import TechnicalSkills from "./TechnicalSkills";
import Interests from "./Interests";
import Certifications from "./Certifications";
import Projects from "./Projects";
import Experience from "./Experience";
import Achievements from "./Achievements";
interface Props {
  user?: UserProfile | null;
  userId?: string;
}

const CrispCanvas = ({ user, userId }: Props) => {
  console.log(user, "in project page");
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

        color: "#000",
      }}
    >
      <div className="bg-sky-600 pl-4 pr-4 pb-4 pl-[24px]">
        <ProffesionalPhoto data={user} />
        <ContactInformation data={user} />
        {user?.education?.length > 0 && <Education data={user} />}
        {user?.technicalSkills?.length > 0 && <TechnicalSkills data={user} />}
        {user?.softSkills?.length > 0 && <SoftSkills data={user} />}
        {user?.interests?.length > 0 && <Interests data={user} />}
        {user?.certifications?.length > 0 && <Certifications data={user} />}
      </div>

      <div className="pr-[30px] mt-[30px] ml-[20px] mr-[24px]">
        <ProfileInformation data={user} />
        <ProfessionalSummary data={user} />
        {user?.projects?.length > 0 && <Projects data={user} />}
        {user?.experience?.length > 0 && <Experience data={user} />}
        {user?.achievements?.length > 0 && <Achievements data={user} />}
      </div>
    </div>
  );
};

export default CrispCanvas;
