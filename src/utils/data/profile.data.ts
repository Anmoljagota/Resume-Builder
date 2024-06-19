import { ProfileTabStatus } from "@/interfaces/profile";

export interface ProfileTabs {
  id: string;
  name: string;
  value: string;
  icon?: React.ReactNode;
  status: ProfileTabStatus;
}
export const ProfileTabs: ProfileTabs[] = [
  {
    id: "1",
    name: "Personal Details",
    value: "personalDetails",
    status: ProfileTabStatus.NONE,
  },
  {
    id: "2",
    name: "Education",
    value: "education",
    status: ProfileTabStatus.NONE,
  },
  {
    id: "3",
    name: "Projects",
    value: "projects",
    status: ProfileTabStatus.NONE,
  },
  {
    id: "4",
    name: "Experience",
    value: "experience",
    status: ProfileTabStatus.NONE,
  },
  {
    id: "5",
    name: "Skills & Interests",
    value: "skillsAndInterests",
    status: ProfileTabStatus.NONE,
  },
  {
    id: "6",
    name: "Certifications",
    value: "certifications",
    status: ProfileTabStatus.NONE,
  },
  {
    id: "7",
    name: "Achievements",
    value: "achievements",
    status: ProfileTabStatus.NONE,
  },
];

export const switchTabValue: { [key: string]: string } = {
  personalDetails: "education",
  education: "projects",
  projects: "experience",
  experience: "skillsAndInterests",
  skillsAndInterests: "certifications",
  certifications: "achievements",
  achievements: "personalDetails",
};

export const defineProfileIconColor = (status: ProfileTabStatus) => {
  if (status === ProfileTabStatus.COMPLETED) {
    return "#FFFFFF";
  } else if (status === ProfileTabStatus.ACTIVE) {
    return "#7F3EF3";
  }
  return "#D9D9D9";
};
