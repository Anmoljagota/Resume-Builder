import { checkGrammarErrorExist } from "@/utils/grammar.utils";

export interface IGrammarResult {
  text?: string;
  label?: string;
  correctedText?: string;
  index?: number;
}

interface IGrammarError {
  grammarCheckResult: IGrammarResult[];
  labelName: string;
  value: string;
  loading: boolean;
  onClickCheckGrammar: () => void;
  index?: number;
}

const GrammarError = ({ grammarCheckResult, labelName, value, loading, onClickCheckGrammar, index }: IGrammarError) => {
  return (
    <div>
      {(typeof index === "number"
        ? checkGrammarErrorExist(grammarCheckResult, labelName, value, index)
        : checkGrammarErrorExist(grammarCheckResult, labelName, value)) &&
        !loading && (
          <p className="text-red-500 cursor-pointer" onClick={onClickCheckGrammar}>
            Grammar Error...
          </p>
        )}
      {loading && <p className="text-green-500">Checking Grammar...</p>}
    </div>
  );
};
export default GrammarError;
