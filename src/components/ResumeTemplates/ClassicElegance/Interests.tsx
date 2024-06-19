import ResumeHeading from "@/components/ResumeComponents/ResumeHeading";
import ResumeTags from "@/components/ResumeComponents/ResumeTags";
import { MdsHeading4 } from "@/utils/components";
import React from "react";

const Interests = ({ isEdit, data }: any) => {
  return (
    <div className="mt-[16px]">
      {" "}
      <ResumeHeading
        content="Interests"
        componentProperties={{
          ...MdsHeading4,
          styles: {
            ...MdsHeading4.styles,
            color: "#000",
          },
        }}
      />
      <div
        style={{ height: "1px", backgroundColor: "#000" }}
        className=""
      ></div>
      <ResumeTags isEdit={isEdit} content={data?.interests} />
    </div>
  );
};

export default Interests;
