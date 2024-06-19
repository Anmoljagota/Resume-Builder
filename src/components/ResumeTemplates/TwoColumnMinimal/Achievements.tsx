import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading3, body1 } from "@/utils/components";
import { FaLink } from "react-icons/fa";
const Achievements = ({ data, components }: any) => {
  const achievements = data?.achievements;
  if (!achievements?.length) return null;
  return (
    <div>
      <ResumeHeading
        content={"Achievements"}
        componentProperties={{
          ...MdsHeading3,
          styles: {
            ...MdsHeading3.styles,
            color: "#fff",
          },
        }}
      />
      {/* add a horizontal underline */}
      <div style={{ height: "1px", backgroundColor: "#fff" }}></div>
      {achievements?.map((achievement: any, index: number) => {
        return (
          <div key={index} className="mt-[16px]">
            <ResumeHeading
              content={achievement?.title}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "#fff",
                },
              }}
            />
            <ResumeHeading
              content={achievement?.orgName}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "#fff",
                },
              }}
            />
            <ResumeHeading
              content={achievement?.description}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "#fff",
                },
              }}
            />

            {achievement?.certificateUrl && (
              <a
                href={achievement?.certificateUrl}
                target="_blank"
                className="flex items-center gap-[4px]"
              >
                <ResumeHeading
                  content="Certification Link"
                  componentProperties={{
                    ...body1,
                    styles: {
                      ...body1.styles,
                      color: "#fff",
                    },
                  }}
                />
                <FaLink color="#fff" />
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Achievements;
