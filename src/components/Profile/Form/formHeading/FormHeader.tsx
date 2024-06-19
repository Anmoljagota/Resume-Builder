import ProgressBar from "@/components/common/ProgressBar";
import { UserProfile } from "@/utils/interfaces";
import React from "react";
import { twMerge } from "tailwind-merge";
import { AiOutlineArrowLeft } from "react-icons/ai";
import OutlinedButton from "@/components/common/Button/OutlinedButton";

const FormHeaderTextColor = {
  light: {
    textColor: "#2E1971",
  },
  dark: {
    textColor: "#2E1971",
  },
};

const FormHeader = ({
  data,
  showSideBar = true,
  handleShowSideBar,
}: {
  data: UserProfile;
  showSideBar?: boolean;
  handleShowSideBar?: () => void;
}) => {
  const mode = "light";
  const filledDataPercentage = React.useMemo(() => {
    let percentage = 0;
    if (data?.name && data.name !== "") {
      percentage += 3;
    }
    if (data?.header && data?.header !== "") {
      percentage += 3;
    }
    if (data?.photoUrl && data?.photoUrl !== "") {
      percentage += 4;
    }

    if (data?.education?.length > 0) {
      percentage += 10;
    }
    if (data?.experience?.length > 0) {
      percentage += 10;
    }
    if (data?.projects?.length > 0) {
      percentage += 10;
      if (data?.projects?.length > 1) {
        percentage += 10;
      }
    }
    if (data?.technicalSkills?.length > 0) {
      percentage += 10;
    }
    if (data?.softSkills?.length > 0) {
      percentage += 10;
    }
    if (data?.interests?.length > 0) {
      percentage += 10;
    }
    if (data?.certifications?.length > 0) {
      percentage += 10;
    }
    if (data?.achievements?.length > 0) {
      percentage += 10;
    }
    return percentage;
  }, [data]);
  return (
    <div className="w-full px-[50px] my-5">
      <div className="relative lg:hidden top-[-30px]">
        {!showSideBar && (
          <OutlinedButton
            startIcon={<AiOutlineArrowLeft className="md:h-5 md:w-5 sm:h-4 sm:w-4 sxs:h-3 sxs:w-3 font-extrabold" />}
            onClick={() => handleShowSideBar && handleShowSideBar()}
            size="xs"
          />
        )}
      </div>
      <ProgressBar
        value={filledDataPercentage}
        style={{
          height: "6px",
        }}
        disabled={true}
      />
      <div className={"w-full flex justify-end"}>
        <p className={twMerge("text-sm font-medium ", `text-[${FormHeaderTextColor[mode].textColor}]`)}>
          {filledDataPercentage}%
        </p>
      </div>
    </div>
  );
};
export default FormHeader;
