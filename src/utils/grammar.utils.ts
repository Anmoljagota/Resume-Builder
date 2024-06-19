import { IGrammarResult } from "@/components/Profile/Form/GrammarError";

export const checkGrammarErrorExist = (
  data: IGrammarResult[],
  label: string,
  value: string,
  index?: number
): boolean => {
  if (typeof index === "number") {
    return (
      data.filter((gc) => gc?.label === label && gc?.index === index)?.length > 0 &&
      data?.filter((eachData) => eachData?.label === label && eachData?.index === index)[0].correctedText !== value
    );
  }
  return (
    data.filter((gc) => gc?.label === label)?.length > 0 &&
    data?.filter((eachData) => eachData?.label === label)[0].correctedText !== value
  );
};
export const setGrammaticallyCorrectedText = (
  data: IGrammarResult[],
  text: string,
  label?: string,
  correctedText?: string,
  index?: number
) => {
  const grammarCheckData = [...data];
  let keyExist = false;
  grammarCheckData.map((egcd) => {
    if (egcd?.label === label) {
      egcd.text = text;
      egcd.correctedText = correctedText;
      keyExist = true;
    }
    if (index) {
      egcd.index = index;
    }
  });
  if (!keyExist) {
    const data = { label, text, correctedText: correctedText } as IGrammarResult;
    if (typeof index === "number") {
      data.index = index;
    }
    grammarCheckData.push(data);
  }
  return grammarCheckData;
};
