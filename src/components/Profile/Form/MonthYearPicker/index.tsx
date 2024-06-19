"use client";
import dynamic from "next/dynamic";
import React from "react";
import { getYearMonth } from "@/utils/customFunction.utils";
import useGetServerTime from "@/hooks/useData";
import { Checkbox } from "flowbite-react";
const MonthPicker = dynamic(() => import("./MonthPicker"), { ssr: false });
const YearPicker = dynamic(() => import("./YearPicker"));

interface IMonthAndYearPickerProps {
  startDate: string;
  endDate: string;
  onPickStartMonth: (value: string) => void;
  onPickStartYear: (value: string) => void;
  onPickEndMonth: (value: string) => void;
  onPickEndYear: (value: string) => void;
  checkboxLabel?: string;
  onClickCheckbox?: (checked: boolean, value: string) => void;
  checked?: boolean;
}

const MonthAndYearPicker = ({
  startDate,
  endDate,
  onPickStartMonth,
  onPickStartYear,
  onPickEndMonth,
  onPickEndYear,
  checked = false,
  onClickCheckbox,
  checkboxLabel = "Present",
}: IMonthAndYearPickerProps) => {
  const mode = "light";
  const CheckboxColor = {
    light: {
      labelColor: "#C8C8C8",
      color: "#4A9DFF",
    },
    dark: {
      labelColor: "#C8C8C8",
      color: "#4A9DFF",
    },
  };
  const { data } = useGetServerTime();
  const currentMonthYear = React.useMemo(() => {
    let currentDate = new Date();
    if (data?.date) {
      currentDate = new Date(data?.date);
    }

    return {
      month: currentDate.toLocaleString("en-US", { month: "long" }),
      year: currentDate.getFullYear(),
    };
  }, [data, endDate]);
  return (
    <div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-[46%_4%_46%] sm:grid-rows-1  sm:gap-3 items-start sm:max-h-36">
        <div className="w-full grid grid-rows-[1fr_2fr] sm:grid-rows-[1fr_2fr_1fr] h-full">
          <div className="capitalize text-[#2E1971] text-md md:text-base font-normal">start date</div>
          <div className="flex item-center justify-between flex-col sxs:flex-row gap-x-1 gap-y-1 sxs:gap-y-0 ">
            <MonthPicker
              name="month"
              placeholder="Month"
              selected={getYearMonth(startDate)?.month || ""}
              setSelected={onPickStartMonth}
            />
            <YearPicker
              name="year"
              placeholder="Year"
              selected={getYearMonth(startDate)?.year || ""}
              setSelected={onPickStartYear}
            />
          </div>
          <div className="invisible"></div>
        </div>
        <div className="w-full h-full items-center hidden  sm:grid grid-rows-[2fr_2fr_2fr] ">
          <div className="h-0.5 w-3 bg-[#2E1971] invisible"></div>
          <div className="h-0.5 w-3 bg-[#2E1971]"></div>
          <div className="h-0.5 w-3 bg-[#2E1971] invisible"></div>
        </div>
        <div className="w-full h-full grid grid-rows-[1fr_2fr_1fr]">
          <div className="capitalize text-[#2E1971] text-md md:text-base font-normal">end date</div>
          <div className="flex flex-col item-center justify-between  sxs:flex-row gap-x-1 gap-y-1 sxs:gap-y-0">
            {!checked && (
              <>
                <MonthPicker
                  name="month"
                  placeholder="Month"
                  selected={getYearMonth(endDate)?.month || ""}
                  setSelected={onPickEndMonth}
                />
                <YearPicker
                  name="year"
                  placeholder="Year"
                  selected={getYearMonth(endDate)?.year || ""}
                  setSelected={onPickEndYear}
                />
              </>
            )}
            {checked && (
              <div className="flex items-center justify-center h-full gap-x-2">
                <Checkbox
                  checked={checked}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onClickCheckbox &&
                      onClickCheckbox(e.target.checked, `${currentMonthYear.month}-${currentMonthYear.year}`);
                  }}
                  className="cursor-pointer"
                  id="accept"
                  style={{ color: CheckboxColor[mode].color }}
                />
                <p
                  className="text-base font-light"
                  style={{
                    color: CheckboxColor[mode].labelColor,
                  }}
                >
                  Present
                </p>
              </div>
            )}
          </div>

          {!checked && (
            <div className="flex items-center  h-full gap-x-2 mt-1">
              <Checkbox
                checked={checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onClickCheckbox &&
                    onClickCheckbox(e.target.checked, `${currentMonthYear.month}-${currentMonthYear.year}`);
                }}
                className="cursor-pointer"
                id="accept"
                style={{ color: CheckboxColor[mode].color }}
              />
              <p
                className="text-base font-light"
                style={{
                  color: CheckboxColor[mode].labelColor,
                }}
              >
                Present
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default MonthAndYearPicker;
