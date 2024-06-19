"use client";

import { twMerge } from "tailwind-merge";

const OutlinedButton = ({
  size = "base",
  label,
  onClick,
  style,
  startIcon,
  id,
}: {
  size?: "sm" | "base" | "lg" | "xl" | "xs";
  label?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  startIcon?: React.ReactNode;
  id?: string;
}) => {
  let padding = "px-5 py-2.5";
  switch (size) {
    case "xs":
      padding = "px-0 py-0";
    case "sm":
      padding = "px-3 py-2";
      break;
    case "lg":
      padding = "px-5 py-3";
      break;
    case "xl":
      padding = "px-6 py-3";
    default:
      padding = "px-5 py-2.5";
      break;
  }

  return (
    <button
      onClick={onClick}
      style={style}
      type="button"
      id={id || label}
      className="relative inline-flex items-center justify-center p-0.5  mr-2 overflow-hidden text-sm font-medium text-[#8C2FF4] rounded-lg group bg-gradient-to-br from-[#9424F3] to-[#5170F0] hover:text-white"
    >
      <span
        className={twMerge(
          "relative  transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0 px-2 py-1 sm:px-3 sm:py-2 md:px-5 md:py-2.5 xl:px-6 xl:py-3"
        )}
      >
        {startIcon && startIcon}
        {label && label}
      </span>
    </button>
  );
};
export default OutlinedButton;
