import { getProfileImageUploadPolicy } from "@/apis/auth";
import { getUserProfile, updateUserProfile } from "@/apis/resume";
import { Resume } from "@/interfaces/Resume";
import { UserProfile } from "@/utils/interfaces";
import { useMutation, useQuery } from "react-query";

interface GetProfileResponse {
  profile: UserProfile;
  resume: Resume;
  originalProfile?: UserProfile;
}

export const useGetProfile = ({ id, resumeId }: { id?: string; resumeId?: string }) => {
  return useQuery({
    queryKey: ["myDetails", id || "self", resumeId],
    queryFn: async () => (await getUserProfile({ id, resumeId })).data as GetProfileResponse,
    staleTime: 60000,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useUpdatProfile = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}) => {
  return useMutation<UserProfile, Error, UserProfile>({
    mutationKey: ["updateProfile"],
    mutationFn: async (profile: UserProfile) => (await updateUserProfile(profile)).data as any,
    onSuccess,
    onError,
  });
};
