"use client";
import { ProfileTabStatus } from "@/interfaces/profile";

import { twMerge } from "tailwind-merge";
import tick from "@/assets/tick.svg";
import Image from "next/image";

export interface IStepperProps {
  steps: { id: string; name: string; value: string; icon?: React.ReactNode; status: ProfileTabStatus }[];
  onClick: (value: string) => void;
}

export const defineStepIconColor = (status: ProfileTabStatus, tab: string, value: string) => {
  if (tab === value) {
    return "#7F3EF3";
  }

  if (status === "completed") {
    return "#FFFFFF";
  } else if (status === "active") {
    return "#7F3EF3";
  }

  return "#FFFFFF";
};

const Stepper = ({ steps, onClick }: IStepperProps) => {
  const mode = "light";
  const EachStepColors: any = {
    light: {
      completed: {
        background: "135deg, #9424F3 33.43%, #5170F0 100%",
        stroke: "#ffffff4d",
        textColor: "#2E1971",
      },
      active: {
        iconColor: "#7F3EF3",
        textColor: "#2E1971",
        borderColor: "#576DF3",
      },
      none: {
        background: "135deg, #9424F3 33.43%, #5170F0 100%",
        stroke: "#ffffff4d",
        textColor: "#2E1971",
      },
    },
    dark: {
      completed: {
        background: "135deg, #9424F3 33.43%, #5170F0 100%",
        stroke: "#ffffff4d",
        textColor: "#2E1971",
      },
      active: {
        iconColor: "#7F3EF3",
        textColor: "#2E1971",
        borderColor: "#576DF3",
      },
      none: {
        background: "135deg, #9424F3 33.43%, #5170F0 100%",
        stroke: "#ffffff4d",
        textColor: "#2E1971",
      },
    },
  };

  const ClassProperties = (status: ProfileTabStatus) => {
    if (status === "active") {
      return `border-[1px] border-solid border-[#9428F6]`;
    } else {
      return `bg-gradient-to-r from-[#9428F6] to-[#576DF3] stroke-[${EachStepColors[mode][status]?.stroke}]`;
    }
  };
  return (
    <div>
      <ol className="relative  border-l-2 border-[#9428F6] ring-white">
        {steps.map((step, index) => (
          <li className="mb-14 ml-6" key={index}>
            <span
              className={twMerge(
                "absolute flex items-center justify-center  w-10 h-10 rounded-full -left-5 ring-5 bg-white ring-white dark:ring-gray-900 dark:bg-green-900",
                ClassProperties(step.status)
              )}
            >
              {step.icon}
            </span>
            <div
              className="flex items-center justify-between gap-x-2 cursor-pointer relative top-1 left-2"
              onClick={() => {
                onClick(step.value);
              }}
            >
              <p
                className={twMerge("text-[20px]  font-semibold", `text-[${EachStepColors[mode][status]?.textColor}]`)}
                style={{
                  color: EachStepColors[mode][status]?.textColor,
                }}
              >
                {step.name}
              </p>
              {step.status === ProfileTabStatus.COMPLETED && <Image src={tick} alt="tick" />}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
export default Stepper;
