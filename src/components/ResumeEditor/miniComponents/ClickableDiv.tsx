"use client";

import { Spinner } from "flowbite-react";
import { twMerge } from "tailwind-merge";

const ClickableDiv = ({
  label,
  onClick,
  loading = false,
}: {
  label: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  loading?: boolean;
}) => {
  return (
    <div
      className={twMerge(
        "h-15 border-[1px] border-[#CBCBCB] bg-[#F5F5F5] rounded w-full px-7 py-3 text-lg text-[#343434]",
        `${loading ? "cursor-not-allowed" : "cursor-pointer"}`
      )}
      onClick={onClick}
    >
      {loading && <Spinner aria-label="Default status example" className="mr-2" />}
      {label}
    </div>
  );
};
export default ClickableDiv;
