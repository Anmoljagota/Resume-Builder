export const Routes = {
  home: () => "/",
  dashboard: () => "/dashboard",
  profile: (id: string, tab?: string) => `/dashboard/profile?profileId=${id}&tab=${tab || "personalDetails"}`,
  resume: {
    main: (resumeId: string, templateName: string) =>
      `/resume?resumeId=${resumeId}&profileId=self&templateName=${templateName}`,
    download: (resumeId: string, templateName: string, fontSize: string) =>
      `${process.env.NEXT_PUBLIC_API_URL}/profile/download/resume?resumeId=${resumeId}&templateName=${templateName}&fontSize=${fontSize}`,
    view: (resumeId: string, templateName: string, fontSize: string) =>
      `/resume/view?resumeId=${resumeId}&templateName=${templateName}&fontSize=${fontSize}`,
  },
  auth: {
    signin: () => "/auth/signin",
    signup: () => "/auth/signup",
  },
};
