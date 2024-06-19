import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import {
  body4Md,
  body4
} from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const Achievements = ({ data, components }: any) => {
  const achievements = data?.achievements;
  let achievementsArr = achievements.map((el: any) => {
    return (
      <div className="flex flex-col mt-2">
        <a href={el.certificateUrl} className="underline -mb-[2px]">
          <ResumeHeading
            content={`${el.title},`}
            componentProperties={body4}
          />
        </a>
        <ResumeHeading content={el.orgName} componentProperties={body4} />
      </div>
    );
  });

  return (
    <div className="mt-[15px] w-[90%] m-auto"  >
      <ResumeHeading content="ACHIEVEMENTS" componentProperties={body4Md} />
      <div className="ml-[12px]">
        <ResumeBulletPoints
          componentProperties={body4}
          // isHtml={achievements?.length > 0}
          content={achievementsArr}
        />
      </div>
      <hr style={{border:"1px solid #b07f35"}} className="w-[95%] m-auto mt-3"/>
    </div>
  );
};

export default Achievements;
