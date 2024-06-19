import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading5, body1, body2, body2Md } from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const Achievements = ({ data, components }: any) => {
  const achievements = data?.achievements;
  let achievementsArr = achievements.map((el: any) => {
    return (
      <div className="flex flex-col">
        <a href={el.certificateUrl} className="underline -mb-[2px]">
          <ResumeHeading
            content={`${el.title},`}
            componentProperties={body2Md}
          />
        </a>
        <ResumeHeading content={el.orgName} componentProperties={body2} />
      </div>
    );
  });
  return (
    <div className="mt-[5px]">
      <ResumeHeading content="ACHIEVEMENTS" componentProperties={MdsHeading5} />
      <div className="h-[2px] w-[40%] bg-slate-900 mb-[5px]"></div>
      <div className="ml-[32px]">
        <ResumeBulletPoints
          componentProperties={body1}
          // isHtml={achievements?.length > 0}
          content={achievementsArr}
        />
      </div>
    </div>
  );
};

export default Achievements;
