import React, { useMemo } from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import {
  MdsHeading4,
  MdsHeading5,
  body1Md,
  body2,
  body2Md,
  subtitle2,
} from "@/utils/components";
import IconWithText from "@/components/ResumeComponents/IconWithText";
import DisplayEmail from "@/components/common/DisplayEmail";
import {
  FaBriefcase,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import {
  getGithubUrlFromUsername,
  getGithubUsernameFromUrl,
  getLinkedinUrlFromUsername,
  getLinkedinUsernameFromUrl,
} from "@/utils/socialUrl";
const ContactInformation = ({ data, components }: any) => {
  const contact = data?.contact;
  console.log(contact)
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
    <div className="mt-[15px]">
      <ResumeHeading
        content={formatString("CONTACT")}
        componentProperties={body1Md}
      />
      <div className="mt-[8px] flex flex-col gap-[8px]">
        {contact?.email && (
          <div className="flex gap-[8px]">
            <FaEnvelope style={{ marginRight: "5px" }} />
            <DisplayEmail
              hideIcon={true}
              content={contact?.email}
              componentProperties={body2}
            />
          </div>
        )}
        {contact?.phone && (
          <div className="flex  items-center gap-[8px]">
            <FaPhone style={{ marginRight: "5px" }} />
            <ResumeHeading
              content={`+91-${contact?.phone}`}
              componentProperties={body2}
            />
          </div>
        )}
        {contact?.address && (
          <div className="flex  items-center gap-[8px] ">
            <FaMapMarkerAlt style={{ marginRight: "5px" }} />
            <ResumeHeading
              content={contact?.address}
              componentProperties={body2}
            />
          </div>
        )}
        {contact?.portfolioLink && (
          <div className="flex  items-center gap-[8px]">
            <FaBriefcase style={{ marginRight: "5px" }} />
            <a
              href={contact?.portfolioLink}
              target="_blank"
              className="underline"
            >
              <ResumeHeading
                content={"Portfolio Link"}
                componentProperties={body2}
              />
            </a>
          </div>
        )}
        {githubUsername && (
          <div className="flex  items-center gap-[8px]">
            <FaGithub style={{ marginRight: "5px" }} />
            <a href={githubUrl} target="_blank" className="underline">
              <ResumeHeading content={githubUsername} componentProperties={body2} />
            </a>
          </div>
        )}
        {linkedInUsername && (
          <div className="flex  items-center gap-[8px]">
            <FaLinkedin style={{ marginRight: "5px" }} />
            <a href={linkedInUrl} target="_blank" className="underline">
              <ResumeHeading content={linkedInUsername} componentProperties={body2} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInformation;
