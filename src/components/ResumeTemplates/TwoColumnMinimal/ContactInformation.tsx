import React, { useMemo } from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading3, body1 } from "@/utils/components";
import {
  FaPhone,
  FaEnvelope,
  FaHome,
  FaLinkedin,
  FaGithub,
  FaFolderOpen,
} from "react-icons/fa";
import {
  getGithubUrlFromUsername,
  getGithubUsernameFromUrl,
  getLinkedinUrlFromUsername,
  getLinkedinUsernameFromUrl,
} from "@/utils/socialUrl";
import DisplayEmail from "@/components/common/DisplayEmail";
const ContactInformation = ({ data, components }: any) => {
  const contact = data?.contact;
  const githubUsername = useMemo(
    () => getGithubUsernameFromUrl(contact?.github),
    [contact?.github]
  );
  const linkedInUsername = useMemo(
    () => getLinkedinUsernameFromUrl(contact?.linkedIn),
    [contact?.linkedIn]
  );
  const githubUrl = useMemo(
    () => getGithubUrlFromUsername(githubUsername),
    [githubUsername]
  );
  const linkedInUrl = useMemo(
    () => getLinkedinUrlFromUsername(linkedInUsername),
    [linkedInUsername]
  );
  return (
    <div className="h-fit">
      <ResumeHeading
        content={"Contact"}
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
      <div className="grid gap-[4px]">
        <div className="grid gap-[9px] mt-[16px]">
          {contact?.phone && (
            <div className="flex gap-[8px]">
              <FaPhone color="#fff" />
              <ResumeHeading
                content={contact?.phone}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "#fff",
                  },
                }}
              />
            </div>
          )}
          <DisplayEmail
            content={contact?.email}
            componentProperties={{
              ...body1,
              styles: {
                ...body1.styles,
                color: "#fff",
              },
            }}
          />

          {contact?.address && (
            <div className="flex items-center gap-[8px]">
              <FaHome color="#fff" />
              <ResumeHeading
                content={contact?.address}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "#fff",
                  },
                }}
              />
            </div>
          )}
          {contact?.portfolioLink && (
            <a
              href={contact?.portfolioLink}
              target="_blank"
              className="flex items-center gap-[8px]"
            >
              <FaFolderOpen color="#fff" />
              <ResumeHeading
                content={"Portfolio"}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "#fff",
                  },
                }}
              />
            </a>
          )}
          {githubUsername && (
            <a
              href={githubUrl}
              target="_blank"
              className="flex items-center gap-[8px]"
            >
              <FaGithub color="#fff" />
              <ResumeHeading
                content={githubUsername}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "#fff",
                  },
                }}
              />
            </a>
          )}
          {linkedInUsername && (
            <a
              href={linkedInUrl}
              target="_blank"
              className="flex items-center gap-[8px]"
            >
              <FaLinkedin color="#fff" />
              <ResumeHeading
                content={linkedInUsername}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "#fff",
                  },
                }}
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInformation;
