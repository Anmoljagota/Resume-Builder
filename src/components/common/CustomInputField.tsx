import { ProfileContext } from "@/context/profile.context";
import { Field, useFormikContext, useField } from "formik";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import GrammarCheck from "./GrammarCheck";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  help?: React.ReactNode;
  grammarCheck?: boolean;
  inputTransformer?: (value: string) => string;
}
const CustomInputField = ({
  label,
  name,
  placeholder,
  inputTransformer,
  help,
  grammarCheck,
}: Props) => {
  const [isHelpTextOpen, setIsHelpTextOpen] = useState(false);
  const { setFieldValue, values } = useFormikContext();
  const value = values[name];
  const [updatedValue, setUpdatedValue] = useState(value);

  const handleGrammarCheckAccept = (grammarCheckResult: string) => {
    setFieldValue(name, grammarCheckResult);
  };
  return (
    <div className="p-[8px]">
      <div className="flex gap-[8px] items-center">
        <label
          className=" mr-[8px] block text-sm font-medium text-white"
          htmlFor={name}
        >
          {label}
        </label>
        {help ? (
          <FaInfoCircle
            onClick={() => setIsHelpTextOpen(!isHelpTextOpen)}
            className="text-[#fff] text-[20px]"
          />
        ) : null}
        {true && updatedValue && (
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
        className="text-[#000] mt-[8px] w-[100%] border rounded-[4px] p-[8px] border-[#b8b4b4]"
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={(e: any) => {
          const value = inputTransformer
            ? inputTransformer(e.target.value)
            : e.target.value;
          setFieldValue(name, value);
          setUpdatedValue(value);
        }}
      />
    </div>
  );
};

export default CustomInputField;
