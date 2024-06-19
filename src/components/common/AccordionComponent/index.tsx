"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

interface IAccordionComponentProps {
  title: string;
  children: React.ReactNode;
  endIcon?: React.ReactNode;
}

const AccordionComponent = ({
  data,
  getActiveIndex,
}: {
  data: IAccordionComponentProps[];
  getActiveIndex?: (value: number) => void;
}) => {
  const mode = "light";

  const AccodionColor = {
    light: {
      color: "#2E1971",
      border: "136deg, #9424F3 33.43%, #5170F0 100%",
      background: "#FAF5FF",
    },
    dark: {
      color: "#2E1971",
      border: "136deg, #9424F3 33.43%, #5170F0 100%",
      background: "#FAF5FF",
    },
  };
  const [open, setOpen] = React.useState<number>(0);
  let borderClasses = " group bg-gradient-to-br from-[#9424F3] to-[#5170F0]";
  return (
    <div className="z-4">
      {data.map((item, index) => (
        <div key={index} className="rounded-md">
          <div className="flex items-center justify-end px-2 mb-2.5">{item?.endIcon}</div>
          <div>
            <div className={twMerge("p-[1px]  w-full rounded-[10px] mb-6", borderClasses)}>
              <div
                className={twMerge(
                  "md:px-6 md:py-3 sm:px-4 sm:py-2 xs:px-3 xs:py-1 px-2 py-1 flex justify-between items-center  cursor-pointer rounded-lg",
                  `bg-[${AccodionColor[mode].background}]`
                )}
                style={{
                  backgroundColor: AccodionColor[mode]?.background,
                }}
                onClick={() => {
                  if (index === open) {
                    setOpen(-1);
                  } else {
                    setOpen(index);
                  }
                  getActiveIndex && getActiveIndex(index);
                }}
              >
                <p
                  className="font-medium text-sm md:text-lg sm:text-md trackinng-[1.25px]"
                  style={{
                    color: AccodionColor[mode]?.color,
                  }}
                >
                  {item.title}
                </p>
                {open === index ? (
                  <RiArrowDropUpLine className="h-10 w-10" color={AccodionColor[mode]?.color} />
                ) : (
                  <RiArrowDropDownLine className="h-10 w-10" color={AccodionColor[mode]?.color} />
                )}
              </div>
            </div>
            {open === index && (
              <div
                style={{
                  zIndex: 1,
                  backgroundColor: "#ffffff",
                }}
              >
                {item.children}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default AccordionComponent;
