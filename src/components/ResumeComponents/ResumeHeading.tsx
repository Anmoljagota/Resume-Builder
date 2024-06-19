import { ProfileContext } from "@/context/profile.context";
import { defaultFontSize, updateFontSize } from "@/utils/components";
import React, { useContext } from "react";

const ResumeHeading = ({ content, componentProperties }: any) => {

  const { state, dispatch } = useContext(ProfileContext);
  const { fontSize } = state;

  const headerStyles = {
    fontFamily: componentProperties?.styles?.fontFamily,
    fontWeight: componentProperties?.styles?.fontWeight,
    // textAlign:componentProperties?.styles?.textAlign,
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
    color: componentProperties?.styles?.color,
    
  };

  if (fontSize === "small" && headerStyles.fontSize === "12px") {
    headerStyles.fontSize = "14px";
  }

  const renderHeading = () => {
    switch (componentProperties?.styles?.headingSize) {
      case "h1":
        return <h1 style={{ ...headerStyles }}>{content}</h1>;
      case "h2":
        return <h2 style={{ ...headerStyles }}>{content}</h2>;
      case "h3":
        return <h3 style={{ ...headerStyles }}> {content}</h3>;
      case "h4":
        return <h4 style={{ ...headerStyles }}>{content}</h4>;
      case "h5":
        return <h5 style={{ ...headerStyles }}>{content}</h5>;
      case "h6":
        return <h6 style={{ ...headerStyles }}>{content}</h6>;
      default:
        return <p style={{ ...headerStyles }}>{content}</p>;
    }
  };

  return (
    <div
      style={{
        width: "fit-content",
        marginLeft: componentProperties?.styles?.spacingLeft,
        marginRight: componentProperties?.styles?.spacingRight,
        marginTop: componentProperties?.styles?.spacingTop,
        marginBottom: componentProperties?.styles?.spacingBottom,
      }}
    >
      {renderHeading()}
      {componentProperties?.styles?.isUnderline && (
        <div
          style={{
            height: "1px",
            backgroundColor: componentProperties?.styles?.color,
          }}
        ></div>
      )}
    </div>
  );
};

export default ResumeHeading;
