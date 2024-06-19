export const getStartEndYearMonth = (duration: string) => {
  const [start, end] = duration.split("-");
  const startEndData = {
    startYear: "",
    startMonth: "",
    endYear: "",
    endMonth: "",
  };
  if (start) {
    startEndData.startYear = getYearMonth(start?.trim()).year || "";
    startEndData.startMonth = getYearMonth(start?.trim()).month || "";
  }
  if (end) {
    startEndData.endYear = getYearMonth(end?.trim()).year || "";
    startEndData.endMonth = getYearMonth(end?.trim()).month || "";
  }
  return startEndData;
};

export const getYearMonth = (duration: string) => {
  const [month, year] = duration?.split("-");
  return {
    month: month?.trim() || "",
    year: year?.trim() || "",
  };
};

export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<F>) => {
    const context = this as ThisParameterType<F>;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
};
