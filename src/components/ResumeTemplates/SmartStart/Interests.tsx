import ResumeHeading from "@/components/ResumeComponents/ResumeHeading";
import ResumeTags from "@/components/ResumeComponents/ResumeTags";
import { MdsHeading4, body1Md } from "@/utils/components";
import React from "react";

const Interests = ({ isEdit, data }: any) => {
  return (
    <div className="mt-[18px]">
      {" "}
      <ResumeHeading
        content="INTERESTS"
        componentProperties={{
          ...body1Md,
          styles: {
            ...body1Md.styles,
            color: "#b27a56",
          },
        }}
      />
      <ResumeTags isEdit={isEdit} content={data?.interests} />
    </div>
  );
};

export default Interests;
