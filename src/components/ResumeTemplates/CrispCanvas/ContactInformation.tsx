import React, { useMemo } from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import {
  MdsHeading4,
  MdsHeading5,
  body1,
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
        componentProperties={{
          ...body1Md,
          styles: {
            ...body1Md.styles,
            color: "white",
          },
        }}
      />
      <div className="h-[1.5px] w-[100%] bg-white mb-[10px]"></div>
      <div className="flex flex-col gap-[8px]">
        {contact?.phone && (
          <div className="flex  items-center gap-15px">
            <FaPhone color="white" style={{ marginRight: "5px" }} />
            <ResumeHeading
              content={`+91-${contact?.phone}`}
              componentProperties={{
                ...body1,
                styles: {
                  ...body1.styles,
                  color: "white",
                },
              }}
            />
          </div>
        )}
        {contact?.email && (
          <div className="flex gap-15px">
            <FaEnvelope color="white" style={{ marginRight: "5px" }} />
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
          </div>
        )}

        {contact?.address && (
          <div className="flex  items-center gap-15px">
            <FaMapMarkerAlt color="white" style={{ marginRight: "5px" }} />
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
          </div>
        )}
        {contact?.portfolioLink && (
          <div className="flex  items-center gap-15px">
            <FaBriefcase color="white" style={{ marginRight: "5px" }} />
            <a href={contact?.portfolioLink} className="underline-white">
              <ResumeHeading
                content={"Portfolio"}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "white",
                  },
                }}
              />
            </a>
          </div>
        )}
        {githubUsername && (
          <div className="flex  items-center gap-15px">
            <FaGithub color="white" style={{ marginRight: "5px" }} />
            <a href={githubUrl} target="_blank" className="underline-white">
              <ResumeHeading
                content={githubUsername}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "white",
                  },
                }}
              />
            </a>
          </div>
        )}
        {linkedInUsername && (
          <div className="flex  items-center gap-15px">
            <FaLinkedin color="white" style={{ marginRight: "5px" }} />
            <a href={linkedInUrl} className="underline-white">
              <ResumeHeading
                content={linkedInUsername}
                componentProperties={{
                  ...body1,
                  styles: {
                    ...body1.styles,
                    color: "white",
                  },
                }}
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInformation;
