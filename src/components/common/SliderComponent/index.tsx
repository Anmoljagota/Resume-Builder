"use client";
import React from "react";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
const SliderComponent = ({ children, gap = 3 }: { children: React.ReactNode; gap?: number }) => {
  const containerRef = React.useRef<any>(null);

  const scrollLeft = () => {
    const container = containerRef.current;
    const elementWidth = container.firstChild.offsetWidth;
    container.scrollTo({
      left: container.scrollLeft - elementWidth + gap * 4,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    const container = containerRef.current;
    const elementWidth = container.firstChild.offsetWidth;
    container.scrollTo({
      left: container.scrollLeft + elementWidth + 20,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full grid grid-cols-[0.5fr_11fr_0.5fr] gap-x-2 items-center h-full overflow-y-visible">
      <div
        className="flex justify-end items-center"
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()}
      >
        <AiOutlineLeft className="h-6 w-6 text-[#fff] cursor-pointer" onClick={scrollLeft} />
      </div>
      <div
        className="flex overflow-x-scroll  transition-transform duration-700 ease-in-out overflow-y-visible py-4 px-7"
        style={{
          scrollbarWidth: "none",
          scrollBehavior: "smooth",
          gap: `${gap}rem`,
        }}
        ref={containerRef}
      >
        {children}
      </div>
      <div
        className="w-full  flex justify-start items-center"
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => event.stopPropagation()}
      >
        <AiOutlineRight className="h-6 w-6 text-[#fff] cursor-pointer" onClick={scrollRight} />
      </div>
    </div>
  );
};
export default SliderComponent;
