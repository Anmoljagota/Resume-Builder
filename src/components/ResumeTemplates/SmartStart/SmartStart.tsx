import React from "react";
import Education from "./Education";
import TechnicalSkills from "./TechnicalSkills";
import SoftSkills from "./SoftSkills";
import Achievements from "./Achievements";
import Interests from "./Interests";
import ProfessionalSummary from "./ProfessionalSummary";
import Projects from "./Projects";
import Experience from "./Experience";
import ProfileInformation from "./ProfileInformation";
import ContactInformation from "./ContactInformation";
import { UserProfile } from "@/utils/interfaces";
import { data } from "./../../../utils/dummy-student-data";

interface Props {
  user?: UserProfile | null;
  userId?: string;
}

const SmartStart = ({ user, userId }: Props) => {
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
        color: "#000",
      }}
      className="relative"
    >
      <div
        // style={{
        //   border: "4px solid #b27a56",
        //   borderRadius: "20px",
        //   color: "white",
        //   width: "80%",
        //   justifyContent: "center",
        //   display: "grid",

        //   flexDirection: "row",
        //   alignItems: "center",
        //   gap: "20px",
        // }}
        className="   bg-[#efe9e3] h-[300px] w-[800px]  top-0 left-0 mx-auto absolute p-[32px]"
      >
        <ProfileInformation data={user} />
      </div>

      <div
        style={{
          display: "grid",
          // flexDirection: "row",
          // justifyContent: "space-evenly",
          // gap: "20px",
          gridTemplateColumns: "38% 62%",
        }}
        className="mt-[300px]"
      >
        <div style={{ background: "#efe9e3" }} className="px-[24px]">
          <ContactInformation data={user} />
          {user?.education?.length > 0 && <Education data={user} />}
          {user?.technicalSkills?.length > 0 && <TechnicalSkills data={user} />}
          {user?.softSkills?.length > 0 && <SoftSkills data={user} />}
          {user?.achievements?.length > 0 && <Achievements data={user} />}
          {user?.interests?.length > 0 && <Interests data={user} />}
        </div>
        <div className="pr-[24px] mt-[16px] ml-[20px]">
          {user?.professionalSummary && <ProfessionalSummary data={user} />}
          {user?.projects?.length > 0 && <Projects data={user} />}
          {user?.experience?.length > 0 && <Experience data={user} />}
        </div>
      </div>
    </div>
  );
};

export default SmartStart;
