import React from "react";
import ProfileInformation from "./ProfileInformation";
import ContactInformation from "./ContactInformation";
import ProfessionalSummary from "./ProfessionalSummary";
import Education from "./Education";
import TechnicalSkills from "./TechnicalSkills";
import SoftSkills from "./SoftSkills";
import Projects from "./Projects";
import Experience from "./Experience";
import { UserProfile } from "@/utils/interfaces";
import { getComponent } from "@/apis/resume";
import { data } from "./../../../utils/dummy-student-data";
import Achievements from "./Achievements";
import Interests from "./Interests";

interface Props {
  user?: UserProfile | null;
  userId?: string;
}

const ClassicElegance = ({ user, userId }: Props) => {
  return (
    <div
      style={{
        // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        backgroundColor: "white",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
        // padding: "15px",
        display: "flex",
        flexDirection: "column",
        // gap: "20px",
        color: "#000",
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(40,37,34)",
          color: "white",
          width: "100%",
          padding: "15px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <ProfileInformation data={user} />
        <ContactInformation data={user} />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",

          padding: "15px",
        }}
      >
        <div>
          {user?.education?.length > 0 && <Education data={user} />}
          {user?.technicalSkills?.length > 0 && <TechnicalSkills data={user} />}
          {user?.softSkills?.length > 0 && <SoftSkills data={user} />}
          {user?.achievements?.length > 0 && <Achievements data={user} />}
          {user?.interests?.length > 0 && <Interests data={user} />}
        </div>
        <div className="ml-[32px]">
          {user?.professionalSummary && <ProfessionalSummary data={user} />}
          {user?.projects?.length > 0 && <Projects data={user} />}
          {user?.experience?.length > 0 && <Experience data={user} />}
        </div>
      </div>
    </div>
  );
};

export default ClassicElegance;
