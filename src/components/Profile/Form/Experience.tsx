import dynamic from "next/dynamic";
import React from "react";
const FormHeading = dynamic(() => import("./formHeading/FormHeading"));
const TextInputComponent = dynamic(() => import("@/components/common/InputComponent/TextInputComponent"));
const TextAreaComponent = dynamic(() => import("@/components/common/InputComponent/TextAreaComponent"));
import { IReactHookForm } from "./PersonalDetails";
import { Experience } from "@/utils/interfaces";
import { getYearMonth } from "@/utils/customFunction.utils";
import AccordionComponent from "@/components/common/AccordionComponent";
import DeleteButton from "./DeleteButton";
import MonthAndYearPicker from "./MonthYearPicker";
import AddNewField from "./AddNewFieldButton";
import GrammarError, { IGrammarResult } from "./GrammarError";
import ModalComponent from "@/components/common/ModalComponent";
import { GrammarCheckContent } from "@/components/common/GrammarCheck";
import { setGrammaticallyCorrectedText } from "@/utils/grammar.utils";
import { useGrammarCheck } from "@/hooks/usePrompts";

const Experience = ({ watch, getValues, setValue, setChangedData }: IReactHookForm) => {
  const timerRef = React.useRef<{ label: string; timer: NodeJS.Timeout; index: number }[] | []>([]);
  const [modalOpenKey, setModalOpenKey] = React.useState<"" | "title" | "organization" | "areasOfResponsibility">("");
  const [loading, setLoading] = React.useState({
    title: false,
    organization: false,
    areasOfResponsibility: false,
  });
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [grammarCheckResult, setGrammarCheckResult] = React.useState<[] | IGrammarResult[]>([]);
  const grammarCheckMutation = useGrammarCheck();
  const udpateExperience = (index: number, field: string, value: string | boolean) => {
    setValue(
      "experience",
      getValues().experience.map((eachExperience: Experience, idx: number) => {
        if (index === idx) {
          return { ...eachExperience, [field]: value };
        }
        return eachExperience;
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
      <FormHeading label="Tell us about your experiences" />

      <AddNewField
        label="Add Experience"
        onClick={() => {
          setValue("experience", [
            {
              key: "",
              title: "",
              orgAddress: "",
              orgName: "",
              duration: "",
              techStack: [],
              areasOfResponsibility: "",
              highlights: [""],
              websiteLink: "",
            },
            ...getValues().experience,
          ]);
          setActiveIndex(0);
        }}
      />
      <AccordionComponent
        data={watch("experience")?.map((item: Experience, index: number) => ({
          title: `Experience ${watch("experience")?.length - index}`,
          children: (
            <div key={index} className="w-full grid grid-cols-1 gap-6">
              <div>
                <TextInputComponent
                  name="title"
                  placeholder="Job Title"
                  value={item.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    udpateExperience(index, "title", e.target.value);
                    handleChange("title", e.target.value, index);
                  }}
                  autoFocus={index === activeIndex}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="title"
                  value={item.title}
                  loading={loading.title}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("title");
                  }}
                  index={index}
                />
              </div>
              <div>
                <TextInputComponent
                  name="organization"
                  placeholder="Organization Name"
                  value={item.orgName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    udpateExperience(index, "orgName", e.target.value);
                    handleChange("organization", e.target.value, index);
                  }}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="organization"
                  value={item.orgName}
                  loading={loading.organization}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("organization");
                  }}
                  index={index}
                />
              </div>
              <TextInputComponent
                name="websiteLink"
                placeholder="Company Website Link    (Optional)"
                value={item.websiteLink}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  udpateExperience(index, "websiteLink", e.target.value);
                }}
              />
              <MonthAndYearPicker
                startDate={item.startDate || ""}
                endDate={item.endDate || ""}
                onPickStartMonth={(value: string) => {
                  udpateExperience(index, "startDate", `${value}-${getYearMonth(item.startDate || "")?.year || ""}`);
                }}
                onPickStartYear={(value: string) => {
                  udpateExperience(index, "startDate", `${getYearMonth(item.startDate || "")?.month}-${value}`);
                }}
                onPickEndMonth={(value: string) => {
                  udpateExperience(index, "endDate", `${value}-${getYearMonth(item.endDate || "")?.month}`);
                }}
                onPickEndYear={(value: string) => {
                  udpateExperience(index, "endDate", `${getYearMonth(item.endDate || "")?.month}-${value}`);
                }}
                checkboxLabel="Present"
                checked={item?.isPresent || false}
                onClickCheckbox={(checked, value) => {
                  udpateExperience(index, "endDate", "");
                  udpateExperience(index, "isPresent", checked);
                }}
              />

              <div>
                <TextAreaComponent
                  name="areasOfResponsibility"
                  placeholder="Accomplishments"
                  value={item.areasOfResponsibility}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    udpateExperience(index, "areasOfResponsibility", e.target.value);
                    handleChange("areasOfResponsibility", e.target.value, index);
                  }}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="areasOfResponsibility"
                  value={item.areasOfResponsibility}
                  loading={loading.areasOfResponsibility}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("areasOfResponsibility");
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
                  "experience",
                  getValues().experience.filter((_: Experience, idx: number) => idx !== index)
                );
              }}
            />
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
                udpateExperience(
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
export default Experience;
