"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

const LayoutBackgroundColor = {
  light: "#f4f4f4",
  dark: "#f4f4f4",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const mode = "light";

  return (
    <div
      className={twMerge(
        `h-full  max-w-screen-2xl mx-auto`,
        `bg-[${LayoutBackgroundColor[mode]}] bg-[#f4f4f4] bg-opacity-5`
      )}
    >
      {children}
    </div>
  );
};

export default Layout;
