"use client";
import dynamic from "next/dynamic";
import { AiOutlinePlus } from "react-icons/ai";
import { IReactHookForm } from "./PersonalDetails";
import { Certification } from "@/utils/interfaces";
import AccordionComponent from "@/components/common/AccordionComponent";
import MonthAndYearPicker from "./MonthYearPicker";
import { getYearMonth } from "@/utils/customFunction.utils";
import TextAreaComponent from "@/components/common/InputComponent/TextAreaComponent";
import React from "react";
import DeleteButton from "./DeleteButton";
import AddNewField from "./AddNewFieldButton";
import GrammarError, { IGrammarResult } from "./GrammarError";
import ModalComponent from "@/components/common/ModalComponent";
import { GrammarCheckContent } from "@/components/common/GrammarCheck";
import { setGrammaticallyCorrectedText } from "@/utils/grammar.utils";
import { useGrammarCheck } from "@/hooks/usePrompts";
const FormHeading = dynamic(() => import("./formHeading/FormHeading"));
const TextInputComponent = dynamic(() => import("@/components/common/InputComponent/TextInputComponent"));

const Certification = ({ watch, getValues, setValue, setChangedData }: IReactHookForm) => {
  const timerRef = React.useRef<{ label: string; timer: NodeJS.Timeout; index: number }[] | []>([]);
  const [modalOpenKey, setModalOpenKey] = React.useState<"" | "name" | "instituteName" | "description">("");
  const [loading, setLoading] = React.useState({
    name: false,
    instituteName: false,
    description: false,
  });
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [grammarCheckResult, setGrammarCheckResult] = React.useState<[] | IGrammarResult[]>([]);
  const grammarCheckMutation = useGrammarCheck();
  const updateCertificate = (index: number, field: string, value: string | boolean) => {
    setValue(
      "certifications",
      getValues().certifications.map((certificate: Certification, idx: number) => {
        if (index === idx) {
          return { ...certificate, [field]: value };
        }
        return certificate;
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
      <FormHeading label="Certification" />
      <AddNewField
        label="Add Certificate"
        onClick={() => {
          setValue("certifications", [
            {
              name: "",
              instituteName: "",
              certificateUrl: "",
              description: "",
              startDate: "",
              endDate: "",
            },
            ...getValues().certifications,
          ]);
          setActiveIndex(0);
        }}
      />

      <AccordionComponent
        data={watch("certifications").map((item: Certification, index: number) => ({
          title: `Certificate ${watch("certifications")?.length - index}`,
          children: (
            <div key={index} className="w-full grid grid-cols-1 gap-6">
              <div>
                <TextInputComponent
                  name="course"
                  placeholder="Certificate Name"
                  value={item.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateCertificate(index, "name", e.target.value);
                    handleChange("name", e.target.value, index);
                  }}
                  autoFocus={index === activeIndex}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="name"
                  value={item.name}
                  loading={loading.name}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("name");
                  }}
                  index={index}
                />
              </div>

              <TextInputComponent
                name="file"
                placeholder="Credential URL (Optional)"
                value={item.certificateUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateCertificate(index, "certificateUrl", e.target.value);
                }}
              />
              <div>
                <TextInputComponent
                  name="institue"
                  placeholder="Issuing Organization"
                  value={item.instituteName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateCertificate(index, "instituteName", e.target.value);
                    handleChange("instituteName", e.target.value, index);
                  }}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="instituteName"
                  value={item.instituteName}
                  loading={loading.instituteName}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("instituteName");
                  }}
                  index={index}
                />
              </div>
              <MonthAndYearPicker
                startDate={item.startDate || ""}
                endDate={item.endDate || ""}
                onPickStartMonth={(value: string) =>
                  updateCertificate(index, "startDate", `${value}-${getYearMonth(item?.startDate || " ").year || ""}`)
                }
                onPickStartYear={(value: string) =>
                  updateCertificate(index, "startDate", `${getYearMonth(item?.startDate || " ").month || ""}-${value}`)
                }
                onPickEndMonth={(value: string) =>
                  updateCertificate(index, "endDate", `${value}-${getYearMonth(item?.endDate || " ").year || ""}`)
                }
                onPickEndYear={(value: string) =>
                  updateCertificate(index, "endDate", `${getYearMonth(item?.endDate || " ").month || ""}-${value}`)
                }
                checkboxLabel="Does not expire"
                checked={item?.isPresent || false}
                onClickCheckbox={(checked, value) => {
                  updateCertificate(index, "isPresent", checked);
                  updateCertificate(index, "endDate", "");
                }}
              />
              <div>
                <TextAreaComponent
                  name="description"
                  placeholder="Description (Optional)"
                  value={item.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    updateCertificate(index, "description", e.target.value);
                    handleChange("description", e.target.value, index);
                  }}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="description"
                  value={item.description}
                  loading={loading.description}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("description");
                  }}
                  index={index}
                />
              </div>
            </div>
          ),
          endIcon: (
            <DeleteButton
              onDelete={() => {
                setValue(
                  "certifications",
                  getValues().certifications.filter((eachCertificate: Certification, idx: number) => idx !== index)
                );
              }}
            />
          ),
        }))}
        getActiveIndex={(index: number) => setActiveIndex(index)}
      />
      <ModalComponent
        showModal={modalOpenKey !== ""}
        setShowModal={() => setModalOpenKey("")}
        children={
          <GrammarCheckContent
            handleGrammarCheckAccept={() => {
              if (modalOpenKey !== "") {
                updateCertificate(
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
export default Certification;
