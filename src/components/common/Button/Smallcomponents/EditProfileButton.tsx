import { useGetProfile } from "@/hooks/profile";
import VariantButton from "../VariantButton";
import { useRouter } from "next/navigation";
import { Routes } from "@/utils/route.utils";

const EditProfileButton = ({ className }: { className?: string }) => {
  const { data: profileResponse, isLoading: isLoadingProfile } = useGetProfile({});
  const router = useRouter();
  return (
    <div>
      <VariantButton
        label="Edit Profile"
        size="xl"
        className={className || "px-11 py-4"}
        type="button"
        onClick={() => {
          if (profileResponse?.profile && profileResponse?.profile?._id) {
            router.push(Routes.profile(profileResponse?.profile?._id));
          }
        }}
      />
    </div>
  );
};
export default EditProfileButton;
