"use client";
import React from "react";

const RangeSlider = ({
  value = 0,
  onClick,
}: {
  value: number;
  onClick?: (value: number) => void;
  style?: React.CSSProperties;
}) => {
  const convertValueToPercentage = (value: number) => {
    if (value < 0) {
      return 0;
    } else if (value > 10) {
      return 10;
    } else {
      return value;
    }
  };
  const [progress, setProgress] = React.useState(convertValueToPercentage(value));
  return (
    <div className="w-full">
      <input
        id="steps-range"
        type="range"
        min="0"
        max="10"
        defaultValue={progress}
        onChange={(e) => {
          setProgress(Math.round(Number(e.target.value)));
          onClick && onClick(Math.round(Number(e.target.value)));
        }}
        step="1"
        className="w-full bg-gray-200 accent-[#665AF1] border-none disabled:accent-[#665AF1] outline-none focus:outline-none"
        style={{
          accentColor: "#665AF1",
        }}
      />
    </div>
  );
};
export default RangeSlider;
