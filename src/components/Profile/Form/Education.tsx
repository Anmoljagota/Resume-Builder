import dynamic from "next/dynamic";
import React from "react";
const TextInputComponent = dynamic(() => import("@/components/common/InputComponent/TextInputComponent"));
const FormHeading = dynamic(() => import("./formHeading/FormHeading"));
const TextAreaComponent = dynamic(() => import("@/components/common/InputComponent/TextAreaComponent"));

import { AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { IReactHookForm } from "./PersonalDetails";
import { Education } from "@/utils/interfaces";
import DeleteButton from "./DeleteButton";
import AccordionComponent from "@/components/common/AccordionComponent";
import MonthAndYearPicker from "./MonthYearPicker";
import AddNewField from "./AddNewFieldButton";
import GrammarError, { IGrammarResult } from "./GrammarError";
import { GrammarCheckContent } from "@/components/common/GrammarCheck";
import ModalComponent from "@/components/common/ModalComponent";
import { executeGrammarCheckPrompt } from "@/apis/prompt";
import { setGrammaticallyCorrectedText } from "@/utils/grammar.utils";
import { useGrammarCheck } from "@/hooks/usePrompts";

interface IInitialState {
  openDropDown: boolean;
  selectedValue: string;
}
const reducer = (state: IInitialState, action: any) => {
  switch (action.type) {
    case "openDropDown":
      return { ...state, openDropDown: !state.openDropDown };
    case "selectedValue":
      return { ...state, selectedValue: action.payload };
    default:
      return state;
  }
};

const Education = ({ watch, getValues, setValue, setChangedData }: IReactHookForm) => {
  const initialState = {
    openDropDown: false,
    selectedValue: "",
  };
  const timerRef = React.useRef<{ label: string; timer: NodeJS.Timeout; index: number }[] | []>([]);
  const [modalOpenKey, setModalOpenKey] = React.useState<"" | "instituteName" | "courseName" | "instituteAddress">("");
  const [loading, setLoading] = React.useState({ instituteName: false, courseName: false, instituteAddress: false });
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [grammarCheckResult, setGrammarCheckResult] = React.useState<[] | IGrammarResult[]>([]);
  const grammarCheckMutation = useGrammarCheck();
  const getYears = (duration: string) => {
    const [startYear, endYear] = duration.split("-");
    return { startYear: startYear || "", endYear: endYear || "" };
  };

  const updateEducation = (index: number, field: string, value: string | boolean) => {
    setValue(
      "education",
      getValues().education.map((eachEducation: Education, idx: number) => {
        if (index === idx) {
          return { ...eachEducation, [field]: value };
        }
        return eachEducation;
      })
    );
    setChangedData && setChangedData(true);
  };
  const handleGrammarCheck = async (text: string, label: string, index: number) => {
    if (text?.trim().split(" ")?.join(" ").trim().length > 5) {
      setLoading((pre) => ({ ...pre, [label]: true }));
      grammarCheckMutation.mutate(text, {
        onSuccess: (response) => {
          setGrammarCheckResult((pre) => {
            setLoading((pre) => ({ ...pre, [label]: false }));
            return setGrammaticallyCorrectedText(pre, text, label, response?.correctedText, index);
          });
        },
      });
    } else {
      setGrammarCheckResult((pre) => {
        return pre.filter((data) => data?.label !== label && index === data.index);
      });
    }
  };

  const handleChange = (key: string, value: string, index: number) => {
    const existTimer = timerRef.current?.filter((data) => data?.label === key && data?.index === index);
    if (existTimer && existTimer?.length > 0) {
      clearTimeout(existTimer[0]?.timer);
      timerRef.current = timerRef.current?.filter((data) => data?.label !== key && data?.index === index);
    }
    timerRef.current = [
      ...timerRef.current,
      { label: key, timer: setTimeout(() => handleGrammarCheck(value, key, index), 2000), index },
    ];
  };
  return (
    <div className="grid grid-cols-1 gap-5 sm:gap-7 px-[50px]">
      <FormHeading label="Education" />
      <AddNewField
        label="Add Education"
        onClick={() => {
          setValue("education", [
            { instituteName: "", courseName: "", instituteAddress: "", duration: "", key: "" },
            ...getValues().education,
          ]);
          setActiveIndex(0);
        }}
      />

      <AccordionComponent
        data={watch("education")?.map((item: Education, index: number) => ({
          title: `Instiute ${watch("education")?.length - index}`,
          endIcon: (
            <DeleteButton
              onDelete={(e) => {
                e.stopPropagation();
                setValue(
                  "education",
                  getValues().education.filter((eachEducation: Education, idx: number) => idx !== index)
                );
              }}
            />
          ),
          children: (
            <div key={index} className="w-full grid grid-cols-1 gap-6">
              {/* <div className="flex justify-end items-center pr-6">
                <DeleteButton onDelete={() => {}} />
              </div> */}
              <div>
                <TextInputComponent
                  name="university"
                  placeholder="University/School"
                  value={item.instituteName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateEducation(index, "instituteName", e.target.value);
                    handleChange("instituteName", e.target.value, index);
                  }}
                  autoFocus={index === activeIndex}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="instituteName"
                  loading={loading.instituteName}
                  onClickCheckGrammar={() => setModalOpenKey("instituteName")}
                  value={item.instituteName}
                  index={index}
                />
              </div>
              <div>
                <TextInputComponent
                  name="degree"
                  placeholder="Degree ( E.g.Bachelor's degree, High school diploma, etc)"
                  value={item.courseName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateEducation(index, "courseName", e.target.value);
                    handleChange("courseName", e.target.value, index);
                  }}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="courseName"
                  loading={loading.courseName}
                  onClickCheckGrammar={() => setModalOpenKey("courseName")}
                  value={item.courseName}
                  index={index}
                />
              </div>
              <MonthAndYearPicker
                startDate={item.startDate || ""}
                endDate={item.endDate || ""}
                onPickStartMonth={(value: string) => {
                  updateEducation(index, "startDate", `${value}-${getYears(item.startDate || "")?.endYear || ""}`);
                }}
                onPickStartYear={(value: string) => {
                  updateEducation(index, "startDate", `${getYears(item.startDate || "")?.startYear || ""}-${value}`);
                }}
                onPickEndMonth={(value: string) => {
                  updateEducation(index, "endDate", `${value}-${getYears(item.endDate || "")?.endYear || ""}`);
                }}
                onPickEndYear={(value: string) => {
                  updateEducation(index, "endDate", `${getYears(item.endDate || "")?.startYear || ""}-${value}`);
                }}
                checkboxLabel="Present"
                checked={item?.isPresent || false}
                onClickCheckbox={(checked, value) => {
                  updateEducation(index, "isPresent", checked);
                  updateEducation(index, "endDate", "");
                }}
              />

              <div>
                <TextAreaComponent
                  name="instituteAddress"
                  placeholder="Enter Institute Address"
                  value={item.instituteAddress}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    updateEducation(index, "instituteAddress", e.target.value);
                    handleChange("instituteAddress", e.target.value, index);
                  }}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="instituteAddress"
                  loading={loading.instituteAddress}
                  onClickCheckGrammar={() => setModalOpenKey("instituteAddress")}
                  value={item.instituteAddress}
                  index={index}
                />
              </div>
            </div>
          ),
        }))}
        getActiveIndex={(value: number) => setActiveIndex(value)}
      />
      <ModalComponent
        showModal={modalOpenKey !== ""}
        setShowModal={() => setModalOpenKey("")}
        children={
          <GrammarCheckContent
            handleGrammarCheckAccept={() => {
              if (modalOpenKey !== "") {
                updateEducation(
                  activeIndex,
                  modalOpenKey,
                  grammarCheckResult.filter((gcr) => gcr?.label === modalOpenKey && activeIndex === gcr.index)[0]
                    ?.correctedText || ""
                );
                setGrammarCheckResult((pre) =>
                  pre.filter((data) => data?.label !== modalOpenKey && activeIndex === data.index)
                );
                setModalOpenKey("");
              }
            }}
            handleGrammarCheck={() => {}}
            grammarCheckResult={
              grammarCheckResult.filter((gcr) => gcr?.label === modalOpenKey && activeIndex === gcr.index)[0]
                ?.correctedText || ""
            }
            textToCheck={
              grammarCheckResult.filter((gcr) => gcr?.label === modalOpenKey && activeIndex === gcr.index)[0]?.text ||
              ""
            }
            handleRejectResult={() => {
              setGrammarCheckResult((pre) =>
                pre.filter((data) => data?.label !== modalOpenKey && activeIndex === data.index)
              );
              setModalOpenKey("");
            }}
          />
        }
        header={<></>}
        width="30%"
        backgroundColor="#fff"
      />
    </div>
  );
};
export default Education;
