import React from "react";

const DataCard = ({ children, label }: { children: React.ReactNode; label: string }) => {
  return (
    <div
      className="w-full  h-full py-7 px-9 lg:h-[267px] rounded-[22px] grid grid-cols-1 grid-rows-[1fr_10fr_1fr] gap-y-2"
      style={{
        backgroundImage: "linear-gradient(222deg, #527AFF 2.37%, #1230A3 84.49%)",
      }}
    >
      <p className="font-medium text-[25px]">{label}</p>
      <div className="flex flex-col gap-y-3 overflow-y-auto">{children}</div>
      <div className="flex items-center justify-end mr-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="10" viewBox="0 0 20 10" fill="none">
          <path d="M18 2L10 8L2 2" stroke="#EDEDED" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
export default DataCard;
