import { Button, Modal, Textarea } from "flowbite-react";
import React from "react";
import ImageUploader from "../../common/FileUpload";
import { useRequestChanges } from "@/hooks/useResume";
import ClickableDiv from "../miniComponents/ClickableDiv";
import { toast } from "react-toastify";

function ResumeFeedback({ resumeId, onRefetch }: { resumeId: string; onRefetch: () => void }) {
  const textRef = React.useRef<HTMLTextAreaElement>(null);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [videoUrl, setVideoUrl] = React.useState<string>("");
  const mutation = useRequestChanges({
    onSuccess: () => {
      toast.success("Changes requested Successfully");
      onRefetch();
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });
  const handleChanges = () => {
    mutation.mutate({ resumeId, videoUrl, text: textRef.current?.value || "" });
  };
  return (
    <>
      <ClickableDiv onClick={() => setIsOpen(true)} label="Request changes" />

      <Modal show={isOpen} onClose={() => setIsOpen(false)}>
        <Modal.Header>Request changes</Modal.Header>
        <Modal.Body className="text-black">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <div className="font-semibold">Message</div>
              <Textarea ref={textRef} />
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-semibold">Video URL</div>
              <Textarea value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
              <ImageUploader onUpload={(url) => setVideoUrl(url)} uploadType="video-review" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button
            disabled={mutation.isLoading}
            isProcessing={mutation.isLoading}
            onClick={handleChanges}
            color="success"
          >
            Send
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ResumeFeedback;
