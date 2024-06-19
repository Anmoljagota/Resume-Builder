"use client";

import { twMerge } from "tailwind-merge";
const TextInputComponent = ({
  placeholder,
  name,
  value,
  onChange,
  style,
  autoFocus = false,
}: {
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
  autoFocus?: boolean;
}) => {
  const InputColors = {
    light: {
      background: "#FFF",
      boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset",
      placeholderColor: "#C8C8C8",
      border: "152deg, #9424F3 33.43%, #5170F0 100%",
    },
    dark: {
      background: "#FFF",
      boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset",
      placeholderColor: "#C8C8C8",
      border: "152deg, #9424F3 33.43%, #5170F0 100%",
    },
  };
  const mode = "light";
  let borderClasses = "";

  const styles: React.CSSProperties = {};
  if (!value || value === "") {
    // styles.boxShadow = `0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset`;
    styles.border = "1px solid #E0E0E0";
  } else {
    styles.color = "#2E1971";
    borderClasses = " group bg-gradient-to-br from-[#9424F3] to-[#5170F0]";
    styles.border = "1px solid #D5A9FF";
  }

  return (
    <div
      className={twMerge("p-[1px] w-full rounded-lg relative", borderClasses)}
      style={{
        stroke: "#E4CBFF",
        strokeWidth: "10px",
      }}
    >
      <input
        type="text"
        className={twMerge(
          "peer w-full  rounded-md   py-2.5 px-3.5 xl:py-4 xl:px-5 lg:py-3 lg:px-4   !outline-0 focus:outline-0 ring-0 focus:ring-0 text-md md:text-base font-normal placeholder:text-transparent"
        )}
        placeholder={placeholder}
        autoFocus={autoFocus}
        name={name}
        id={name}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          onChange(e);
        }}
        data-verb={name}
        style={{
          ...style,
          ...styles,
        }}
      />
      <label
        htmlFor={name}
        className="absolute text-sm duration-300 transform -translate-y-3 sm:-translate-y-3 lg:-translate-y-4  scale-75 top-3.5 sm:top-3 md:top-3  lg:top-4 xl:top-5  origin-[0] left-[21px]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 sm:peer-focus:-translate-y-4 lg:peer-focus:-translate-y-4 font-thin"
        style={{
          color: InputColors[mode].placeholderColor,
        }}
      >
        {placeholder}
      </label>
    </div>
  );
};
export default TextInputComponent;
