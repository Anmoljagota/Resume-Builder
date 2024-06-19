import React from "react";
import ResumeHeading from "./ResumeHeading";
import {
  FaEnvelope,
  FaGithub,
  FaMapMarkerAlt,
  FaPhone,
  FaLinkedin,
  FaBriefcase,
  FaLink,
} from "react-icons/fa";
import {
  getGithubUrlFromUsername,
  getGithubUsernameFromUrl,
  getLinkedinUrlFromUsername,
  getLinkedinUsernameFromUrl,
  makeUrl,
} from "@/utils/socialUrl";
import DisplayEmail from "../common/DisplayEmail";

const IconWithText = ({ content, componentProperties }: any) => {
  const icons = {
    email: <FaEnvelope color="white" style={{ marginTop: "2px" }} />,
    phone: <FaPhone color="white" style={{ marginTop: "2px" }} />,
    address: <FaMapMarkerAlt color="white" style={{ marginTop: "2px" }} />,
    linkedIn: <FaLinkedin color="white" style={{ marginTop: "2px" }} />,
    github: <FaGithub color="white" style={{ marginTop: "2px" }} />,
    portfolioLink: <FaBriefcase color="white" style={{ marginTop: "2px" }} />,
  };
  const githubUsername = getGithubUsernameFromUrl(content?.github);
  const linkedInUsername = getLinkedinUsernameFromUrl(content?.linkedIn);
  const githubUrl = getGithubUrlFromUsername(githubUsername);
  const linkedInUrl = getLinkedinUrlFromUsername(linkedInUsername);
  return (
    <ul
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "8px",
      }}
    >
      {Object.entries(content).map(([key, value]: any) => {
        if (key === "_id") {
          return null;
        }
        const icon = icons[key as keyof typeof icons];
        return (
          <li className="flex gap-[8px]" key={key}>
            {/* render icon component */}
            {icon}
            {key === "linkedIn" ? (
              <a
                href={linkedInUrl}
                target="_blank"
                className="flex items-center gap-[4px]"
              >
                <ResumeHeading
                  content={linkedInUsername}
                  componentProperties={componentProperties}
                />
                <FaLink color="white" />
              </a>
            ) : key === "github" ? (
              <a
                href={githubUrl}
                target="_blank"
                className="flex items-center gap-[4px]"
              >
                <ResumeHeading
                  content={githubUsername}
                  componentProperties={componentProperties}
                />
                <FaLink color="white" />
              </a>
            ) : key === "portfolioLink" ? (
              <a
                href={makeUrl(value)}
                target="_blank"
                className="flex items-center gap-[4px]"
              >
                <ResumeHeading
                  content={"Portfolio"}
                  componentProperties={componentProperties}
                />
                <FaLink color="white" />
              </a>
            ) : key === "email" ? (
              <DisplayEmail
                content={value}
                disabledSplit={true}
                hideIcon={true}
                componentProperties={componentProperties}
              />
            ) : (
              <ResumeHeading
                content={value}
                componentProperties={componentProperties}
              />
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default IconWithText;
