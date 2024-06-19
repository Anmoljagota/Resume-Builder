import { useMyDetails } from "@/hooks/useAuth";
import { Routes } from "@/utils/route.utils";
import { useRouter, usePathname, redirect } from "next/navigation";

export const CheckUserLoggedIn = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading, isSuccess } = useMyDetails(
    (data) => {
      if (pathname.includes("auth")) {
        router.push(Routes.home());
      }
    },
    (error) => {
      if (!pathname.includes("auth")) {
        router.push(Routes.auth.signin());
      }
    }
  );
};
