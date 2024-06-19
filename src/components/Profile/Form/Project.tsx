"use client";
import dynamic from "next/dynamic";
import { IReactHookForm } from "./PersonalDetails";
import { Project } from "@/utils/interfaces";
import { getYearMonth } from "@/utils/customFunction.utils";
import AddSkill from "./Skills/AddSkill";
import { twMerge } from "tailwind-merge";
import DeleteButton from "./DeleteButton";
import MonthAndYearPicker from "./MonthYearPicker";
import AddNewField from "./AddNewFieldButton";
import React from "react";
import GrammarError, { IGrammarResult } from "./GrammarError";
import { setGrammaticallyCorrectedText } from "@/utils/grammar.utils";
import ModalComponent from "@/components/common/ModalComponent";
import { GrammarCheckContent } from "@/components/common/GrammarCheck";
import { useGrammarCheck } from "@/hooks/usePrompts";
const Skills = dynamic(() => import("./Skills"));
const FormHeading = dynamic(() => import("./formHeading/FormHeading"));
const TextInputComponent = dynamic(() => import("@/components/common/InputComponent/TextInputComponent"), {
  ssr: false,
});
const RangeSlider = dynamic(() => import("@/components/common/ProgressBar/RangeSlider"));
const TextAreaComponent = dynamic(() => import("@/components/common/InputComponent/TextAreaComponent"), {
  ssr: false,
});
const AccordionComponent = dynamic(() => import("@/components/common/AccordionComponent"), { ssr: false });
const Project = ({ watch, getValues, setValue, setChangedData }: IReactHookForm) => {
  const mode = "light";
  const ProjectColors = {
    light: {
      techStack: {
        color: "#2E1971",
      },
      progressText: { color: "#2E1971" },
    },
    dark: {
      techStack: {
        color: "#2E1971",
      },
      progressText: { color: "#2E1971" },
    },
  };
  const timerRef = React.useRef<{ label: string; timer: NodeJS.Timeout; index: number }[] | []>([]);
  const [modalOpenKey, setModalOpenKey] = React.useState<
    "" | "name" | "description" | "features" | "areasOfResponsibility"
  >("");
  const [loading, setLoading] = React.useState({
    name: false,
    description: false,
    features: false,
    areasOfResponsibility: false,
  });
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [grammarCheckResult, setGrammarCheckResult] = React.useState<[] | IGrammarResult[]>([]);
  const grammarCheckMutation = useGrammarCheck();
  const updateProject = (index: number, key: string, value: string | number | string[] | boolean) => {
    setValue(
      "projects",
      getValues().projects.map((eachProject: Project, idx: number) => {
        if (index === idx) {
          return { ...eachProject, [key]: value };
        }
        return eachProject;
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
      <FormHeading label="Tell us about your projects" />

      <AddNewField
        label="Add Project"
        onClick={() => {
          setValue("projects", [
            {
              name: "",
              githubUrl: "",
              liveProjectUrl: "",
              level: 0,
              contributionLevel: 0,
              startDate: "",
              endDate: "",
              description: "",
              areasOfResponsibility: "",
              techStack: [],
              features: "",
              teamSize: 0,
              highlights: [""],
            },
            ...getValues().projects,
          ]);
          setActiveIndex(0);
        }}
      />
      <AccordionComponent
        data={watch("projects")?.map((item: Project, index: number) => ({
          title: `Project ${watch("projects")?.length - index}`,
          children: (
            <div key={index} className="w-full grid grid-cols-1 gap-6">
              <div>
                <TextInputComponent
                  name="title"
                  placeholder="Title"
                  value={item.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    updateProject(index, "name", e.target.value);
                    handleChange("name", e.target.value, index);
                  }}
                  autoFocus={index === activeIndex}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  index={index}
                  labelName={"name"}
                  loading={loading.name}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("name");
                  }}
                  value={item.name}
                />
              </div>
              <TextInputComponent
                name="githubUrl"
                placeholder="Github Url"
                value={item.githubUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateProject(index, "githubUrl", e.target.value)}
              />
              <TextInputComponent
                name="url"
                placeholder="Deployed Url"
                value={item.liveProjectUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateProject(index, "liveProjectUrl", e.target.value)
                }
              />

              <div className="grid grid-cols-1 gap-6 my-2 sm:gap-7">
                <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] items-center">
                  <p className="w-full text-[#2E1971] text-md md:text-base font-normal">Project Difficulty Level</p>
                  <div className=" w-full grid grid-cols-1 xs:grid-cols-[15%_85%] items-center">
                    <p
                      className={twMerge(
                        "text-base font-medium",
                        `text-[${ProjectColors[mode].progressText.color}]`,
                        `${item?.level > 0 ? "" : "invisible"}`
                      )}
                    >
                      {item.level}/10
                    </p>
                    <RangeSlider value={item.level} onClick={(value: number) => updateProject(index, "level", value)} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] items-center">
                  <p className="w-full text-[#2E1971] text-md md:text-base font-normal">Contribution Level</p>
                  <div className=" w-full grid grid-cols-1 xs:grid-cols-[15%_85%] items-center">
                    <p
                      className={twMerge(
                        "text-base font-medium",
                        `text-[${ProjectColors[mode].progressText.color}]`,
                        `${item?.contributionLevel > 0 ? "" : "invisible"}`
                      )}
                    >
                      {item.contributionLevel}/10
                    </p>
                    <RangeSlider
                      value={item.contributionLevel}
                      onClick={(value: number) => updateProject(index, "contributionLevel", value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[40%_60%] items-center">
                  <p className="w-full text-[#2E1971] text-md md:text-base font-normal">Team Size</p>
                  <div className=" w-full grid grid-cols-1 xs:grid-cols-[15%_85%] items-center">
                    <p
                      className={twMerge(
                        "text-base font-medium",
                        `text-[${ProjectColors[mode].progressText.color}]`,
                        `${item?.teamSize > 0 ? "" : "invisible"}`
                      )}
                    >
                      {item.teamSize}/10
                    </p>
                    <RangeSlider
                      value={item.teamSize}
                      onClick={(value: number) => updateProject(index, "teamSize", value)}
                    />
                  </div>
                </div>
              </div>
              <MonthAndYearPicker
                startDate={item.startDate || ""}
                endDate={item.endDate || ""}
                onPickStartMonth={(value: string) => {
                  updateProject(index, "startDate", `${value}-${getYearMonth(item?.startDate || " ").year || ""}`);
                }}
                onPickStartYear={(value: string) => {
                  updateProject(index, "startDate", `${getYearMonth(item?.startDate || " ").month || ""}-${value}`);
                }}
                onPickEndYear={(value: string) => {
                  updateProject(index, "endDate", `${getYearMonth(item?.endDate || " ").month || ""}-${value}`);
                }}
                onPickEndMonth={(value: string) => {
                  updateProject(index, "endDate", `${value}-${getYearMonth(item?.endDate || " ").year || ""}`);
                }}
                checkboxLabel="Present"
                checked={item?.isPresent || false}
                onClickCheckbox={(checked, value) => {
                  updateProject(index, "endDate", "");
                  updateProject(index, "isPresent", checked);
                }}
              />
              <div>
                <TextAreaComponent
                  name="description"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    updateProject(index, "description", e.target.value);
                    handleChange("description", e.target.value, index);
                  }}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  index={index}
                  labelName={"description"}
                  loading={loading.description}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("description");
                  }}
                  value={item.description}
                />
              </div>
              <div>
                <TextAreaComponent
                  name="features"
                  placeholder="Features"
                  value={item.features}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    updateProject(index, "features", e.target.value);
                    handleChange("features", e.target.value, index);
                  }}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  index={index}
                  labelName={"features"}
                  loading={loading.features}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("features");
                  }}
                  value={item.features}
                />
              </div>
              <div>
                <TextAreaComponent
                  name="areasOfResponsibility"
                  placeholder="Areas of Responsibility"
                  value={item.areasOfResponsibility}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    updateProject(index, "areasOfResponsibility", e.target.value);
                    handleChange("areasOfResponsibility", e.target.value, index);
                  }}
                />
                <GrammarError
                  grammarCheckResult={grammarCheckResult}
                  index={index}
                  labelName={"areasOfResponsibility"}
                  loading={loading.areasOfResponsibility}
                  onClickCheckGrammar={() => {
                    setModalOpenKey("areasOfResponsibility");
                  }}
                  value={item.areasOfResponsibility}
                />
              </div>
              <p
                className={twMerge(
                  `text-[${ProjectColors[mode].techStack.color}]`,
                  "text-[#2E1971] text-lg font-normal mt-10"
                )}
              >
                Tech Stack
              </p>
              <div className="grid xs:grid-cols-2 grid-cols-1 justify-start items-center gap-6">
                {item.techStack?.map((tech: string, idx: number) => (
                  <Skills
                    key={idx}
                    placeholder="Tech Stack"
                    value={tech}
                    onChange={(value: string) => {
                      const techStack = [...item.techStack];
                      techStack[idx] = value;
                      updateProject(index, "techStack", techStack);
                    }}
                    onDelete={() => {
                      const techStack = [...item.techStack];
                      techStack.splice(idx, 1);
                      updateProject(index, "techStack", techStack);
                    }}
                  />
                ))}
                <AddSkill
                  onClick={() => {
                    const techStack = [...item.techStack];
                    techStack.push("");
                    updateProject(index, "techStack", techStack);
                  }}
                />
              </div>
            </div>
          ),
          endIcon: (
            <DeleteButton
              onDelete={(e: any) => {
                e.stopPropagation();
                setValue(
                  "projects",
                  getValues().projects.filter((_: Project, idx: number) => idx !== index)
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
                updateProject(
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
export default Project;
