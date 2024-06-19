import { executeGrammarCheckPrompt } from "@/apis/prompt";
import { Button, Spinner } from "flowbite-react";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

import CustomModal from "../CustomModal";
import { prettyHTMLDiff } from "@/utils/diff";
interface Props {
  text: string;
  handleGrammarCheckAccept: (grammarCheckResult: string) => void;
}
// const GrammarCheck = ({ text, handleGrammarCheckAccept }: Props) => {
//   const [loading, setLoading] = useState(false);
//   const [openModal, setOpenModal] = useState<string | undefined>();
//   const [grammarCheckResult, setGrammarCheckResult] = useState("");
//   const handleGrammarCheck = async (text?: string) => {
//     if (!text) {
//       toast.error("Cannot check grammar for empty text!");
//       return;
//     }
//     setLoading(true);
//     try {
//       const response = await executeGrammarCheckPrompt(text);

//       setLoading(false);
//       setGrammarCheckResult(response.data.correctedText);
//       setOpenModal("default");
//       toast.success("Grammar Check successful!");
//     } catch (e) {
//       toast.error("Grammar Check failed, please try again after some time!");
//     }
//   };
//   return (
//     <div>
//       <Button
//         size="xs"
//         onClick={() => {
//           handleGrammarCheck(text);
//         }}
//       >
//         {loading && <Spinner aria-label="Spinner button example" />}
//         {loading ? <span className="pl-3">Please wait...</span> : <span className="">Check Grammar</span>}
//       </Button>
//       <CustomModal
//         headerText={"Grammar Check Result"}
//         jsxModalContent={
//           <GrammarCheckContent
//             loading={loading}
//             handleGrammarCheckAccept={handleGrammarCheckAccept}
//             textToCheck={text}
//             handleGrammarCheck={handleGrammarCheck}
//             grammarCheckResult={grammarCheckResult}
//             setOpenModal={setOpenModal}
//           />
//         }
//         openModal={openModal}
//         setOpenModal={setOpenModal}
//         showFooter={false}
//       />
//     </div>
//   );
// };

// export default GrammarCheck;

interface GrammarCheckContentProps {
  handleGrammarCheckAccept: (grammarCheckResult: string) => void;
  textToCheck?: string;
  handleGrammarCheck: (text?: string) => void;
  grammarCheckResult: string;
  handleRejectResult?: () => void;
}
export const GrammarCheckContent = ({
  handleGrammarCheckAccept,
  textToCheck,
  handleGrammarCheck,
  grammarCheckResult,
  handleRejectResult,
}: GrammarCheckContentProps) => {
  const diffHTML = useMemo(() => {
    if (!grammarCheckResult || !textToCheck) return "";
    return prettyHTMLDiff(textToCheck, grammarCheckResult, {
      ADDED: "bg-green-400",
      REMOVED: "bg-red-400",
      UNTOUCHED: "bg-gray-50",
    });
  }, [grammarCheckResult, textToCheck]);
  return (
    <div className="text-black p-3">
      <div>Yours</div>
      <p className="mb-4 text-sm text-gray-500">{textToCheck}</p>
      <div>Suggested</div>
      <p className="mb-4 text-sm text-gray-900"> {grammarCheckResult}</p>
      <div>Changes</div>
      <div className="bg-white text-black whitespace-pre-line" dangerouslySetInnerHTML={{ __html: diffHTML }}></div>
      <div className="my-[16px] flex gap-[16px]">
        <Button
          onClick={() => {
            console.log("handleGrammarCheckAccept:", handleGrammarCheckAccept);
            if (handleGrammarCheckAccept && typeof handleGrammarCheckAccept === "function") {
              console.log("inside modal grammarCheckResult:", grammarCheckResult);
              handleGrammarCheckAccept(grammarCheckResult);
            }
          }}
        >
          Accept Result
        </Button>
        <Button
          onClick={() => {
            handleRejectResult && handleRejectResult();
          }}
        >
          Reject Result
        </Button>
        {/* <Button
          onClick={() => {
            handleGrammarCheck(textToCheck);
          }}
        >
          {loading && <Spinner aria-label="Spinner button example" />}
          {loading ? <span className="pl-3">Please wait...</span> : <span className="">Regenerate Result</span>}
        </Button> */}
      </div>
    </div>
  );
};
