"use client";
import dynamic from "next/dynamic";
const TextInputComponent = dynamic(() => import("@/components/common/InputComponent/TextInputComponent"), {
  ssr: false,
});
const FormHeading = dynamic(() => import("./formHeading/FormHeading"));
const TextAreaComponent = dynamic(() => import("@/components/common/InputComponent/TextAreaComponent"), {
  ssr: false,
});
const AccordionComponent = dynamic(() => import("@/components/common/AccordionComponent"), { ssr: false });
import { IReactHookForm } from "./PersonalDetails";
import { Achievement } from "@/utils/interfaces";
import AddNewField from "./AddNewFieldButton";
import DeleteButton from "./DeleteButton";
import React from "react";
import GrammarError, { IGrammarResult } from "./GrammarError";
import ModalComponent from "@/components/common/ModalComponent";
import { GrammarCheckContent } from "@/components/common/GrammarCheck";
import { executeGrammarCheckPrompt } from "@/apis/prompt";
import { setGrammaticallyCorrectedText } from "@/utils/grammar.utils";
import { useGrammarCheck } from "@/hooks/usePrompts";

const Achievement = ({ watch, getValues, setValue, setChangedData }: IReactHookForm) => {
  const timerRef = React.useRef<{ label: string; timer: NodeJS.Timeout; index: number }[] | []>([]);
  const [modalOpenKey, setModalOpenKey] = React.useState<"" | "title" | "organisation" | "description">("");
  const [loading, setLoading] = React.useState({
    title: false,
    organisation: false,
    description: false,
  });
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [grammarCheckResult, setGrammarCheckResult] = React.useState<[] | IGrammarResult[]>([]);
  const grammarCheckMutation = useGrammarCheck();
  const updateAchievement = (index: number, field: string, value: string) => {
    setValue(
      "achievements",
      getValues().achievements.map((achievement: any, idx: number) => {
        if (index === idx) {
          return { ...achievement, [field]: value };
        }
        return achievement;
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
      <FormHeading label="Achievements" />
      <AddNewField
        label="Add Achievement"
        onClick={() => {
          setValue("achievements", [
            {
              title: "",
              orgName: "",
              description: "",
              certificateUrl: "",
            },
            ...getValues().achievements,
          ]);
          setActiveIndex(0);
        }}
      />

      <AccordionComponent
        data={watch("achievements")?.map((item: Achievement, index: number) => ({
          title: `Achievement ${watch("achievements")?.length - index}`,
          children: (
            <div key={index} className="w-full grid grid-cols-1 gap-6">
              <div>
                <TextInputComponent
                  name="title"
                  placeholder="Title"
                  value={item.title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateAchievement(index, "title", e.target.value);
                    handleChange("title", e.target.value, index);
                  }}
                  autoFocus={index === 0}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="title"
                  value={item.title}
                  loading={loading.title}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("title");
                    setActiveIndex(index);
                  }}
                  index={index}
                />
              </div>
              <div>
                <TextInputComponent
                  name="organisation"
                  placeholder="Organisation or Institute Name"
                  value={item.orgName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateAchievement(index, "orgName", e.target.value);
                    handleChange("organisation", e.target.value, index);
                  }}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  labelName="organisation"
                  value={item.orgName}
                  loading={loading.organisation}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("organisation");
                    setActiveIndex(index);
                  }}
                  index={index}
                />
              </div>

              <TextInputComponent
                name="url"
                placeholder="Certificate Url"
                value={item.certificateUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  updateAchievement(index, "certificateUrl", e.target.value);
                }}
              />
              <div>
                <TextAreaComponent
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    updateAchievement(index, "description", e.target.value);
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
                    setActiveIndex(index);
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
                  "achievements",
                  getValues().achievements.filter((eachAchievement: Achievement, idx: number) => idx !== index)
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
                updateAchievement(
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
        width="40%"
        backgroundColor="#fff"
      />
    </div>
  );
};
export default Achievement;
