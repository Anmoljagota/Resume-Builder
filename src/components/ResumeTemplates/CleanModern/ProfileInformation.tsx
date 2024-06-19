import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import {
  MdsHeading1,
  MdsHeading2,
  MdsHeading3,
  MdsHeading4,
  MdsHeading5,
  MdsHeading6,
} from "@/utils/components";

const ProfileInformation = ({ data }: any) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
      <div
        style={{
          width: "150px",
          height: "150px",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        <img
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src={data.photoUrl}
          alt={data.name}
        />
      </div>
      <div>
        <div>
          <ResumeHeading
            componentProperties={{
              ...MdsHeading1,
              styles: {
                ...MdsHeading1.styles,
                color: "white",
              },
            }}
            content={data?.name}
          />
          <ResumeHeading
            componentProperties={{
              ...MdsHeading3,
              styles: {
                ...MdsHeading3.styles,
                color: "white",
              },
            }}
            content={formatString(data.header)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileInformation;
