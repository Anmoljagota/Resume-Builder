import { Field, useFormikContext } from "formik";
import React, { useContext, useState } from "react";
import GrammarCheck from "./GrammarCheck";
import { ProfileContext } from "@/context/profile.context";
import { FaInfoCircle } from "react-icons/fa";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  grammarCheck?: boolean;
  value?: string;
  help?: string;
  minHeight?: string;
}

const CustomTextarea = ({
  grammarCheck,
  label,
  name,
  placeholder,
  minHeight,
  help,
}: Props) => {
  const [isHelpTextOpen, setIsHelpTextOpen] = useState(false);
  const { setFieldValue, values } = useFormikContext();
  const value = values[name];
  const [updatedValue, setUpdatedValue] = useState(value);
  const handleGrammarCheckAccept = (grammarCheckResult: string) => {
    console.log("grammarCheckResult:", grammarCheckResult);
    setFieldValue(name, grammarCheckResult);
  };
  return (
    <div className="p-[8px]">
      <div className="flex gap-[8px] items-center">
        <label className="block text-sm font-medium text-white" htmlFor={name}>
          {label}
        </label>
        {help ? (
          <FaInfoCircle
            onClick={() => setIsHelpTextOpen(!isHelpTextOpen)}
            className="text-[#fff] text-[20px]"
          />
        ) : null}
        {grammarCheck && updatedValue && (
          <GrammarCheck
            handleGrammarCheckAccept={handleGrammarCheckAccept}
            text={updatedValue}
          />
        )}
      </div>
      {isHelpTextOpen && (
        <div className="text-black rounded-lg p-2 bg-slate-400">{help}</div>
      )}

      <Field
        style={{ minHeight: minHeight }}
        as="textarea"
        className="text-[#000] mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={(e: any) => {
          const value = e.target.value;
          setFieldValue(name, value);
          setUpdatedValue(value);
        }}
      />
    </div>
  );
};

export default CustomTextarea;
