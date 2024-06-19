"use client";
import { ProfileContext } from "@/context/profile.context";
import { defaultFontSize, updateFontSize } from "@/utils/components";
import React, { useContext, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

interface ResumeTagsProps {
  isEdit: boolean;
  content: { name: string }[];
  componentProperties?: { styles?: any };
}
const ResumeTags = ({ content, componentProperties }: ResumeTagsProps) => {
  const [technicalSkillsList, setTechnicalSkillsList] =
    React.useState<{ name: string }[]>();
  useEffect(() => {
    setTechnicalSkillsList(content || []);
  }, [content]);
  const { state, dispatch } = useContext(ProfileContext);
  const { fontSize } = state;
  const styles = {
    color: componentProperties?.styles?.color,
    borderRadius: "12px",
    padding: "4px 8px",
    backgroundColor: componentProperties?.styles?.bgColor,
    fontFamily: componentProperties?.styles?.fontFamily,
    fontWeight: componentProperties?.styles?.fontWeight,
    fontSize:
      fontSize === "small"
        ? updateFontSize(
            componentProperties?.styles?.fontSize || defaultFontSize,
            -4
          )
        : fontSize === "large"
        ? updateFontSize(
            componentProperties?.styles?.fontSize || defaultFontSize,
            4
          )
        : componentProperties?.styles?.fontSize || defaultFontSize,
    letterSpacing: componentProperties?.styles?.letterSpacing,
  };
  if (fontSize === "small" && styles.fontSize === "12px") {
    styles.fontSize = "14px";
  }
  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-[8px]">
        {technicalSkillsList?.map((item, index) => (
          <div key={index} className="flex items-center">
            <p style={styles}>{typeof item === "string" ? item : item?.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResumeTags;
