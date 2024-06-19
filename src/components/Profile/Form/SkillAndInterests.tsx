import dynamic from "next/dynamic";
import { IReactHookForm } from "./PersonalDetails";
import { Skill } from "@/utils/interfaces";
import AddSkill from "./Skills/AddSkill";
import AccordionComponent from "@/components/common/AccordionComponent";
import { Rating } from "react-simple-star-rating";
import SuggestedSkills from "./Skills/SuggestedSkills";
import { useGetSoftTechSkills } from "@/hooks/useData";
import { toLower } from "lodash";
import React from "react";
import GrammarError, { IGrammarResult } from "./GrammarError";
import { setGrammaticallyCorrectedText } from "@/utils/grammar.utils";
import ModalComponent from "@/components/common/ModalComponent";
import { GrammarCheckContent } from "@/components/common/GrammarCheck";
import { useGrammarCheck } from "@/hooks/usePrompts";
const Skills = dynamic(() => import("./Skills"));

export const ExistSuggestedSkills = (commonSkills: string[] | [], selectedData: Skill[] | []) => {
  return commonSkills.filter((skill) => !selectedData.some((s) => toLower(s.name) === toLower(skill))) || [];
};
const SkillAndInterest = ({ watch, getValues, setValue, setChangedData }: IReactHookForm) => {
  const { data } = useGetSoftTechSkills();
  const timerRef = React.useRef<{ label: string; timer: NodeJS.Timeout; index: number }[] | []>([]);
  const [modalOpenKey, setModalOpenKey] = React.useState<"" | "technicalSkills" | "softSkills" | "interests">("");
  const [loading, setLoading] = React.useState({
    technicalSkills: false,
    softSkills: false,
    interests: false,
  });
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [grammarCheckResult, setGrammarCheckResult] = React.useState<[] | IGrammarResult[]>([]);
  const grammarCheckMutation = useGrammarCheck();
  const handleGrammarCheck = async (text: string, label: string, index: number) => {
    if (text?.trim().split(" ")?.join(" ").trim().length >= 3) {
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
      <div className="flex flex-col gap-y-6">
        <AccordionComponent
          data={[
            {
              title: "Your Technical Skills",
              children: (
                <div className="grid grid-cols-1 gap-y-6">
                  {watch("technicalSkills")?.map((item: Skill, index: number) => (
                    <div key={index}>
                      <div className="w-full flex items-start md:items-center flex-col md:flex-row justify-between md:gap-x-20 gap-y-1 md:gap-y-0">
                        <Skills
                          value={item.name}
                          onChange={(value: string) => {
                            const technicalSkills = [...getValues().technicalSkills];
                            technicalSkills[index] = { ...technicalSkills[index], name: value };
                            setValue("technicalSkills", technicalSkills);
                            setChangedData && setChangedData(true);
                            handleChange("technicalSkills", value, index);
                          }}
                          onDelete={() => {
                            setValue(
                              "technicalSkills",
                              getValues().technicalSkills.filter((skill: Skill, idx: number) => idx !== index)
                            );
                            setChangedData && setChangedData(true);
                          }}
                          autoFocus={activeIndex === 0 && index === 0}
                          placeholder="Add Skill"
                        />
                        <Rating
                          allowFraction={true}
                          readonly={item.name === ""}
                          initialValue={item.level / 2}
                          onClick={(rating: number) => {
                            setValue(
                              "technicalSkills",
                              getValues().technicalSkills.map((eachSkill: Skill, idx: number) => {
                                if (index === idx) {
                                  return { ...eachSkill, level: Math.round(rating * 2) };
                                }
                                return eachSkill;
                              })
                            );
                            setChangedData && setChangedData(true);
                          }}
                          size={30}
                        />
                      </div>
                      <GrammarError
                        grammarCheckResult={grammarCheckResult}
                        labelName="technicalSkills"
                        value={item.name}
                        loading={loading.technicalSkills}
                        onClickCheckGrammar={() => {
                          setModalOpenKey("technicalSkills");
                          setActiveIndex(index);
                        }}
                        index={index}
                      />
                    </div>
                  ))}
                  <AddSkill
                    onClick={() => {
                      setValue("technicalSkills", [
                        {
                          name: "",
                          level: 0,
                        },
                        ...getValues().technicalSkills,
                      ]);
                      setChangedData && setChangedData(true);
                    }}
                    style={{
                      marginLeft: "10px",
                      marginTop: "10px",
                    }}
                  />
                  <SuggestedSkills
                    skills={ExistSuggestedSkills(data?.techSkills || [], watch("technicalSkills") || [])}
                    onClick={(value: string) => {
                      setValue("technicalSkills", [
                        {
                          name: value,
                          level: 0,
                        },
                        ...getValues().technicalSkills,
                      ]);
                      setChangedData && setChangedData(true);
                    }}
                  />
                </div>
              ),
            },
            {
              title: "Your Soft Skills",
              children: (
                <div className="grid grid-cols-1 gap-y-6">
                  {watch("softSkills")?.map((item: Skill, index: number) => (
                    <div key={index}>
                      <div className="flex items-start md:items-center flex-col md:flex-row justify-between mt-2 md:gap-x-20 gap-y-2 md:gap-y-0">
                        <Skills
                          value={item.name}
                          onChange={(value: string) => {
                            const softSkills = [...getValues().softSkills];
                            softSkills[index] = { ...softSkills[index], name: value };
                            setValue("softSkills", softSkills);
                            setChangedData && setChangedData(true);
                            handleChange("softSkills", value, index);
                          }}
                          onDelete={() => {
                            setValue(
                              "softSkills",
                              getValues().softSkills.filter((skill: Skill, idx: number) => idx !== index)
                            );
                            setChangedData && setChangedData(true);
                          }}
                          placeholder="Add Skill"
                          autoFocus={activeIndex === 1 && index === 0}
                        />
                        <Rating
                          allowFraction={true}
                          initialValue={item.level / 2}
                          readonly={item.name === ""}
                          onClick={(rating: number) => {
                            setValue(
                              "softSkills",
                              getValues().softSkills.map((eachSkill: Skill, idx: number) => {
                                if (index === idx) {
                                  return { ...eachSkill, level: Math.round(rating * 2) };
                                }
                                return eachSkill;
                              })
                            );
                            setChangedData && setChangedData(true);
                          }}
                          size={30}
                        />
                      </div>
                      <GrammarError
                        grammarCheckResult={grammarCheckResult}
                        labelName="softSkills"
                        value={item.name}
                        loading={loading.softSkills}
                        onClickCheckGrammar={() => {
                          setModalOpenKey("softSkills");
                          setActiveIndex(index);
                        }}
                        index={index}
                      />
                    </div>
                  ))}
                  <AddSkill
                    onClick={() => {
                      setValue("softSkills", [
                        {
                          name: "",
                          level: 0,
                        },
                        ...getValues().softSkills,
                      ]);
                      setChangedData && setChangedData(true);
                    }}
                    style={{
                      marginLeft: "10px",
                    }}
                  />
                  <SuggestedSkills
                    skills={ExistSuggestedSkills(data?.softSkills || [], watch("softSkills") || [])}
                    onClick={(value: string) => {
                      setValue("softSkills", [
                        {
                          name: value,
                          level: 0,
                        },
                        ...getValues().softSkills,
                      ]);
                      setChangedData && setChangedData(true);
                    }}
                  />
                </div>
              ),
            },
            {
              title: "Interests",
              children: (
                <div className="grid grid-cols-1 justify-start xs:grid-cols-2 gap-6 items-center">
                  {watch("interests").map((item: string, index: number) => (
                    <div key={index}>
                      <Skills
                        value={item}
                        onChange={(value: string) => {
                          const interests = [...getValues().interests];
                          interests[index] = value;
                          setValue("interests", interests);
                          setChangedData && setChangedData(true);
                          handleChange("interests", value, index);
                        }}
                        placeholder={`Interests #${index + 1}`}
                        onDelete={() => {
                          setValue(
                            "interests",
                            getValues().interests.filter((_: string, idx: number) => idx !== index)
                          );
                          setChangedData && setChangedData(true);
                        }}
                        autoFocus={activeIndex === 2 && index === 0}
                      />
                      <GrammarError
                        grammarCheckResult={grammarCheckResult}
                        labelName="interests"
                        value={item}
                        loading={loading.interests}
                        onClickCheckGrammar={() => {
                          setModalOpenKey("interests");
                          setActiveIndex(index);
                        }}
                        index={index}
                      />
                    </div>
                  ))}
                  <AddSkill
                    onClick={() => {
                      setValue("interests", ["", ...getValues().interests]);
                      setChangedData && setChangedData(true);
                    }}
                    style={{
                      marginLeft: "10px",
                    }}
                  />
                </div>
              ),
            },
          ]}
        />
      </div>
      <ModalComponent
        showModal={modalOpenKey !== ""}
        setShowModal={() => setModalOpenKey("")}
        children={
          <GrammarCheckContent
            handleGrammarCheckAccept={() => {
              if (modalOpenKey !== "") {
                const updatedData =
                  grammarCheckResult.filter((gcr) => gcr?.label === modalOpenKey && activeIndex === gcr.index)[0]
                    ?.correctedText || "";
                if (modalOpenKey === "interests") {
                  const data = [...getValues()[modalOpenKey]];
                  data[activeIndex] = updatedData;
                  setValue("interests", data);
                } else {
                  const data = [...getValues()[modalOpenKey]];
                  data[activeIndex] = { ...data[activeIndex], name: updatedData };
                  setValue(modalOpenKey, data);
                }
                setGrammarCheckResult((pre) =>
                  pre.filter((data) => data?.label !== modalOpenKey && activeIndex === data.index)
                );
                setChangedData && setChangedData(true);
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
export default SkillAndInterest;
