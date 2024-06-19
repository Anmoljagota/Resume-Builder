"use client";
import React from "react";
import Downshift from "downshift";
import { twMerge } from "tailwind-merge";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";

interface IDropDownComponent {
  options: { id: string; value: string }[];
  placeholder: string;
  selected: string;
  setSelected: (value: string) => void;
  name: string;
  style?: React.CSSProperties;
}

const DropDownComponent = ({ options, placeholder, selected, setSelected, name, style }: IDropDownComponent) => {
  const InputColors = {
    light: {
      background: "#FFF",
      boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset",
      placeholderColor: "#A7A7A7",
      border: "152deg, #9424F3 33.43%, #5170F0 100%",
    },
    dark: {
      background: "#FFF",
      boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset",
      placeholderColor: "#A7A7A7",
      border: "152deg, #9424F3 33.43%, #5170F0 100%",
    },
  };
  const mode = "light";
  let borderClasses = "";

  const styles: React.CSSProperties = {};
  if (!selected || selected === "") {
    // styles.boxShadow = `0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset`;
    styles.border = "1px solid #E0E0E0";
  } else {
    styles.color = "#2E1971";
    borderClasses = " group bg-gradient-to-br from-[#9424F3] to-[#5170F0]";
    styles.border = "1px solid #D5A9FF";
  }

  return (
    <Downshift
      onChange={(selection) => selection && setSelected(selection.value)}
      itemToString={(item) => (item ? item.value : "")}
      selectedItem={options?.filter((eO) => eO.value === selected)[0]}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <div className="relative">
          <div className={twMerge("w-full flex flex-col gap-1 rounded-md p-[1px]", borderClasses)}>
            <div
              className={twMerge(
                "w-full rounded-md m-0  py-2.5 px-3.5 xl:py-4 xl:px-5 lg:py-3 lg:px-3.5   text-base font-normal flex items-center justify-between "
              )}
              style={{
                ...style,
                ...styles,
                backgroundColor: InputColors[mode].background,
              }}
              {...getRootProps({}, { suppressRefError: true })}
            >
              <input
                placeholder={placeholder}
                name={name}
                className="w-full p-0 outline-none focus:outline-none placeholder:text-[#C8C8C8] font-light"
                {...getInputProps()}
              />
              <button aria-label={"toggle menu"} className="px-2" type="button" {...getToggleButtonProps()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 16 8"
                  fill="none"
                  className={isOpen ? "transform rotate-180" : "transform rotate-0"}
                >
                  <path
                    d="M14.1111 1L7.79626 7L1.48145 1"
                    stroke="#A7A7A7"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <ul
            className={`absolute w-full bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
              !(isOpen && options?.length) && "hidden"
            }`}
            {...getMenuProps()}
          >
            {isOpen
              ? options.map((item, index) => (
                  <li
                    key={item.id}
                    className={twMerge(
                      highlightedIndex === index && "bg-blue-300",
                      "py-3 px-3 shadow-sm flex flex-col hover:bg-gray-200 hover:transition-colors duration-200 ease-in text-[#959595]",
                      selectedItem === item && "font-medium text-[#818181]"
                    )}
                    {...getItemProps({
                      index,
                      item,
                    })}
                  >
                    <span>{item.value}</span>
                  </li>
                ))
              : null}
          </ul>
        </div>
      )}
    </Downshift>
  );
};
export default DropDownComponent;
