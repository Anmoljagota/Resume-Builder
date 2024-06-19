import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";

const ProfileInformation = ({ data, components }: any) => {
  return (
    <div>
      <ResumeHeading
        content={data?.name}
        componentProperties={components["SimplyMinimalHeading1Blue"]}
      />

      <ResumeHeading
        content={formatString(data.header)}
        componentProperties={components["SimplyMinimalHeading2Blue"]}
      />
      <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div>
    </div>
  );
};

export default ProfileInformation;
