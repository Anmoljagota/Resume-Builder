import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import {
  MdsHeading5,
  body1,
  body1Md,
  body2,
  body2Md,
  body4,
  body4Md,
} from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const Certifications = ({ data, components }: any) => {
  const certifications = data?.certifications;

  let certificationsArr = certifications.map((el: any) => {
    return (
      <div className="flex flex-col gap-[0px]">
        <a href={el.certificateUrl} className="underline">
          <ResumeHeading content={el.name} componentProperties={body4} />
        </a>
      </div>
    );
  });

  return (
    <div  className="mt-[15px] w-[90%] m-auto">
      <ResumeHeading content="CERTIFICATIONS" componentProperties={body4Md} />
      <div className="ml-[15px]">
        <ResumeBulletPoints
          componentProperties={body4}
          // isHtml={achievements?.length > 0}
          content={certificationsArr}
        />
      </div>
    </div>
  );
};

export default Certifications;
