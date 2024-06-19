import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import {
  MdsHeading1,
  MdsHeading2,
  MdsHeading3,
  MdsHeading4,
  MdsHeading5,
  body1Md,
} from "@/utils/components";

const ProfileInformation = ({ data }: any) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "38% 62%",
        // justifyContent: "space-evenly",
      }}
      className="border-[4px] rounded-[8px] p-[16px] border-[#b27a56] "
    >
      <div className="pl-[48px]">
        <img
          style={{
            borderRadius: "50%",
            border: "#595555",
            borderStyle: "solid",
            borderWidth: "9px 6px 4px 8px",
            overflow: "hidden",
            objectFit: "cover",
          }}
          src={data.photoUrl}
          alt={data.name}
        />
      </div>

      <div style={{}} className="ml-[16px] my-[auto]">
        <ResumeHeading
          componentProperties={{
            ...MdsHeading1,
            styles: {
              ...MdsHeading1.styles,
              color: "#b27a56",
            },
          }}
          content={data?.name}
        />
        <ResumeHeading
          componentProperties={{
            ...MdsHeading4,
            styles: {
              ...MdsHeading4.styles,
              color: "#000",
            },
          }}
          content={formatString(data.header)}
        />
      </div>
    </div>
  );
};

export default ProfileInformation;
