import dynamic from "next/dynamic";
import React from "react";
const DropDownComponent = dynamic(() => import("@/components/common/DropDown/DropDownComponent"));
const YearPicker = ({
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
  const getYear = () => {
    const currentYear = new Date().getFullYear();
    const yearArray: { id: string; value: string }[] = [];
    for (let i = currentYear - 20; i < currentYear + 20; i++) {
      yearArray.push({
        id: i.toString(),
        value: i.toString(),
      });
    }
    return yearArray;
  };

  return (
    <DropDownComponent
      name={name || "year"}
      placeholder={placeholder || "Year"}
      selected={selected}
      setSelected={setSelected}
      options={getYear()}
      style={{
        paddingRight: "4px",
      }}
    />
  );
};
export default YearPicker;
