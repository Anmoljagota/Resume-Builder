import { FaEnvelope } from "react-icons/fa";
import ResumeHeading from "../ResumeComponents/ResumeHeading";

// Helper function to split the email into parts of 16 characters
const splitEmail = (email) => {
  const maxLength = 27;
  const parts = [];
  for (let i = 0; i < email.length; i += maxLength) {
    parts.push(email.slice(i, i + maxLength));
  }
  return parts;
};

const DisplayEmail = ({
  disabledSplit,
  componentProperties,
  content,
  hideIcon,
}: any) => {
  // content exceeds 25 char then show only first 25 char and append "..."
  // const formattedEmail =
  //   content && content.length > 18 ? content.slice(0, 18) + "..." : content;
  // return (
  //   <div className="flex gap-[8px] items-center">
  //     {!hideIcon && <FaEnvelope color="#fff" />}
  //     <div className="grid">
  //       <a
  //         // add mailto
  //         href={`mailto:${content}`}
  //         target="_blank"
  //       >
  //         <ResumeHeading
  //           content={formattedEmail}
  //           componentProperties={componentProperties}
  //         />
  //       </a>
  //     </div>
  //   </div>
  // );
  let emailParts = content && splitEmail(content);
  if (disabledSplit) {
    emailParts = [content];
  }
  return (
    <>
      {emailParts && (
        <div className={` flex gap-[8px]`}>
          {!hideIcon && <FaEnvelope color="#fff" />}
          <div className="grid mt-[-2px]">
            {emailParts.map((part, index) => (
              <ResumeHeading
                key={index}
                content={part}
                componentProperties={componentProperties}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default DisplayEmail;
