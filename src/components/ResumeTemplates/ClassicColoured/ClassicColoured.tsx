"use client";
import ResumeHeading from "@/components/ResumeComponents/ResumeHeading";
import React, { useCallback, useEffect } from "react";
import { UserProfile } from "@/utils/interfaces";
import ProfessionalPhoto from "./ProfessionalPhoto";
import ProfileInformation from "./ProfileInformation";
import ProfessionalSummary from "./ProfessionalSummary";
import ContactInformation from "./ContactInformation";
import Education from "./Education";
import Projects from "./Projects";
import Experience from "./Experience";
import SoftSkills from "./SoftSkills";
import TechnicalSkills from "./TechnicalSkills";
import Interests from "./Interests";
import Achievements from "./Achievements";
import Certifications from "./Certifications";
interface Props {
  user?: UserProfile | null;
  userId?: string;
}
const ClassicColoured = ({ user, userId }: Props) => {
  return (
    <div className="bg-white max-w-4xl ml-[auto] mr-[auto] flex" style={{height:"90%"}}>
      <div className="h-[auto] w-[32%] bg-[#f6b54c] pb-4" >
      <ProfessionalPhoto data={user}/>
<ProfileInformation data={user}/>
<ProfessionalSummary data={user}/>
      <SoftSkills data={user}/>
      <TechnicalSkills data={user}/>
      <Interests data={user}/>
      </div>
      <div className="w-[68%] bg-[#393939] h-[auto] pb-4" >
      <ContactInformation data={user} />
      <Education data={user}/>
      <Projects data={user} />
      <Experience data={user}/>
      <Achievements data={user}/>
      <Certifications data={user}/>
      </div>
    </div>
  );
};

export default ClassicColoured;
