"use client";
import React from "react";
const FontSizeSelection = ({ onSelect, selectedFont }: { onSelect: (value: string) => void; selectedFont: string }) => {
  const fontSize = ["small", "medium", "large"];
  return (
    <div>
      <p className="capitalize text-[#2E1971] font-normal text-lg mb-5">Font Size</p>
      <div className="w-full flex justify-between items-center">
        {fontSize.map((font, index) => (
          <div
            key={index}
            className="flex justify-start gap-x-2 items-center px-2 py-1.5 bg-[#F5F5F5] border border-solid border-[#CBCBCB] rounded-full"
            onClick={() => onSelect(font)}
          >
            <div
              className="h-6 w-6 rounded-full flex items-center justify-center cursor-pointer"
              style={{
                backgroundColor: selectedFont === font ? "#6A56F3" : "#CBCBCB",
                color: "#fff",
              }}
            >
              {selectedFont === font && (
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 3.85714L3.8 6L6.4 3.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              )}
            </div>
            <p className="capitalize">{font}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default FontSizeSelection;
