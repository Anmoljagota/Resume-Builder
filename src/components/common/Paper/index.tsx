import React from "react";
import { PaperColors } from "./color";

const Paper = ({
  className = "",
  style = {},
  children,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => {
  const mode = "light";
  return (
    <div
      className={`w-full  text-[${PaperColors[mode].color}] rounded-[14px] ${className} border-box overflow-y-auto z-4`}
      style={{
        boxShadow: PaperColors[mode].shadowColor,
        background: PaperColors[mode].backgroundColor,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
export default Paper;
