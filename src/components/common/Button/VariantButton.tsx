"use client";
import { Spinner } from "flowbite-react";
import { twMerge } from "tailwind-merge";

const ButtonColors = {
  light: {
    color: "#FFF",
    background: "152deg, #9425F4 0%, #526FF1 100%",
  },
  dark: {},
};

const VariantButton = ({
  size = "base",
  label,
  onClick,
  type = "button",
  startIcon,
  className,
  loading = false,
  style,
}: {
  size?: "sm" | "base" | "lg" | "xl";
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  startIcon?: React.ReactNode;
  className?: string;
  loading?: boolean;
  style?: React.CSSProperties;
}) => {
  const mode = "light";

  let padding = "px-5 py-2.5";
  switch (size) {
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
      className={twMerge(
        `rounded flex justify-center items-center`,
        padding,
        className,
        loading ? "cursor-not-allowed" : "cursor-pointer"
      )}
      style={{
        backgroundImage: `linear-gradient(${ButtonColors[mode].background})`,
        ...style,
      }}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      type={type}
    >
      {loading && <Spinner className="mr-2" />}
      {startIcon && startIcon}
      <p className={twMerge("text-center text-base font-medium", `text-[${ButtonColors[mode].color}]`)}>{label}</p>
    </button>
  );
};
export default VariantButton;
