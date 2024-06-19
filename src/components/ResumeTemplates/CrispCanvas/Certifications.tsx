import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import {
  MdsHeading5,
  body1,
  body1Md,
  body2,
  body2Md,
} from "@/utils/components";
import ResumeBulletPoints from "@/components/ResumeComponents/ResumeBulletPoints";

const Certifications = ({ data, components }: any) => {
  const certifications = data?.certifications;
  let certificationsArr = certifications.map((el: any) => {
    return (
      <div className="flex flex-col gap-[0px]">
        <a href={el.certificateUrl} className="underline">
          <ResumeHeading
            content={el.name}
            componentProperties={{
              ...body1,
              styles: { ...body1.styles, color: "white" },
            }}
          />
        </a>
      </div>
    );
  });

  return (
    <div className="mt-[15px]">
      <ResumeHeading
        content="CERTIFICATIONS"
        componentProperties={{
          ...body1Md,
          styles: {
            ...body1Md.styles,
            color: "white",
          },
        }}
      />
      <div className="h-[2px] w-[100%] bg-white mb-[10px]"></div>
      <div className="ml-[15px]">
        <ResumeBulletPoints
          componentProperties={{
            ...body1,
            styles: { ...body1.styles, color: "white" },
          }}
          // isHtml={achievements?.length > 0}
          content={certificationsArr}
        />
      </div>
    </div>
  );
};

export default Certifications;
