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
  subtitle1,
} from "@/utils/components";

const ProfileInformation = ({ data, components }: any) => {
  return (
    <div className="mb-[5px]">
      <ResumeHeading content={data?.name} componentProperties={MdsHeading2} />

      <ResumeHeading
        content={formatString(data.header)}
        componentProperties={MdsHeading4}
      />
      <div className="h-[4px] w-[100%] mb-[5px]"></div>
    </div>
  );
};

export default ProfileInformation;
