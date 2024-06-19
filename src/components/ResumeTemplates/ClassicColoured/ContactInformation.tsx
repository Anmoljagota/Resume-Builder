import React, { useMemo } from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import { formatString } from "@/utils/formatString";
import {
  MdsHeading4,
  MdsHeading5,
  body1Md,
  body2,
  body3,
  body4Md,
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
  console.log(contact);
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
    <>
      <div className="mt-[10px]  w-[100%] h-[auto]">
        <div className="w-[90%] m-auto left-[5%] h-auto">
          {/* <ResumeHeading
        content={formatString("CONTACT")}
        componentProperties={body4Md}
      /> */}
          <div className="mt-[8px] flex flex-col gap-[8px] h-auto">
            {contact?.email && (
              <div className="flex gap-[8px]">
                <FaEnvelope style={{ marginRight: "5px" }} />
                <DisplayEmail
                  hideIcon={true}
                  content={contact?.email}
                  componentProperties={body3}
                />
              </div>
            )}
            {contact?.phone && (
              <div className="flex  items-center gap-[8px]">
                <FaPhone
                  style={{
                    marginRight: "5px",
                    color: "#e9b052",
                    border: "2px solid #e9b052",
                    fontSize: "30px",
                    padding: "5px",
                    borderRadius: "100%",
                    fontWeight: "700",
                  }}
                />
                <ResumeHeading
                  content={`+91-${contact?.phone}`}
                  componentProperties={body3}
                />
              </div>
            )}
            {contact?.address && (
              <div className="flex  items-center gap-[8px] ">
                <FaMapMarkerAlt
                  style={{
                    marginRight: "5px",
                    color: "#e9b052",
                    border: "2px solid #e9b052",
                    fontSize: "30px",
                    padding: "5px",
                    borderRadius: "100%",
                    fontWeight: "700",
                  }}
                />
                <ResumeHeading
                  content={contact?.address}
                  componentProperties={body3}
                />
              </div>
            )}
            {contact?.portfolioLink && (
              <div className="flex  items-center gap-[8px]">
                <FaBriefcase
                  style={{
                    marginRight: "5px",
                    color: "#e9b052",
                    border: "2px solid #e9b052",
                    fontSize: "30px",
                    padding: "5px",
                    borderRadius: "100%",
                    fontWeight: "700",
                  }}
                />
                <a
                  href={contact?.portfolioLink}
                  target="_blank"
                  className="underline"
                >
                  <ResumeHeading
                    content={"Portfolio Link"}
                    componentProperties={body3}
                  />
                </a>
              </div>
            )}
            {githubUsername && (
              <div className="flex  items-center gap-[8px]">
                <FaGithub
                  style={{
                    marginRight: "5px",
                    color: "#e9b052",
                    border: "2px solid #e9b052",
                    fontSize: "30px",
                    padding: "5px",
                    borderRadius: "100%",
                    fontWeight: "700",
                  }}
                />
                <a href={githubUrl} target="_blank" className="underline">
                  <ResumeHeading
                    content={githubUsername}
                    componentProperties={body3}
                  />
                </a>
              </div>
            )}
            {linkedInUsername && (
              <div className="flex  items-center gap-[8px]">
                <FaLinkedin
                  style={{
                    marginRight: "5px",
                    color: "#e9b052",
                    border: "2px solid #e9b052",
                    fontSize: "30px",
                    padding: "5px",
                    borderRadius: "100%",
                    fontWeight: "700",
                  }}
                />
                <a href={linkedInUrl} target="_blank" className="underline">
                  <ResumeHeading
                    content={linkedInUsername}
                    componentProperties={body3}
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr style={{ border: "1px solid #b07f35" }} className="w-[95%] m-auto mt-3" />
    </>
  );
};

export default ContactInformation;
