"use client";

import { Resume, ResumeReviewStatus } from "@/interfaces/Resume";
import ClickableDiv from "./ClickableDiv";
import { twMerge } from "tailwind-merge";
import ViewFeedback from "@/components/ResumeEditor/ResumeFeedback/View";
import ResumeFeedback from "@/components/ResumeEditor/ResumeFeedback";
import { useMyDetails } from "@/hooks/useAuth";
import ResumeRequestModal from "../ResumeFeedback/ResumeRequestModal";
import { useApproveResume, useRequestReview } from "@/hooks/useResume";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";

const ResumeReview = ({
  resume,
  selectedTemplateName,
  fontSize,
}: {
  resume: Resume;
  selectedTemplateName: string;
  fontSize: string;
}) => {
  const { data } = useMyDetails();
  const queryClient = useQueryClient();
  const { mutate, isLoading: requestReviewLoading } = useRequestReview({
    onSuccess: () => {
      toast.success("Review requested successfully");
      queryClient.refetchQueries(["myResume"]);
    },
  });
  const approveResume = useApproveResume({
    onSuccess: () => {
      toast.success("Resume is approved");
      queryClient.refetchQueries(["myResume"]);
    },
    onError: (err: Error) => toast.error(err.message),
  });
  return (
    <div className="flex flex-col w-full gap-y-3">
      {(!resume?.meta.reviewStatus || resume?.meta?.reviewStatus === ResumeReviewStatus.CHANGESREQUESTED) &&
        data?._id === resume.user._id && (
          <ResumeRequestModal
            buttonLabel="Request Review"
            onClick={(value?: string) => {
              if (typeof value === "string") {
                resume._id &&
                  mutate({ resumeId: resume._id, text: value, templateName: selectedTemplateName, fontSize });
              } else {
                resume._id && mutate({ resumeId: resume._id, templateName: selectedTemplateName, fontSize });
              }
            }}
            disabled={requestReviewLoading}
            isProcessing={requestReviewLoading}
          />
        )}

      <ViewFeedback resume={resume} />

      {resume?.meta?.reviewStatus === ResumeReviewStatus.REQUESTED && data?.role === "Admin" && (
        <ResumeFeedback resumeId={resume._id || ""} onRefetch={() => {}} />
      )}

      {data?.role === "Admin" &&
        resume?.meta?.reviewStatus &&
        resume?.meta?.reviewStatus !== ResumeReviewStatus.APPROVED && (
          <ClickableDiv label="approve" onClick={() => approveResume.mutate(resume._id || "")} />
        )}
      {resume?.meta?.reviewStatus === ResumeReviewStatus.APPROVED && <p className="text-green-500">Approved</p>}
    </div>
  );
};
export default ResumeReview;
