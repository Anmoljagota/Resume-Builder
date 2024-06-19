export interface Contact {
  email: string;
  phone: string;
  address: string;
  linkedIn: string;
  github: string;
  portfolioLink: string;
}

export interface Education {
  key: string;
  courseName: string;
  instituteName: string;
  instituteAddress: string;
  duration: string;
  startDate?: string;
  endDate?: string;
  isPresent?: boolean;
}

export interface Project {
  _id?: string;
  name: string;
  liveProjectUrl: string;
  githubUrl: string;
  description: string;
  features: string;
  techStack: string[];
  areasOfResponsibility: string;
  isPresent?: boolean;
  /**
   * @description Highlights of the project
   * These are the points that will be shown in the resume
   * it will be in html format
   * majorly used for keyword highlighting
   * <b>keyword</b>
   */
  highlights: string[];
  /**
   * @description The level of the project
   * 0 - beginner
   * 5 - intermediate
   * 10 - advanced
   */
  level: number;
  contributionLevel: number;
  /**
   * @description The size of the team
   * 1 - solo project
   * otherwise the number of people in the team
   */
  teamSize: number;
  /**
   * @description The start date of the project
   */
  startDate?: string;
  /**
   * @description The end date of the project
   */
  endDate?: string;
  /**
   * @description The duration of the project in days
   */
  duration?: number;
}

export interface Experience {
  key: string;
  title: string;
  orgName: string;
  orgAddress: string;
  duration: string;
  // role: string[];
  techStack: string[];
  areasOfResponsibility: string;
  websiteLink: string;
  startDate?: string;
  endDate?: string;
  isPresent?: boolean;
  /**
   * @description Highlights of the experience
   * These are the points that will be shown in the resume
   * it will be in html format
   * */
  highlights: string[];
}

export interface Certification {
  name: string;
  instituteName: string;
  certificateUrl: string;
  description: string;
  startDate?: string;
  endDate?: string;
  isPresent?: boolean;
}

export interface Achievement {
  title: string;
  orgName: string;
  description: string;
  certificateUrl: string;
}
export interface JobDescription {
  type: "responsibility" | "requirement";
  value: string;
}

export interface Skill {
  name: string;
  level: number;
}

interface Section {
  position: string;
}

interface Sections {
  [key: string]: Section;
}

export interface Template {
  name: string;
  sections: Sections;
}
export interface UserProfile {
  _id?: string;
  jobDescription: JobDescription[];
  /**
   * @description The label of the profile
   * it will me master for the master profile
   * and the name of the profile for the other profiles
   */
  label: string;
  name: string;
  header: string;
  photoUrl: string;
  contact: Contact;
  professionalSummary?: string;
  education: Education[];
  technicalSkills: Skill[];
  softSkills: Skill[];
  projects: Project[];
  experience: Experience[];
  interests: string[];
  certifications: Certification[];
  achievements: Achievement[];
  templateConfigs: Template[];
}
