import { getUsersAdmin } from "@/apis/admin/user";
import { getProfileImageUploadPolicy } from "@/apis/auth";
import { getUserProfile } from "@/apis/resume";
import { Resume } from "@/interfaces/Resume";
import { User } from "@/interfaces/User";
import { UserProfile } from "@/utils/interfaces";
import { useMutation, useQuery } from "react-query";

interface GetProfileResponse {
  users: User[];
  resumes: Pick<Resume, "_id" | "header" | "user" | "meta" | "template">[];
  total: number;
}

export const useGetUserList = ({
  skip,
  limit,
  q,
  status,
  searchInput,
  userNames,
}: {
  skip?: number;
  limit?: number;
  q?: string;
  status?: string;
  searchInput?: string;
  userNames?: string;
}) => {
  return useQuery({
    queryKey: ["adminuserlist", skip, limit, q, status, searchInput, userNames],
    queryFn: async () =>
      (await getUsersAdmin({ skip, limit, q, status, searchInput, userNames })).data as GetProfileResponse,
    staleTime: 600000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
