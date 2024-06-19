import React from "react";

import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import IconWithText from "../../ResumeComponents/IconWithText";
const ContactInformation = ({ data, components }: any) => {
  return (
    <div
      style={{
        backgroundColor: "#2E3D5F",
        padding: "24px",
      }}
    >
      {data?.contact && (
        <IconWithText
          content={data?.contact}
          componentProperties={components["ProfessionalEdgeSummaryTextWhite"]}
        />
      )}
    </div>
  );
};

export default ContactInformation;
