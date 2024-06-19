export const getResumeViewUrl = (
  resumeId: string,
  selectedTemplate = "TwoColumnMinimal"
) => {
  return `/dashboard/profile?resumeId=${resumeId}&selectedTemplate=${selectedTemplate}`;
};

export const getResumePreviewUrl = (
  resumeId: string,
  selectedTemplate = "TwoColumnMinimal"
) => {
  return `/resume?resumeId=${resumeId}&selectedTemplate=${selectedTemplate}`;
};
