import ResumeHeading from "@/components/ResumeComponents/ResumeHeading";
import { MdsHeading4, body1 } from "@/utils/components";
import React from "react";

const Achievements = ({ data }: any) => {
  const achievements = data?.achievements;
  return (
    <div style={{ marginTop: "20px" }}>
      <ResumeHeading
        componentProperties={{
          ...MdsHeading4,
          styles: {
            ...MdsHeading4.styles,
            color: "#000",
          },
        }}
        content="Achievements"
      />
      <div style={{ height: "1px", backgroundColor: "#000" }}></div>
      {achievements?.map((achievement: any, index: number) => {
        return (
          <div>
            <ResumeHeading
              content={achievement?.title}
              componentProperties={body1}
            />
            <ResumeHeading
              content={achievement?.orgName}
              componentProperties={body1}
            />
            <ResumeHeading
              content={achievement?.description}
              componentProperties={body1}
            />

            {achievement?.certificateUrl && (
              <a
                href={achievement?.certificateUrl}
                className="flex items-center gap-[4px]"
              >
                <ResumeHeading
                  content="Certification Link"
                  componentProperties={body1}
                />
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
