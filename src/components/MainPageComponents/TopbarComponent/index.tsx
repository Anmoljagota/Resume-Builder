import { ResumeCreator } from "@/components/ResumeHandler/ResumeList";
import EditProfileButton from "@/components/common/Button/Smallcomponents/EditProfileButton";

const TopbarComponenet = ({ resumeCreateButtonType = "grey" }: { resumeCreateButtonType?: "grey" | "normal" }) => {
  return (
    <>
      <EditProfileButton className="px-7 py-2" />
      <ResumeCreator buttonType={resumeCreateButtonType} />
    </>
  );
};
export default TopbarComponenet;
