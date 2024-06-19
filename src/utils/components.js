
 export const defaultFontSize = "16px";
export function updateFontSize(fontSize, increment) {
  // Extract the numeric value from the font size string
  const numericValue = parseInt(fontSize);

  // Check if the numeric value is valid and the font size string ends with "px"
  if (!isNaN(numericValue) && fontSize.endsWith("px")) {
    // Add the increment to the numeric value and convert back to string with "px"
    const updatedSize = numericValue + increment + "px";
    return updatedSize;
  } else {
    // If the font size is invalid, return the original input
    return fontSize;
  }
}

export const MdsHeading1 = {
    componentType: "Heading",
    uniqueLabel: "MdsHeading1",
    styles: {
        headingSize: "h1",
        fontFamily: "Arial",
        fontWeight: "800",
        fontSize: "48px",
        lineHeight: "80px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const MdsHeading2 = {
    componentType: "Heading",
    uniqueLabel: "MdsHeading2",
    styles: {
        headingSize: "h2",
        fontFamily: "Arial",
        fontWeight: "700",
        fontSize: "34px",
        lineHeight: "40px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const MdsHeading3 = {
    componentType: "Heading",
    uniqueLabel: "MdsHeading3",
    styles: {
        headingSize: "h3",
        fontFamily: "Arial",
        fontWeight: "700",
        fontSize: "24px",
        lineHeight: "32px",
        letterSpacing: "0px",
        color: "#000",
    },
}

export const MdsHeading4 = {
    componentType: "Heading",
    uniqueLabel: "MdsHeading4",
    styles: {
        headingSize: "h4",
        fontFamily: "Arial",
        fontWeight: "700",
        fontSize: "20px",
        lineHeight: "28px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const MdsHeading5 = {
    componentType: "Heading",
    uniqueLabel: "MdsHeading5",
    styles: {
        headingSize: "h5",
        fontFamily: "Arial",
        fontWeight: "700",
        fontSize: "18px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const MdsHeading6 = {
    componentType: "Heading",
    uniqueLabel: "MdsHeading6",
    styles: {
        headingSize: "h6",
        fontFamily: "Arial",
        fontWeight: "700",
        fontSize: "16px",
        lineHeight: "20px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const MdsHeading7 = {
    componentType: "Heading",
    uniqueLabel: "MdsHeading7",
    styles: {
        headingSize: "h2",
        textAlign:"center",
        fontFamily: "Arial",
        fontWeight: "700",
        fontSize: "34px",
        lineHeight: "40px",
        letterSpacing: "0px",
        color: "#534124",
    },
}
export const MdsHeading8 = {
    componentType: "Heading",
    uniqueLabel: "MdsHeading8",
    styles: {
        headingSize: "h3",
        fontFamily: "Arial",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "40px",
        letterSpacing: "0px",
        color: "#534124",
        textAlign:"center"
    },
}
export const subtitle1 = {
    componentType: "Heading",
    uniqueLabel: "subtitle1",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "400",
        fontSize: "24px",
        lineHeight: "34px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const subtitle2 = {
    componentType: "Heading",
    uniqueLabel: "subtitle2",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "600",
        fontSize: "24px",
        lineHeight: "34px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const body1 = {
    componentType: "Heading",
    uniqueLabel: "body1",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "400",
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const body1Md = {
    componentType: "Heading",
    uniqueLabel: "body1Md",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const body3Md = {
    componentType: "Heading",
    uniqueLabel: "body1Md",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const body4Md = {
    componentType: "Heading",
    uniqueLabel: "body4Md",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "600",
        fontSize: "20px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#c09b4f",
    },
}
export const body6Md = {
    componentType: "Heading",
    uniqueLabel: "body6Md",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "600",
        fontSize: "16px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#000",
        textAlign:"center"
    },
}
export const body2 = {
    componentType: "Heading",
    uniqueLabel: "body2",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const body3 = {
    componentType: "Heading",
    uniqueLabel: "body3",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#979895",
    },
}
export const body4 = {
    componentType: "Heading",
    uniqueLabel: "body2",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#c7bdad",
    },
}
export const body5 = {
    componentType: "Heading",
    uniqueLabel: "body5",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#000",
        textAlign:"center"
    },
}
export const body2Md = {
    componentType: "Heading",
    uniqueLabel: "body2Md",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const body5Md = {
    componentType: "Heading",
    uniqueLabel: "body4Md",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "600",
        fontSize: "14px",
        lineHeight: "24px",
        letterSpacing: "0px",
        color: "#c7bdad",
    },
}

export const caption = {
    componentType: "Heading",
    uniqueLabel: "caption",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "400",
        fontSize: "12px",
        lineHeight: "16px",
        letterSpacing: "0px",
        color: "#000",
    },
}
export const overline = {
    componentType: "Heading",
    uniqueLabel: "caption",
    styles: {
        headingSize: "p",
        fontFamily: "Arial",
        fontWeight: "400",
        fontSize: "10px",
        lineHeight: "16px",
        letterSpacing: "0px",
        color: "#000",
    },
}
