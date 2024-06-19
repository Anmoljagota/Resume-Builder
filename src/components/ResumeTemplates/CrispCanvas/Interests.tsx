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
      <ResumeHeading
        content="INTERESTS"
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
          content={interests}
          componentProperties={{
            ...body1,
            styles: {
              ...body1.styles,
              color: "white",
            },
          }}
        />
      </div>
    </div>
  );
};

export default Interests;
