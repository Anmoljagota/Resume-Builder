import { ProfileContext } from "@/context/profile.context";
import { defaultFontSize, updateFontSize } from "@/utils/components";
import React, { useContext } from "react";

const ResumeBulletPoints = ({ isHtml, content, componentProperties }: any) => {
  console.log("i a content",content)
  const { state, dispatch } = useContext(ProfileContext);
  const { fontSize } = state;
  const styles = {
    listStyleType: "disc",
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
    lineHeight: componentProperties?.styles?.lineHeight,
    letterSpacing: componentProperties?.styles?.letterSpacing,
    color: componentProperties?.styles?.color,
  };
  if (fontSize === "small" && styles.fontSize === "12px") {
    styles.fontSize = "14px";
  }
  return (
    <ul
      style={{
        marginLeft: componentProperties?.styles?.spacingLeft,
      }}
    >
      {content?.map((point: any, index: number) => {
        return (
          <li key={index} style={styles}>
            {isHtml ? (
              <div dangerouslySetInnerHTML={{ __html: point }} />
            ) : (
              point
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default ResumeBulletPoints;
