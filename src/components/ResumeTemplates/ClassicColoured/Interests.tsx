import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import ResumeTags from "../../ResumeComponents/ResumeTags";
import { MdsHeading5, body1, body1Md, body2 ,body6Md} from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const Interests = ({ isEdit, data, components }: any) => {
  let interests = data?.interests;

  return (
    <div className="mt-[15px]" >
      {" "}
      <div className="flex justify-center items-center">

      <ResumeHeading content="INTERESTS" componentProperties={body6Md} />
      </div>
      <div className="ml-[15px] pl-6" >
        <ResumeBulletPoints content={interests} componentProperties={body2} />
      </div>
    </div>
  );
};

export default Interests;
