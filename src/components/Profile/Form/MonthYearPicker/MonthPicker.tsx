import dynamic from "next/dynamic";
import React from "react";
const DropDownComponent = dynamic(() => import("@/components/common/DropDown/DropDownComponent"));
const MonthPicker = ({
  name,
  placeholder,
  selected,
  setSelected,
}: {
  name: string;
  placeholder: string;
  selected: string;
  setSelected: (value: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <DropDownComponent
      name={name || "month"}
      placeholder={placeholder || "Month"}
      selected={selected}
      setSelected={setSelected}
      style={{
        paddingRight: "4px",
      }}
      options={[
        { id: "jan", value: "January" },
        { id: "feb", value: "February" },
        { id: "mar", value: "March" },
        { id: "apr", value: "April" },
        { id: "may", value: "May" },
        { id: "jun", value: "June" },
        { id: "jul", value: "July" },
        { id: "aug", value: "August" },
        { id: "sep", value: "September" },
        { id: "oct", value: "October" },
        { id: "nov", value: "November" },
        { id: "dec", value: "December" },
      ]}
    />
  );
};
export default MonthPicker;
