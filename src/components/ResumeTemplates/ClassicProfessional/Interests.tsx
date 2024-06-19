import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import { MdsHeading5, body1, body1Md, body2 } from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const Interests = ({ isEdit, data, components }: any) => {
  let interests = data?.interests;

  return (
    <div className="mt-[15px]">
      {" "}
      <ResumeHeading content="INTERESTS" componentProperties={body1Md} />
      <div className="ml-[15px]">
        <ResumeBulletPoints content={interests} componentProperties={body2} />
      </div>
    </div>
  );
};

export default Interests;
