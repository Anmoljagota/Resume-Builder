import React, { useMemo } from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { MdsHeading4, MdsHeading5, body1, body1Md } from "@/utils/components";
import {
  FaEnvelope,
  FaFolderOpen,
  FaGithub,
  FaHome,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import {
  getGithubUrlFromUsername,
  getGithubUsernameFromUrl,
  getLinkedinUrlFromUsername,
  getLinkedinUsernameFromUrl,
} from "@/utils/socialUrl";
import { formatString } from "@/utils/formatString";
import DisplayEmail from "@/components/common/DisplayEmail";

const ContactInformation = ({ data }: any) => {
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
    <div style={{ marginTop: "20px" }}>
      <ResumeHeading
        content={formatString("CONTACT")}
        componentProperties={{
          ...body1Md,
          styles: {
            ...body1Md.styles,
            color: "#b27a56",
          },
        }}
      />
      <ul>
        {contact?.email && (
          <li
            className="flex gap-[8px]"
            style={{ wordBreak: "break-word", alignItems: "" }}
          >
            <FaEnvelope color="#b27a56" />
            <DisplayEmail
              hideIcon={true}
              content={contact?.email}
              componentProperties={{
                ...body1,
              }}
            />
          </li>
        )}
        {contact?.phone && (
          <li className="flex gap-[8px]">
            <FaPhone color="#b27a56" />
            <ResumeHeading content={contact?.phone} />
          </li>
        )}
        {contact?.address && (
          <li className="flex gap-[8px]">
            <FaHome color="#b27a56" />
            <ResumeHeading content={contact?.address} />
          </li>
        )}
      </ul>
      <ul>
        {contact?.portfolioLink && (
          <li>
            <a
              href={contact?.portfolioLink}
              className="flex items-center gap-[8px]"
            >
              <FaFolderOpen color="#b27a56" />
              <ResumeHeading content={"Portfolio Link"} />
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
              <FaGithub color="#b27a56" />
              <ResumeHeading content={"Github"} />
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
              <FaLinkedin color="#b27a56" />
              <ResumeHeading content={"LinkedIn"} />
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default ContactInformation;
