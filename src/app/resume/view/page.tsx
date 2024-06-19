"use client";

import { useGetProfile } from "@/hooks/profile";
import { useSearchParams } from "next/navigation";
import ProfessionalEdge from "@/components/ResumeTemplates/ProfessionalEdge/ProfessionalEdge";
import SimplyMinimal from "@/components/ResumeTemplates/SimplyMinimal/SimplyMinimal";
import TwoColumnMinimal from "@/components/ResumeTemplates/TwoColumnMinimal/TwoColumnMinimal";
import SmartStart from "@/components/ResumeTemplates/SmartStart/SmartStart";
import ClassicElegance from "@/components/ResumeTemplates/ClassicElegance/ClassicElegance";
import ClassicProfessional from "@/components/ResumeTemplates/ClassicProfessional/ClassicProfessional";
import CrispCanvas from "@/components/ResumeTemplates/CrispCanvas/CrispCanvas";
import ModernMilestone from "@/components/ResumeTemplates/ModernMilestone/ModernMilestone";
import ClassicColoured from "@/components/ResumeTemplates/ClassicColoured/ClassicColoured";
import { CheckUserLoggedIn } from "@/middleware/checkAuth";
import ContentLayout from "@/components/common/Layout/ContentLayout";

const ResumeViewPage = () => {
  const searchParams = useSearchParams();
  const resumeId = searchParams.get("resumeId");
  const { templateName, profileId, fontSize } = Object.fromEntries(searchParams.entries());
  CheckUserLoggedIn();

  const { data, isLoading, isSuccess, isFetched, refetch, dataUpdatedAt, isError } = useGetProfile({
    id: profileId || undefined,
    resumeId: resumeId || undefined,
  });
  if (isLoading) return <>Loading</>;
  if (!resumeId || isError) return <>No Data Found</>;
  if (isSuccess) {
    const Templates: { [key: string]: React.ReactNode } = {
      ProfessionalEdge: <ProfessionalEdge userData={data?.profile} />,
      SimplyMinimal: <SimplyMinimal user={data?.profile} />,
      TwoColumnMinimal: <TwoColumnMinimal user={data?.profile} />,
      SmartStart: <SmartStart user={data?.profile} />,
      ClassicElegance: <ClassicElegance user={data?.profile} />,
      ClassicProfessional: <ClassicProfessional user={data?.profile} />,
      CrispCanvas: <CrispCanvas user={data?.profile} />,
      ModernMilestone: <ModernMilestone user={data?.profile} />,
      ClassicColoured:<ClassicColoured user={data?.profile}/>
    };
    return <ContentLayout>{Templates[templateName]}</ContentLayout>;
  }
  return <></>;
};

export default ResumeViewPage;
