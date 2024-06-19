import React, { useMemo } from "react";
import ResumeHeading from "../../ResumeComponents/ResumeHeading";
import DisplayEmail from "@/components/common/DisplayEmail";
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
    <div className="grid gap-[4px]">
      <div className="flex gap-[20px]">
        {contact?.email && (
          <div className="flex">
            {/* <ResumeHeading
              content={contact?.email + " |"}
              componentProperties={components["SimplyMinimalTextGray1"]}
            /> */}
            <DisplayEmail
              disabledSplit={true}
              hideIcon={true}
              content={contact?.email}
              componentProperties={components["SimplyMinimalTextGray1"]}
            />
            <div className="ml-[4px]">
              <ResumeHeading
                content={"|"}
                componentProperties={components["SimplyMinimalTextGray1"]}
              />
            </div>
          </div>
        )}
        {contact?.phone && (
          <div>
            <ResumeHeading
              content={contact?.phone + " |"}
              componentProperties={components["SimplyMinimalTextGray1"]}
            />
          </div>
        )}
        {contact?.address && (
          <div>
            <ResumeHeading
              content={contact?.address}
              componentProperties={components["SimplyMinimalTextGray1"]}
            />
          </div>
        )}
      </div>
      <div className="flex gap-[20px]">
        {contact?.portfolioLink && (
          <div>
            <a
              href={contact?.portfolioLink}
              target="_blank"
              className="underline"
            >
              <ResumeHeading
                content={"Portfolio Link" + " |"}
                componentProperties={components["SimplyMinimalTextGray1"]}
              />
            </a>
          </div>
        )}
        {githubUsername && (
          <div>
            <a href={githubUrl} target="_blank" className="underline">
              <ResumeHeading
                content={"Github" + " |"}
                componentProperties={components["SimplyMinimalTextGray1"]}
              />
            </a>
          </div>
        )}
        {linkedInUsername && (
          <div>
            <a href={linkedInUrl} target="_blank" className="underline">
              <ResumeHeading
                content={"LinkedIn"}
                componentProperties={components["SimplyMinimalTextGray1"]}
              />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactInformation;
