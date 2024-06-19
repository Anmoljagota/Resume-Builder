import { Project, UserProfile } from "@/utils/interfaces";
import { User } from "./User";

type ResumeProject = Pick<Project, "highlights" | "name" | "_id">;

export interface Resume extends Pick<UserProfile, "professionalSummary" | "header"> {
  _id?: string;
  projects: ResumeProject[];
  /**
   * @description The id of the profile
   */
  template?: {
    name?: string;
    url?: string;
  };
  profile: string;
  user: User;
  technicalSkills: { name: string }[];
  softSkills: { name: string }[];
  meta: {
    reviewStatus: "requested" | "changes-requested" | "approved" | "rejected";
    approvedBy: string;
    feedbacks: {
      _id: string;
      videoUrl: string;
      text: string;
      createdAt: Date;
      by: User;
    }[];
  };
}

export enum ResumeReviewStatus {
  REQUESTED = "requested",
  CHANGESREQUESTED = "changes-requested",
  APPROVED = "approved",
  REJECTED = "rejected",
}
