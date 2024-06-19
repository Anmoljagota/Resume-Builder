"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

const TextAreaComponent = ({
  placeholder,
  name,
  value,
  onChange,
  autoFocus = false,
}: {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  autoFocus?: boolean;
}) => {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const InputColors = {
    light: {
      background: "#FFF",
      boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset",
      placeholderColor: "#C8C8C8",
      border: "152deg, #9424F3 33.43%, #5170F0 100%",
    },
    dark: {},
  };
  const mode = "light";
  let borderClasses = "";

  const styles: React.CSSProperties = {};
  if (!value || value === "") {
    // styles.boxShadow = `0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset`;
    styles.border = "1px solid #E0E0E0";
  } else {
    styles.color = "#2E1971";
    borderClasses = "group bg-gradient-to-br from-[#9424F3] to-[#5170F0]";
    styles.border = "1px solid #D5A9FF";
  }
  React.useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea && !value) {
      const defaultHeight = 100;
      textarea.style.height = `${defaultHeight}px`;
    } else if (textarea && value) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);
  return (
    <div className={twMerge("p-[1px]  w-full rounded-lg relative", borderClasses)}>
      <textarea
        className={twMerge(
          "peer w-full rounded-md placeholder:text-transparent py-2.5 px-3.5 xl:py-4 xl:px-5 lg:py-3 lg:px-4  pt-5"
        )}
        placeholder={placeholder}
        name={name}
        id={name}
        ref={textareaRef}
        defaultValue={value}
        onChange={(e) => {
          const textarea = textareaRef.current;
          if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
          }
          onChange(e);
        }}
        autoFocus={autoFocus}
        style={{
          marginBottom: "-6px",
          ...styles,
        }}
      />
      <label
        htmlFor={name}
        className="absolute  duration-300 transform -translate-y-3 scale-75 top-3 origin-[0] left-[21px]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 font-thin"
        style={{
          color: InputColors[mode].placeholderColor,
        }}
      >
        {placeholder}
      </label>
    </div>
  );
};
export default TextAreaComponent;
