import React from "react";
import TextInputComponent from "@/components/common/InputComponent/TextInputComponent";
import DropDownComponent from "@/components/common/DropDown/DropDownComponent";
import TextAreaComponent from "@/components/common/InputComponent/TextAreaComponent";
import FormHeading from "./formHeading/FormHeading";
import { UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { UserProfile } from "@/utils/interfaces";
import { designations } from "@/utils/constants";
import ImageUploader from "@/components/common/FileUpload";
import ModalComponent from "@/components/common/ModalComponent";
import { GrammarCheckContent } from "@/components/common/GrammarCheck";
import { setGrammaticallyCorrectedText } from "@/utils/grammar.utils";
import GrammarError, { IGrammarResult } from "./GrammarError";
import { useGrammarCheck } from "@/hooks/usePrompts";

interface IInitialState {
  openDropDown: boolean;
  selectedValue: string;
}
export interface IReactHookForm {
  watch: UseFormWatch<UserProfile>;
  getValues: UseFormGetValues<UserProfile>;
  setValue: UseFormSetValue<UserProfile>;
  setChangedData?: (value: boolean) => void;
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

const PersonalDetails = ({ watch, getValues, setValue, setChangedData }: IReactHookForm) => {
  const initialState = {
    openDropDown: false,
    selectedValue: "",
  };
  const timerRef = React.useRef<{ label: string; timer: NodeJS.Timeout }[] | []>([]);
  const [modalOpenKey, setModalOpenKey] = React.useState<"" | "name" | "professionalSummary">("");
  const [loading, setLoading] = React.useState({ name: false, professionalSummary: false });
  const [grammarCheckResult, setGrammarCheckResult] = React.useState<[] | IGrammarResult[]>([]);
  const grammarCheckMutation = useGrammarCheck();

  const handleGrammarCheck = (text: string, label: string) => {
    if (text?.trim().split(" ")?.join(" ").trim().length > 5) {
      setLoading((pre) => ({ ...pre, [label]: true }));
      grammarCheckMutation.mutate(text, {
        onSuccess: (response) => {
          setGrammarCheckResult((pre) => {
            setLoading((pre) => ({ ...pre, [label]: false }));
            return setGrammaticallyCorrectedText(pre, text, label, response?.correctedText);
          });
        },
      });
    } else {
      setGrammarCheckResult((pre) => pre.filter((data) => data?.label !== label));
    }
  };

  const handleChange = (key: string, value: string) => {
    const existTimer = timerRef.current?.filter((data) => data?.label === key);
    if (existTimer && existTimer?.length > 0) {
      clearTimeout(existTimer[0]?.timer);
      timerRef.current = timerRef.current?.filter((data) => data?.label !== key);
    }
    timerRef.current = [
      ...timerRef.current,
      { label: key, timer: setTimeout(() => handleGrammarCheck(value, key), 2000) },
    ];
  };
  return (
    <div className="grid grid-cols-1 gap-6 sm:gap-7 px-[50px]">
      <FormHeading label="Tell us about yourself" />
      <div className="flex justify-start  items-end flex-row  gap-3">
        {watch("photoUrl") && (
          <img src={watch("photoUrl")} alt="profile" className="xs:w-[186px] xs:h-[174px] w-32 h-28 rounded-md" />
        )}
        {!watch("photoUrl") && (
          <div
            className="flex justify-center items-center w-[186px] h-[174px] rounded-md"
            style={{
              // boxShadow: "0px 0px 9px 0px rgba(0, 0, 0, 0.14) inset",
              border: "1px solid #E0E0E0",
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="38" viewBox="0 0 63 53" fill="none">
              <path
                d="M23.3833 12.2326H12.9787C9.43514 12.2326 7.66202 12.2326 6.30854 12.9108C5.11799 13.5073 4.15074 14.4584 3.54412 15.6291C2.85449 16.96 2.85449 18.7036 2.85449 22.1881V39.6092C2.85449 43.0938 2.85449 44.8336 3.54412 46.1645C4.15074 47.3352 5.11799 48.2896 6.30854 48.8861C7.66069 49.5635 9.43167 49.5635 12.9684 49.5635H49.6861C53.2228 49.5635 54.9912 49.5635 56.3433 48.8861C57.5339 48.2896 58.5044 47.3352 59.111 46.1645C59.7999 44.8349 59.7999 43.096 59.7999 39.6182V22.1779C59.7999 18.7002 59.7999 16.9587 59.111 15.6291C58.5044 14.4584 57.5339 13.5073 56.3433 12.9108C54.9899 12.2326 53.2205 12.2326 49.6769 12.2326H39.2705M23.3833 12.2326H23.5788M23.3833 12.2326C23.4229 12.2326 23.4646 12.2326 23.5085 12.2326L23.5788 12.2326M23.3833 12.2326C23.0475 12.2325 22.8594 12.2308 22.7106 12.2144C20.8517 12.0097 19.5768 10.2699 19.9672 8.47104C20.0035 8.30364 20.0753 8.09183 20.2175 7.6724L20.2236 7.65466C20.386 7.17562 20.4672 6.9361 20.5569 6.72474C21.4752 4.56078 23.5549 3.08913 25.933 2.91674C26.1652 2.8999 26.4205 2.8999 26.934 2.8999H35.7202C36.2337 2.8999 36.491 2.8999 36.7233 2.91674C39.1014 3.08913 41.1788 4.56078 42.0972 6.72474C42.1869 6.9361 42.2685 7.17535 42.4308 7.65437C42.5771 8.08576 42.6502 8.30155 42.6871 8.47133C43.0775 10.2702 41.8045 12.0097 39.9456 12.2144C39.7969 12.2308 39.6069 12.2325 39.2705 12.2326M23.5788 12.2326H39.0749M39.0749 12.2326H39.2705M39.0749 12.2326L39.1451 12.2326C39.1891 12.2326 39.2308 12.2326 39.2705 12.2326M31.3272 40.2308C26.0855 40.2308 21.8363 36.0524 21.8363 30.8981C21.8363 25.7438 26.0855 21.5654 31.3272 21.5654C36.5689 21.5654 40.8181 25.7438 40.8181 30.8981C40.8181 36.0524 36.5689 40.2308 31.3272 40.2308Z"
                stroke="#DEDEDE"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
        <ImageUploader onUpload={(imageUrl: string) => setValue("photoUrl", imageUrl)} />
      </div>
      <div>
        <TextInputComponent
          name="name"
          placeholder="Full Name"
          value={watch("name")}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setValue("name", e.target.value);
            setChangedData && setChangedData(true);
            handleChange("name", e.target.value);
          }}
          autoFocus={true}
        />
        <GrammarError
          grammarCheckResult={grammarCheckResult}
          labelName={"name"}
          value={watch("name")}
          onClickCheckGrammar={() => setModalOpenKey("name")}
          loading={loading.name}
        />
      </div>
      <DropDownComponent
        name="job"
        placeholder="What's your profile?"
        selected={watch("header")}
        setSelected={(value: string) => {
          setValue("header", value);
          setChangedData && setChangedData(true);
        }}
        options={designations.map(({ label }, index: number) => ({
          value: label,
          id: index.toString(),
        }))}
      />
      <TextInputComponent
        name="phone"
        placeholder="Phone Number"
        value={watch("contact.phone")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue("contact.phone", e.target.value);
          setChangedData && setChangedData(true);
        }}
      />
      <TextInputComponent
        name="linkedIn"
        placeholder="LinkedIn"
        value={watch("contact.linkedIn")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue("contact.linkedIn", e.target.value);
          setChangedData && setChangedData(true);
        }}
      />
      <TextInputComponent
        name="github"
        placeholder="Github Username"
        value={watch("contact.github")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue("contact.github", e.target.value);
          setChangedData && setChangedData(true);
        }}
      />
      <TextInputComponent
        name="portfolioLink"
        placeholder="Portfolio Link"
        value={watch("contact.portfolioLink")}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setValue("contact.portfolioLink", e.target.value);
          setChangedData && setChangedData(true);
        }}
      />

      <TextAreaComponent
        name="address"
        placeholder="Enter Your Address"
        value={watch("contact.address") || ""}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setValue("contact.address", e.target.value);
          setChangedData && setChangedData(true);
        }}
      />
      <div>
        <TextAreaComponent
          name="professionalSummary"
          placeholder="Professional Summary (Optional)"
          value={watch("professionalSummary") || ""}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange("professionalSummary", e.target.value);
            setValue("professionalSummary", e.target.value);
            setChangedData && setChangedData(true);
          }}
        />
        <GrammarError
          grammarCheckResult={grammarCheckResult}
          labelName={"professionalSummary"}
          value={watch("professionalSummary") || ""}
          onClickCheckGrammar={() => setModalOpenKey("professionalSummary")}
          loading={loading.professionalSummary}
        />
      </div>
      <ModalComponent
        showModal={modalOpenKey !== ""}
        setShowModal={() => setModalOpenKey("")}
        children={
          <GrammarCheckContent
            handleGrammarCheckAccept={() => {
              if (modalOpenKey !== "") {
                setValue(
                  modalOpenKey,
                  grammarCheckResult.filter((gcr) => gcr?.label === modalOpenKey)[0]?.correctedText
                );
                setChangedData && setChangedData(true);
                setGrammarCheckResult((pre) => pre.filter((data) => data?.label !== modalOpenKey));
                setModalOpenKey("");
              }
            }}
            handleGrammarCheck={() => {}}
            grammarCheckResult={grammarCheckResult.filter((gcr) => gcr?.label === modalOpenKey)[0]?.correctedText || ""}
            textToCheck={grammarCheckResult.filter((gcr) => gcr?.label === modalOpenKey)[0]?.text || ""}
            handleRejectResult={() => {
              setGrammarCheckResult((pre) => pre.filter((data) => data?.label !== modalOpenKey));
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
export default PersonalDetails;
