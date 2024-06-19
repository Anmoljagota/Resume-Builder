"use client";
import React, { useCallback, useEffect, useState } from "react";
import ProfileInformation from "./ProfileInformation";
import { getComponent, getUserProfile } from "@/apis/resume";
import ContactInformation from "./ContactInformation";
import ProfessionalSummary from "./ProfessionalSummary";
import Projects from "./Projects";
import Education from "./Education";
import Experience from "./Experience";
import TechnicalSkills from "./TechnicalSkills";
import { defaultTemplateConfigs, templateNamesEnum } from "@/utils/resumeTemplates";
import SoftSkills from "./SoftSkills";
import Achievements from "./Achievements";
import Certifications from "./Certifications";
import Interests from "./Interests";
import { Template, UserProfile } from "@/utils/interfaces";
import TemplateStructure from "./TemplateStructure";

interface Props {
  userData?: UserProfile | null;
  isEdit?: boolean;
  onUpdateTemplateConfigs?: (prev: Template[]) => void;
  onUpdateUser?: (prev: UserProfile) => void;
}
const ProfessionalEdge = ({ isEdit, userData: user, onUpdateTemplateConfigs, onUpdateUser }: Props) => {
  const [components, setComponents] = React.useState({
    ProfessionalEdgeNameHeading: {},
    ProfessionalEdgeDesignationHeading: {},
    ProfessionalEdgeSectionHeading: {},
    ProfessionalEdgeSummaryText: {},
    EducationHeading: {},
    SkillsTags: {},
    SimpleBulletPoint: {},
    ExperienceSubheading1: {},
    ExperienceSubheading2: {},
    ProfessionalEdgeSummaryTextWhite: {},
  });
  const fetchResumeComponent = async (uniqueLabel: string) => {
    const response = await getComponent({ uniqueLabel });
    return response?.data?.component || {};
  };
  // TODO: use this
  const showConfig = false;

  const fetchComponents = useCallback(async () => {
    const ProfessionalEdgeNameHeading = await fetchResumeComponent("ProfessionalEdgeNameHeading");
    const ProfessionalEdgeDesignationHeading = await fetchResumeComponent("ProfessionalEdgeDesignationHeading");
    const ProfessionalEdgeSectionHeading = await fetchResumeComponent("ProfessionalEdgeSectionHeading");
    const ProfessionalEdgeSummaryText = await fetchResumeComponent("ProfessionalEdgeSummaryText");
    const EducationHeading = await fetchResumeComponent("EducationHeading");
    const SkillsTags = await fetchResumeComponent("SkillsTags");
    const SimpleBulletPoint = await fetchResumeComponent("SimpleBulletPoint");
    const ExperienceSubheading1 = await fetchResumeComponent("ExperienceSubheading1");
    const ExperienceSubheading2 = await fetchResumeComponent("ExperienceSubheading2");
    const ProfessionalEdgeSummaryTextWhite = await fetchResumeComponent("ProfessionalEdgeSummaryTextWhite");
    setComponents({
      ProfessionalEdgeNameHeading: ProfessionalEdgeNameHeading,
      ProfessionalEdgeDesignationHeading: ProfessionalEdgeDesignationHeading,
      ProfessionalEdgeSectionHeading: ProfessionalEdgeSectionHeading,
      ProfessionalEdgeSummaryText: ProfessionalEdgeSummaryText,
      EducationHeading: EducationHeading,
      SkillsTags: SkillsTags,
      SimpleBulletPoint: SimpleBulletPoint,
      ExperienceSubheading1: ExperienceSubheading1,
      ExperienceSubheading2: ExperienceSubheading2,
      ProfessionalEdgeSummaryTextWhite: ProfessionalEdgeSummaryTextWhite,
    });
  }, []);
  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);
  const [currentTemplateConfig, setCurrentTemplateConfig] = useState<Template>();

  useEffect(() => {
    const allTemplateConfigs = user?.templateConfigs || defaultTemplateConfigs;
    const templateConfig = allTemplateConfigs.find((templateConfig) => {
      if (templateConfig.name === templateNamesEnum.ProfessionalEdge) {
        // setCurrentTemplateConfig(templateConfig);
        return true;
      }
      return false;
    });
    if (!templateConfig) {
      setCurrentTemplateConfig(defaultTemplateConfigs[0]);
    } else {
      setCurrentTemplateConfig(templateConfig);
    }
  }, [user, user?.templateConfigs]);
  return (
    <>
      {showConfig && user && currentTemplateConfig && onUpdateTemplateConfigs && (
        <TemplateStructure currentTemplateConfig={currentTemplateConfig} />
      )}
      {user && currentTemplateConfig && (
        <div
          style={{
            backgroundColor: "white",
            maxWidth: "800px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <ProfileInformation data={user} components={components} />
          <ContactInformation data={user} components={components} />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "55% 45%",
              padding: "24px",
              marginRight: "24px",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "grid",
                gap: "24px",
                height: "fit-content",
              }}
            >
              {currentTemplateConfig["sections"]["ProfessionalSummary"].position === "left" && (
                <ProfessionalSummary data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Education"].position === "left" && (
                <Education data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Experience"].position === "left" && (
                <Experience data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Projects"].position === "left" && (
                <Projects isEdit={isEdit} data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Achievements"].position === "left" && (
                <Achievements data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Interests"].position === "left" && (
                <Interests isEdit={isEdit} data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Certifications"].position === "left" && (
                <Certifications data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["TechnicalSkills"].position === "left" && (
                <TechnicalSkills isEdit={isEdit} data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["SoftSkills"].position === "left" && (
                <SoftSkills isEdit={isEdit} data={user} components={components} />
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                height: "fit-content",
              }}
            >
              {currentTemplateConfig["sections"]["ProfessionalSummary"].position === "right" && (
                <ProfessionalSummary data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Education"].position === "right" && (
                <Education data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Experience"].position === "right" && (
                <Experience data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Projects"].position === "right" && (
                <Projects isEdit={isEdit} data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Achievements"].position === "right" && (
                <Achievements data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Interests"].position === "right" && (
                <Interests isEdit={isEdit} data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["Certifications"].position === "right" && (
                <Certifications data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["TechnicalSkills"].position === "right" && (
                <TechnicalSkills isEdit={isEdit} data={user} components={components} />
              )}
              {currentTemplateConfig["sections"]["SoftSkills"].position === "right" && (
                <SoftSkills isEdit={isEdit} data={user} components={components} />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfessionalEdge;
