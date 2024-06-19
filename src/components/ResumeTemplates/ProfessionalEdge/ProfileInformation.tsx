import React, { useEffect } from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";

const ProfileInformation = ({ data, components }: any) => {
  return (
    <div
      style={{
        backgroundColor: "#2E3D5F",
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "65% 35%",
        alignItems: "center",
      }}
    >
      <div>
        <ResumeHeading
          content={data.name}
          componentProperties={components["ProfessionalEdgeNameHeading"]}
        />
        <ResumeHeading
          content={formatString(data.header)}
          componentProperties={components["ProfessionalEdgeDesignationHeading"]}
        />
      </div>
      <img
        style={{
          justifySelf: "flex-end",
          borderRadius: "50%",
          width: "150px",
          height: "150px",
        }}
        src={data.photoUrl}
        alt={data.name}
      />
    </div>
  );
};

export default ProfileInformation;
