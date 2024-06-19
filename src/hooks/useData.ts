import { getServerTime, getSoftTechSkills } from "@/apis/data";
import { reactQueryConfig } from "@/config/reactQuery.config";
import { useQuery } from "react-query";

const useGetServerTime = () => {
  return useQuery({
    queryKey: ["serverTime"],
    queryFn: async () => (await getServerTime()).data as { date: number },
    ...reactQueryConfig,
  });
};
export const useGetSoftTechSkills = () => {
  return useQuery({
    queryKey: ["softTechSkills"],
    queryFn: async () => (await getSoftTechSkills()).data as { techSkills: string[]; softSkills: string[] },
    ...reactQueryConfig,
  });
};
export default useGetServerTime;
