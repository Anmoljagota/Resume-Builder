import { Button, Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useCreateResume, useListMyResume, useRegenerateResume } from "@/hooks/useResume";
import Link from "next/link";
import { getJobDescriptions } from "@/apis/data";
import { JOBDescription } from "@/interfaces/data";
import { Routes } from "@/utils/route.utils";
import ModalComponent from "../common/ModalComponent";
import OutlinedButton from "../common/Button/OutlinedButton";
import Chip from "../common/Chips/Chip";
import { useRouter } from "next/navigation";
import { Resume } from "@/interfaces/Resume";
import ModernMilestone from "@/components/ResumeTemplates/ModernMilestone/ModernMilestone";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeCreator({
  refetch,
  buttonType = "normal",
}: {
  refetch?: () => void;
  buttonType?: "grey" | "normal";
}) {
  const router = useRouter();
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [jobDescriptions, setJobDescriptions] = useState<JOBDescription[]>([]);
  const [designation, setDesignation] = React.useState<string>(jobDescriptions[0]?.jobTitle || "");
  const {
    mutate,
    isLoading,
    data: creationData,
    isSuccess,
  } = useCreateResume({
    onSuccess: () => {
      refetch && refetch();
      router.push(Routes.dashboard());
    },
  });
  const handleCreateResume = () => {
    mutate(designation);
  };

  const fetchJobDescriptions = async () => {
    const jobDescriptionData = await getJobDescriptions();
    setJobDescriptions(jobDescriptionData?.data?.jobsDescriptions);
  };

  useEffect(() => {
    fetchJobDescriptions();
  }, []);
  return (
    <>
      <ModalComponent
        header={<></>}
        showModal={showModal}
        setShowModal={() => setShowModal(!showModal)}
        children={
          <div className="p-4">
            <div className="flex items-center gap-3 flex-wrap">
              {jobDescriptions?.map((eachDesignation: JOBDescription) => {
                return (
                  <Chip
                    label={eachDesignation.jobTitle}
                    key={eachDesignation.id}
                    onClick={() => setDesignation(eachDesignation.jobTitle)}
                    selected={eachDesignation.jobTitle === designation}
                  />
                );
              })}
            </div>
            <div className="mb-2 mt-4 flex items-center justify-end mr-4">
              <Button isProcessing={isLoading} onClick={handleCreateResume}>
                Create Resume
              </Button>
            </div>
          </div>
        }
        width="30%"
        backgroundColor="#fff"
      />
      {buttonType === "normal" && (
        <OutlinedButton label="Generate Resume" size="sm" onClick={() => setShowModal(true)} id="generate-resume" />
      )}
      {buttonType === "grey" && (
        <Button
          onClick={() => setShowModal(true)}
          style={{
            background: "none",
            border: "2px solid #fff",
          }}
          className="text-[#fff]"
          id={"generate-resume"}
        >
          Generate Resume
        </Button>
      )}
    </>
  );
}

function ResumeItem({ _id, showRegenerate, resume }: { _id?: string; showRegenerate?: boolean; resume?: Resume }) {
  const { mutate, isLoading } = useRegenerateResume();

  const handleRegenerate = () => {
    if (!_id) return;
    mutate({ id: _id, items: [] });
  };
  return (
    <div className="h-full w-full ">
      <div>{/* <ModernMilestone user={resume} /> */}</div>
      <div></div>
      <Link href={Routes.resume.main(_id || "", resume?.template?.name || "ProfessionalEdge")} className="ml-auto">
        <Button color="light" className="ml-auto" size="sm">
          View
        </Button>
      </Link>
      {showRegenerate && (
        <Button onClick={handleRegenerate} className="ml-2" isProcessing={isLoading} size="sm">
          Regenerate
        </Button>
      )}
    </div>
  );
}

export function ResumeList({ showRegenerate, refetchKey }: { showRegenerate?: boolean; refetchKey?: number }) {
  const { data, isFetching, refetch } = useListMyResume();
  useEffect(() => {
    if (refetchKey) {
      refetch();
    }
  }, [refetchKey, refetch]);
  return (
    <div className="flex flex-col gap-4">
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {data?.map((resume, index) => {
            return <ResumeItem showRegenerate={showRegenerate} key={index} resume={resume} _id={resume._id} />;
          })}
        </div>
      )}
    </div>
  );
}

function ResumeListModal({ isOpen, onClose }: Props) {
  const [resumeListKey, setResumeListKey] = React.useState<number>(0);
  return (
    <Modal show={isOpen} onClose={onClose}>
      <Modal.Header>Select Resume</Modal.Header>
      <Modal.Body>
        <div className="mt-2" />
        <ResumeList refetchKey={resumeListKey} showRegenerate />
        <ResumeCreator
          refetch={() => {
            setResumeListKey((r) => r + 1);
          }}
        />
      </Modal.Body>
    </Modal>
  );
}

export default ResumeListModal;
