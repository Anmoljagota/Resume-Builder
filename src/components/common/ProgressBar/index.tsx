"use client";
import React from "react";
import { twMerge } from "tailwind-merge";

const ProgressBar = ({
  value = 0,
  onClick,
  style,
  disabled = false,
}: {
  value: number;
  onClick?: (value: number) => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}) => {
  // keep remind the  value should number and betwen 1 to 10
  const convertValueToPercentage = (value: number) => {
    if (value < 0) {
      return `0%`;
    } else if (value > 100) {
      return `100%`;
    } else {
      return `${value}%`;
    }
  };

  const [progress, setProgress] = React.useState<string>(convertValueToPercentage(value));
  const progressRef = React.useRef<any>(null);
  React.useEffect(() => {
    if (progressRef?.current && !disabled) {
      progressRef?.current.addEventListener("click", (e: any) => {
        const widthOfClickedPoint = e.clientX - progressRef.current.getBoundingClientRect().left;
        const percentage = (widthOfClickedPoint / progressRef.current.offsetWidth) * 100;
        setProgress(`${Math.round(percentage)}%`);
        onClick && onClick(Math.floor(Math.round(percentage) / 10));
      });
    }
    return () => {
      if (progressRef?.current) {
        progressRef.current.removeEventLIstener("click");
      }
    };
  }, [disabled]);

  return (
    <div
      className={twMerge(
        "w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700",
        `cursor-[${disabled ? "default" : "pointer"}]`
      )}
      ref={progressRef}
      style={style}
    >
      <div
        className="h-2.5 rounded-full"
        style={{
          width: progress,
          backgroundImage: `linear-gradient(136deg, #9424F3 33.43%, #5170F0 100%)`,
          ...style,
        }}
      ></div>
    </div>
  );
};
export default ProgressBar;
