"use client";
import React from "react";
import { RxCrossCircled } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

interface ISkills {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onDelete: () => void;
  autoFocus?: boolean;
}

const Skills = ({ value, onChange, placeholder, onDelete, autoFocus = false }: ISkills) => {
  const Colors = {
    light: {
      background: "#FFF",
      boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset",
      placeholderColor: "#A7A7A7",
    },
    dark: {
      background: "#FFF",
      boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset",
      placeholderColor: "#A7A7A7",
    },
  };
  const mode = "light";

  let borderClasses = "";

  const styles: React.CSSProperties = {
    backgroundColor: Colors[mode].background,
  };
  if (!value || value === "") {
    // styles.boxShadow = `0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset`;
    styles.border = "1px solid #E0E0E0";
  } else {
    styles.color = "#2E1971";
    borderClasses = " group bg-gradient-to-br from-[#9424F3] to-[#5170F0]";
  }

  return (
    <div className={twMerge("p-[1px]  w-full rounded-lg", borderClasses)}>
      <div
        className={twMerge(
          "rounded-md  py-2 px-3 xl:py-5 xl:px-6 lg:py-4 lg:px-5 xs:py-3 xs:px-4 text-base font-normal  flex items-center justify-start gap-x-5",
          `placeholder:text-[${Colors[mode].placeholderColor}]`
        )}
        style={styles}
      >
        <input
          name="skill"
          value={value}
          placeholder={placeholder}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
          className="w-full !outline-0 focus:outline-0 ring-0 focus:ring-0 text-md md:text-base placeholder:text-[#C8C8C8] placeholder:font-thin"
          autoFocus={autoFocus}
        />
        <RxCrossCircled color="#FF8484" className="h-6 w-6 cursor-pointer" onClick={onDelete} />
      </div>
    </div>
  );
};
export default Skills;
