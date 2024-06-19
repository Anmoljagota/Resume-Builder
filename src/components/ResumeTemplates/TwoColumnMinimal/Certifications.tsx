import React from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading3, body1 } from "@/utils/components";
import { FaLink } from "react-icons/fa";

const Certifications = ({ data, components }: any) => {
  const certifications = data?.certifications;

  return (
    <div>
      <ResumeHeading
        content={"Certifications"}
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
      {certifications?.map((certification: any, index: number) => {
        return (
          <div className="mt-[16px]">
            <ResumeHeading
              content={certification?.name}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "#fff",
                },
              }}
            />
            <ResumeHeading
              content={certification?.instituteName}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "#fff",
                },
              }}
            />

            {certification?.certificateUrl && (
              <a
                href={certification?.certificateUrl}
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

export default Certifications;
