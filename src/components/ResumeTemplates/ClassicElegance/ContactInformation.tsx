import React, { useMemo } from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading5, body1 } from "@/utils/components";
import {
  FaEnvelope,
  FaFolderOpen,
  FaGithub,
  FaHome,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import DisplayEmail from "@/components/common/DisplayEmail";
import {
  getGithubUrlFromUsername,
  getGithubUsernameFromUrl,
  getLinkedinUrlFromUsername,
  getLinkedinUsernameFromUrl,
} from "@/utils/socialUrl";

const ContactInformation = ({ data }: any) => {
  // console.log("new... data",data)
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
    <div className="grid gap-[8px]">
      <ul className="grid gap-[8px]">
        {contact?.email && (
          <li
            className="flex gap-[8px]"
            style={{ wordBreak: "break-word", alignItems: "" }}
          >
            <FaEnvelope color="#fff" />
            <DisplayEmail
              hideIcon={true}
              content={contact?.email}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "white",
                },
              }}
            />
          </li>
        )}
        {contact?.phone && (
          <li className="flex gap-[8px]">
            <FaPhone color="#fff" />
            <ResumeHeading
              content={contact?.phone}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "white",
                },
              }}
            />
          </li>
        )}
        {contact?.address && (
          <li className="flex gap-[8px]">
            <FaHome color="#fff" />
            <ResumeHeading
              content={contact?.address}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "white",
                },
              }}
            />
          </li>
        )}
      </ul>
      <ul className="grid gap-[8px]">
        {contact?.portfolioLink && (
          <li>
            <a
              href={contact?.portfolioLink}
              className="flex items-center gap-[8px]"
            >
              <FaFolderOpen color="#fff" />
              <ResumeHeading
                content={"Portfolio Link"}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "white",
                  },
                }}
              />
            </a>
          </li>
        )}
        {githubUsername && (
          <li>
            <a
              href={githubUrl}
              target="_blank"
              className="flex items-center gap-[8px]"
            >
              <FaGithub color="#fff" />
              <ResumeHeading
                content={"Github"}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "white",
                  },
                }}
              />
            </a>
          </li>
        )}
        {linkedInUsername && (
          <li>
            <a
              href={linkedInUrl}
              target="_blank"
              className="flex items-center gap-[8px]"
            >
              <FaLinkedin color="#fff" />
              <ResumeHeading
                content={"LinkedIn"}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "white",
                  },
                }}
              />
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ContactInformation;
