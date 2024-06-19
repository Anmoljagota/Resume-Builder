"use client";
import { AiOutlinePlus } from "react-icons/ai";
import { twMerge } from "tailwind-merge";

const AddNewField = ({ label, onClick }: { label: string; onClick?: () => void }) => {
  const mode = "light";
  const Colors = {
    light: {
      background: "#FFFFFF",
      boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset",
      borderColor: "#8C2FF4",
      textColor: "#8C2FF4",
      hoverBackground: "#FAF5FF",
    },
    dark: {
      background: "#FFFFFF",
      boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset",
      borderColor: "#8C2FF4",
      textColor: "#8C2FF4",
      hoverBackground: "#FAF5FF",
    },
  };
  return (
    <button
      className={twMerge(
        `bg-[${Colors[mode]?.background}]`,
        `border-2 border-dotted rounded-md flex items-center justify-center gap-x-2 py-3 px-4 md:py-5 md:px-6 sm:py-4 sm:px-5 xs:py-3 xs:px-4`,
        `text-[${Colors[mode]?.textColor}]`,
        `hover:bg-[${Colors[mode]?.hoverBackground}]`
      )}
      style={{
        borderColor: Colors[mode]?.borderColor,
      }}
      type="button"
      onClick={onClick}
    >
      <AiOutlinePlus color="#8C2FF4" />
      <span className="text-base">{label}</span>
    </button>
  );
};
export default AddNewField;
