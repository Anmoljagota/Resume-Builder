import { logout, me } from "@/apis/auth";
import { User } from "@/interfaces/User";
import { useMutation, useQuery } from "react-query";

type MyDetails = User;

export const useMyDetails = (onSuccess?: (data: MyDetails) => void, onError?: (error: Error) => void) => {
  return useQuery({
    queryKey: ["myDetails"],
    queryFn: async () => (await me()).data.user as MyDetails,
    staleTime: 60000,
    retry: false,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      onSuccess && onSuccess(data);
    },
    onError: (error: Error) => {
      onError && onError(error);
    },
  });
};

export const useLogout = () => {
  return useMutation<void, unknown, void>({
    mutationFn: async () => {
      await logout();
    },
  });
};
