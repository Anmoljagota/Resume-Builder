import ResumeHeading from "@/components/ResumeComponents/ResumeHeading";
import { MdsHeading4, body1Md } from "@/utils/components";
import React from "react";

const Achievements = ({ data }: any) => {
  const achievements = data?.achievements;
  return (
    <div style={{ marginTop: "20px" }}>
      <ResumeHeading
        componentProperties={{
          ...body1Md,
          styles: {
            ...body1Md.styles,
            color: "#b27a56",
          },
        }}
        content="ACHIEVEMENTS"
      />
      {/* <div className="h-[4px] w-[100%] bg-[#97bbd9] mb-[8px]"></div> */}
      {achievements?.map((achievement: any, index: number) => {
        return (
          <div>
            <ResumeHeading content={achievement?.title} />
            <ResumeHeading content={achievement?.orgName} />
            <ResumeHeading content={achievement?.description} />

            {achievement?.certificateUrl && (
              <a
                href={achievement?.certificateUrl}
                className="flex items-center gap-[4px]"
              >
                <ResumeHeading content="Certification Link" />
                <img
                  width={"16px"}
                  src="https://masai-website-images.s3.ap-south-1.amazonaws.com/icons8-link-100.png"
                />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Achievements;
