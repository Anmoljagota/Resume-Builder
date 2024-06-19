import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading4, MdsHeading2 } from "@/utils/components";
import { formatString } from "@/utils/formatString";
const ProfileInformation = ({ data, components }: any) => {
  return (
    <div>
      <ResumeHeading
        content={data?.name}
        componentProperties={{
          ...MdsHeading2,
          styles: {
            ...MdsHeading2.styles,
          },
        }}
      />
      <ResumeHeading
        content={formatString(data.header)}
        componentProperties={{
          ...MdsHeading4,
          styles: {
            ...MdsHeading4.styles,
          },
        }}
      />
    </div>
  );
};

export default ProfileInformation;
